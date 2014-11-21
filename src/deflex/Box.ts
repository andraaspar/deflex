/// <reference path='../../lib/illa/_module.ts'/>
/// <reference path='../../lib/illa/Alignment.ts'/>
/// <reference path='../../lib/illa/ArrayUtil.ts'/>
/// <reference path='../../lib/illa/Axis2D.ts'/>
/// <reference path='../../lib/illa/End.ts'/>
/// <reference path='../../lib/illa/EventHandler.ts'/>
/// <reference path='../../lib/illa/Log.ts'/>
/// <reference path='../../lib/illa/StringUtil.ts'/>
/// <reference path='../../lib/illa/Ticker.ts'/>

/// <reference path='../../lib/jQuery.d.ts'/>

/// <reference path='../../lib/berek/Context.ts'/>
/// <reference path='../../lib/berek/ScrollbarUtil.ts'/>
/// <reference path='../../lib/berek/Widget.ts'/>

/// <reference path='BoxModel.ts'/>
/// <reference path='IBoxImp.ts'/>
/// <reference path='SizeLimitSource.ts'/>
/// <reference path='StyleUtil.ts'/>

module deflex {
	
	export class Box extends berek.Widget implements IBoxImp {
		static ROOT_TICKER = new illa.Ticker();

		static CSS_CLASS = 'deflex-Box';
		static CSS_CLASS_SIZE_AUTO_X = 'deflex-Box-size-auto-x';
		static CSS_CLASS_SIZE_AUTO_Y = 'deflex-Box-size-auto-y';
		static CSS_CLASS_SIZE_FULL_X = 'deflex-Box-size-full-x';
		static CSS_CLASS_SIZE_FULL_Y = 'deflex-Box-size-full-y';
		static CSS_CLASS_IS_ROOT = 'deflex-Box-is-root';
		static CSS_CLASS_OVERFLOW_VISIBLE = 'deflex-Box-overflow-visible';
		static EVENT_SOLVE_LAYOUT_NOW_REQUESTED = 'deflex_Box_EVENT_SOLVE_LAYOUT_NOW_REQUESTED';
		
		static solutionCountLimit = 100;
//		static nextId = 0;

		private static scrollbarUtil: berek.ScrollbarUtil;

		private sizeCacheX = 0;
		private sizeCacheY = 0;
		private sizeLimitSourceX = SizeLimitSource.CHILD_BOXES;
		private sizeLimitSourceY = SizeLimitSource.CHILD_BOXES;
		private offsetCacheX = 0;
		private offsetCacheY = 0;
		private parentBox: Box;
		private parentJQuery: jQuery.IInstance;
		private children: Array<Box> = [];
		private zIndex = 0;
		private isRoot = false;
		private allowsVisibility = true;
		private allowsLayoutActive = true;
		private overflowIsVisible = false;
		private doubleCheckLayout = true;
		private isSolvingLayout = false;
		private model = new BoxModel(this);
		
		public name: string;

		constructor(jq?: jQuery.IInstance) {
			super(jq || jQuery('<div>'));
			
//			this.name = 'Box-' + Box.nextId++;
			
			if (jq) {
				var relatedBoxJQ = jq.prev('.' + Box.CSS_CLASS);
				if (!relatedBoxJQ.length) relatedBoxJQ = undefined;
				this.setParent(jq.parent(), relatedBoxJQ ? illa.End.MAX : illa.End.MIN, relatedBoxJQ, true);
			}

			this.getJQuery().addClass(Box.CSS_CLASS);
			
			if (!Box.scrollbarUtil) {
				Box.scrollbarUtil = new berek.ScrollbarUtil();
			}
		}

		onRootTick(e: illa.Event): void {
			var startTime = new Date().getTime();
			this.isSolvingLayout = true;
			var solutionCount = 0;
			this.checkNeedsLayoutUpdate();

			while (this.getNeedsLayoutUpdate()) {
				solutionCount++;
				this.getScrollbarUtil().clearDefaultSizeCache();
				this.updateModel();
				this.solveLayout();
				
				if (this.doubleCheckLayout) {
					this.checkNeedsLayoutUpdate();
					
					if (this.getNeedsLayoutUpdate() &&
						solutionCount + 1 > Box.solutionCountLimit) {
						illa.Log.warn(this.name || '', 'Solution count limit reached - disabling layout double checks.');
						this.setDoubleCheckLayout(false);
						break;
					}
				}
			}
			
			if (solutionCount) {
				illa.Log.infoIf(this.name, 'layout solved:', new Date().getTime() - startTime, 'ms, solution count:', solutionCount);
			}
			
			this.isSolvingLayout = false;
		}
		
		onSolveLayoutNowRequested(e: illa.Event): void {
			if (!this.isSolvingLayout) {
				this.onRootTick(null);
			}
		}

		checkNeedsLayoutUpdate(): void {
			for (var i = 0, n = this.children.length; i < n; i++) {
				var child = this.children[i];
				if (child.getIsLayoutActive()) {
					child.checkNeedsLayoutUpdate();
					
					if (child.getNeedsLayoutUpdate()) {
						this.setNeedsLayoutUpdate(true);
					}
				}
			}
			
			var neededLayoutUpdate = this.getNeedsLayoutUpdate();
			for (var axis = illa.Axis2D.X; axis <= illa.Axis2D.Y; axis++) {
				var sizeSource = this.getSizeLimitSource(axis);
				if (sizeSource == SizeLimitSource.JQUERY_AUTO || sizeSource == SizeLimitSource.JQUERY_FULL) {
					var size = this.getSize(axis);
					this.model.sizeLimit.set(axis, illa.End.MIN, size);
					this.model.sizeLimit.set(axis, illa.End.MAX, size);
				}
			}
			if (!neededLayoutUpdate && this.getNeedsLayoutUpdate()) {
				illa.Log.infoIf(this.name, 'initiates layout update. Size limit set to:', this.model.sizeLimit.toString());
			}
		}

		updateModel(): void {
			var childModels: BoxModel[] = [];
			for (var i = 0, n = this.children.length; i < n; i++) {
				var childBox = this.children[i];
				if (childBox.getIsLayoutActive()) {
					childModels.push(childBox.getModel());
					childBox.updateModel();
				}
			}
			this.model.children = childModels;
			
			if (this.name) this.model.name = this.name + 'Model';
			else this.model.name = '';
		}
		
		solveLayout(): void {
			this.model.applyContentWeight();
			
			var startTime = new Date().getTime();

			while (this.getNeedsLayoutUpdate()) {
				this.model.solveLayout();
				this.applyModel();
				
				if (new Date().getTime() > startTime + 3000) {
					illa.Log.warn(this.name || '', 'Layout solving takes too long - breaking.');
					break;
				}
			}
		}

		applyModel(): void {
			var model = this.model;
			for (var axis = illa.Axis2D.X; axis <= illa.Axis2D.Y; axis++) {
				this.setOffset(model.outOffset.get(axis), axis);
				this.setShowScrollbar(model.outShowScrollbar.get(axis), axis);
				var sizeSource = this.getSizeLimitSource(axis);
				if (sizeSource == SizeLimitSource.SELF || sizeSource == SizeLimitSource.CHILD_BOXES) {
					this.setSize(model.outSize.get(axis), axis);
				}
			}

			for (var i = 0, n = this.children.length; i < n; i++) {
				var child = this.children[i];
				if (child.getIsLayoutActive()) {
					child.applyModel();
					this.setNeedsLayoutUpdate(this.getNeedsLayoutUpdate() || child.getNeedsLayoutUpdate());
				}
			}
		}

		clearSizeCache(axis?: illa.Axis2D): void {
			switch (axis) {
				default:
				case illa.Axis2D.X:
					this.sizeCacheX = NaN;
					if (axis != null) break;
				case illa.Axis2D.Y:
					this.sizeCacheY = NaN;
			}
		}

		clearOffsetCache(axis: illa.Axis2D): void {
			switch (axis) {
				default:
				case illa.Axis2D.X:
					this.offsetCacheX = NaN;
					if (axis != null) break;
				case illa.Axis2D.Y:
					this.offsetCacheY = NaN;
			}
		}

		getSize(axis: illa.Axis2D, context = berek.Context.PARENT): number {
			var result = NaN;
			switch (axis) {
				case illa.Axis2D.X:
					if (isNaN(this.sizeCacheX)) {
						result = (<HTMLElement>this.getJQuery()[0]).offsetWidth;
					} else {
						result = this.sizeCacheX;
					}
					break;
				case illa.Axis2D.Y:
					if (isNaN(this.sizeCacheY)) {
						result = (<HTMLElement>this.getJQuery()[0]).offsetHeight;
					} else {
						result = this.sizeCacheY;
					}
					break;
			}
			if (context == berek.Context.INNER) {
				result -= this.getVisibleScrollbarSize(axis);
				result = Math.max(0, result);
			}
			return result;
		}

		setSize(v: number, a?: illa.Axis2D, context = berek.Context.PARENT): void {
			for (var axis = a || illa.Axis2D.X, lastAxis = (a != null ? a : illa.Axis2D.Y); axis <= lastAxis; axis++) {
				var value = v;
				if (context == berek.Context.INNER) {
					value += this.getVisibleScrollbarSize(axis);
				}
				if (isNaN(value) || !isFinite(value)) {
					value = 0;
				} else {
					value = Math.max(0, Math.round(value));
				}
				switch (axis) {
					case illa.Axis2D.X:
						if (this.sizeCacheX != value) {
							this.sizeCacheX = value;
							(<HTMLElement>this.getJQuery()[0]).style.width = value + 'px';
						}
						break;
					case illa.Axis2D.Y:
						if (this.sizeCacheY != value) {
							this.sizeCacheY = value;
							(<HTMLElement>this.getJQuery()[0]).style.height = value + 'px';
						}
						break;
				}
			}
		}
		
		getSizeLimitSource(axis: illa.Axis2D): SizeLimitSource {
			var result = SizeLimitSource.SELF;
			switch (axis) {
				case illa.Axis2D.X:
					result = this.sizeLimitSourceX;
					break;
				case illa.Axis2D.Y:
					result = this.sizeLimitSourceY;
					break;
			}
			return result;
		}
		
		setSizeLimitSource(value: SizeLimitSource, a?: illa.Axis2D): void {
			switch (value) {
				case SizeLimitSource.JQUERY_AUTO:
				case SizeLimitSource.JQUERY_FULL:
					this.clearSizeCache(axis);
			}
			for (var axis = a || illa.Axis2D.X, lastAxis = (a != null ? a : illa.Axis2D.Y); axis <= lastAxis; axis++) {
				var prevSizeSource = this.getSizeLimitSource(axis);
				if (prevSizeSource === value) continue;
					
				switch (axis) {
					case illa.Axis2D.X:
						this.sizeLimitSourceX = value;
						break;
					case illa.Axis2D.Y:
						this.sizeLimitSourceY = value;
						break;
				}

				this.setNeedsLayoutUpdate(true);

				switch (prevSizeSource) {
					case SizeLimitSource.JQUERY_AUTO:
						this.getJQuery().removeClass(axis == illa.Axis2D.X ? Box.CSS_CLASS_SIZE_AUTO_X : Box.CSS_CLASS_SIZE_AUTO_Y);
						break;
					case SizeLimitSource.JQUERY_FULL:
						this.getJQuery().removeClass(axis == illa.Axis2D.X ? Box.CSS_CLASS_SIZE_FULL_X : Box.CSS_CLASS_SIZE_FULL_Y);
						break;
					case SizeLimitSource.CHILD_BOXES:
						this.model.shrinkWrap.set(axis, false);
						break;
				}
				switch (value) {
					case SizeLimitSource.JQUERY_AUTO:
						this.getJQuery().addClass(axis == illa.Axis2D.X ? Box.CSS_CLASS_SIZE_AUTO_X : Box.CSS_CLASS_SIZE_AUTO_Y);
						break;
					case SizeLimitSource.JQUERY_FULL:
						this.getJQuery().addClass(axis == illa.Axis2D.X ? Box.CSS_CLASS_SIZE_FULL_X : Box.CSS_CLASS_SIZE_FULL_Y);
						break;
					case SizeLimitSource.CHILD_BOXES:
						this.model.shrinkWrap.set(axis, true);
						break;
				}
			}
		}

		getOffset(axis: illa.Axis2D, alignment = illa.Alignment.START, context = berek.Context.PARENT): number {
			var result = NaN;
			var offset: jQuery.IPositionObject;
			switch (context) {
				case berek.Context.INNER:
					offset = { left: 0, top: 0 };
					break;
				case berek.Context.PARENT:
					if (isNaN(this.offsetCacheX) || isNaN(this.offsetCacheY)) {
						offset = this.getJQuery().position();
					} else {
						offset = { left: this.offsetCacheX, top: this.offsetCacheY };
					}
					break;
				case berek.Context.PAGE:
					offset = this.getJQuery().offset();
					break;
			}
			switch (axis) {
				case illa.Axis2D.X:
					result = offset.left;
					break;
				case illa.Axis2D.Y:
					result = offset.top;
					break;
			}
			if (alignment != illa.Alignment.START) {
				var size = this.getSize(axis, context);
				if (alignment == illa.Alignment.CENTER) {
					size = size / 2;
				}
				result += size;
			}
			return result;
		}

		setOffset(v: number, a?: illa.Axis2D, alignment = illa.Alignment.START, context = berek.Context.PARENT, preventNegative = false): void {
			for (var axis = a || illa.Axis2D.X, lastAxis = (a != null ? a : illa.Axis2D.Y); axis <= lastAxis; axis++) {
				var value = v;
				if (context == berek.Context.PAGE) {
					var pageOffset = this.getOffset(axis, illa.Alignment.START, berek.Context.PAGE);
					var currentOffset = this.getOffset(axis);
					value -= pageOffset - currentOffset; // Page offset of parent
				} else if (context == berek.Context.INNER) {
					value += this.getOffset(axis); // Parent offset
				}
				if (alignment != illa.Alignment.START) {
					var size = this.getSize(axis, context);
					if (alignment == illa.Alignment.CENTER) {
						size = size / 2;
					}
					value -= size;
				}
				if (isNaN(value) || !isFinite(value)) {
					value = 0;
				} else {
					value = Math.round(value);
					if (preventNegative) value = Math.max(0, value);
				}
				switch (axis) {
					case illa.Axis2D.X:
						if (this.offsetCacheX != value) {
							this.offsetCacheX = value;
							(<HTMLElement>this.getJQuery()[0]).style.left = value + 'px';
						}
						break;
					case illa.Axis2D.Y:
						if (this.offsetCacheY != value) {
							this.offsetCacheY = value;
							(<HTMLElement>this.getJQuery()[0]).style.top = value + 'px';
						}
						break;
				}
			}
		}

		getShowScrollbar(axis: illa.Axis2D): boolean {
			var overflow = '';
			switch (axis) {
				case illa.Axis2D.X:
					overflow = (<HTMLElement>this.getJQuery()[0]).style.overflowY;
					break;
				case illa.Axis2D.Y:
					overflow = (<HTMLElement>this.getJQuery()[0]).style.overflowX;
					break;
			}
			return overflow == 'scroll';
		}

		setShowScrollbar(flag: boolean, axis?: illa.Axis2D): void {
			var overflow = flag ? 'scroll' : '';
			switch (axis) {
				default:
				case illa.Axis2D.X:
					if (this.getShowScrollbar(illa.Axis2D.X) != flag) {
						(<HTMLElement>this.getJQuery()[0]).style.overflowY = overflow;
					}
					if (axis != null) break;
				case illa.Axis2D.Y:
					if (this.getShowScrollbar(illa.Axis2D.Y) != flag) {
						(<HTMLElement>this.getJQuery()[0]).style.overflowX = overflow;
					}
			}
		}

		getVisibleScrollbarSize(axis: illa.Axis2D): number {
			var result = 0;
			if (this.getShowScrollbar(axis)) {
				result = this.getScrollbarSize(axis);
			}
			return result;
		}

		getScrollbarSize(axis: illa.Axis2D): number {
			return this.getScrollbarUtil().getDefaultSize(axis);
		}

		getScrollbarUtil(): berek.ScrollbarUtil {
			return Box.scrollbarUtil;
		}

		static getFrom(source: jQuery.IInstance): Box {
			var result: Box = <Box>berek.Widget.getFrom(source);
			if (!(result instanceof Box)) {
				result = null;
			}
			return result;
		}

		setParent(parent: Box, end?: illa.End, related?: Box, dontModifyDOM?: boolean): void;
		setParent(parent: Box, end?: illa.End, related?: jQuery.IInstance, dontModifyDOM?: boolean): void;
		setParent(parent: jQuery.IInstance, end?: illa.End, related?: Box, dontModifyDOM?: boolean): void;
		setParent(parent: jQuery.IInstance, end?: illa.End, related?: jQuery.IInstance, dontModifyDOM?: boolean): void;
		setParent(parent: string, end?: illa.End, dontModifyDOM?: boolean): void;
		setParent(parent, end = illa.End.MAX, related = null, dontModifyDOM = false) {
			var parentBox: Box = null;
			var parentJQuery: jQuery.IInstance = null;
			var relatedBox: Box = null;
			var relatedJQuery: jQuery.IInstance = null;

			if (parent instanceof Box) {
				parentBox = <Box>parent;
			} else if (parent instanceof jQuery) {
				parentJQuery = <jQuery.IInstance>parent;
				parentBox = Box.getFrom(parentJQuery);
			} else if (typeof parent == 'string') {
				parentJQuery = jQuery(<string>parent);
			}
			
			if (related instanceof Box) {
				relatedBox = <Box>related;
				
				// If a parent jQuery and a related Box were specified, get the related jQuery
				// because the related Box is only used when the parent is a Box.
				if (!parentBox) relatedJQuery = relatedBox.getJQuery();
				
			} else if (related instanceof jQuery) {
				relatedJQuery = <jQuery.IInstance>related;
				relatedBox = Box.getFrom(relatedJQuery);
				
				// If a parent Box and a related jQuery were specified, ignore the parent Box and
				// insert next to the related jQuery.
				if (!relatedBox) parentBox = null;
			}

			if (this.parentBox) {
				this.parentBox.removeChild(this);
			}

			if (parentBox) {
				if (this.parentBox != parentBox) {
					if (!dontModifyDOM) {
						this.getJQuery().appendTo(parentBox.getJQuery());
					}
					this.parentBox = parentBox;
					this.parentJQuery = null;
				}
				this.parentBox.insertChild(this, end, relatedBox);
				this.setIsRoot(false);
			} else if (relatedJQuery) {
				this.parentBox = null;
				this.parentJQuery = relatedJQuery.parent();

				if (!dontModifyDOM) {
					switch (end) {
						case illa.End.MIN:
							this.getJQuery().insertBefore(relatedJQuery);
							break;
						case illa.End.MAX:
							this.getJQuery().insertAfter(relatedJQuery);
							break;
					}
				}
				this.setIsRoot(true);
			} else if (parentJQuery) {
				this.parentBox = null;
				this.parentJQuery = parentJQuery;

				if (!dontModifyDOM) {
					switch (end) {
						case illa.End.MIN:
							this.getJQuery().prependTo(parentJQuery);
							break;
						case illa.End.MAX:
							this.getJQuery().appendTo(parentJQuery);
							break;
					}
				}
				this.setIsRoot(true);
			} else {
				if (!dontModifyDOM) {
					this.getJQuery().detach();
				}

				this.parentBox = null;
				this.parentJQuery = null;
				this.setIsRoot(false);
			}
			this.setNeedsLayoutUpdate(true);
		}

		getParentBox(): Box {
			return this.parentBox;
		}

		getParentJQuery(): jQuery.IInstance {
			return this.parentJQuery;
		}

		getEventParent(): illa.IEventHandler {
			if (this.parentBox) {
				return this.parentBox;
			} else if (this.parentJQuery) {
				return Box.getFrom(this.parentJQuery.closest('.' + Box.CSS_CLASS));
			} else {
				return null;
			}
		}

		insertChild(child: Box, end = illa.End.MAX, related: Box = null): void {
			var newIndex = 0;
			if (related) {
				var relatedIndex = this.getChildIndex(related);
				if (relatedIndex == -1) throw 'Related not a child.';
				switch (end) {
					case illa.End.MIN:
						newIndex = relatedIndex;
						break;
					case illa.End.MAX:
						newIndex = relatedIndex + 1;
						break;
				}
				this.children.splice(newIndex, 0, child);
			} else {
				switch (end) {
					case illa.End.MIN:
						this.children.unshift(child);
						break;
					case illa.End.MAX:
						newIndex = this.children.push(child) - 1;
						break;
				}
			}
			if (child.name) illa.Log.infoIf(this.name, 'inserted child:', child.name);
			this.updateChildZIndexes(newIndex);
			this.setNeedsLayoutUpdate(true);
		}

		moveChild(child: Box, end = illa.End.MAX, related: Box = null): void {
			this.removeChild(child, true);
			this.insertChild(child, end, related);
		}

		removeChild(child: Box, throwError = false): void {
			var index = this.getChildIndex(child);
			if (index == -1) {
				if (throwError) throw 'Not a child.';
			} else {
				this.children.splice(index, 1);
				if (child.name) illa.Log.infoIf(this.name, 'removed child:', child.name);
				this.updateChildZIndexes(index);
			}
			this.setNeedsLayoutUpdate(true);
		}

		getChildIndex(child: Box): number {
			return illa.ArrayUtil.indexOf(this.children, child);
		}

		destroy(): void {
			this.getJQuery().remove();
		}

		onDestroyed(e: jQuery.IEvent): void {
			super.onDestroyed(e);
			illa.Log.infoIf(this.name, 'is being destroyed.');
			var hasNotDestroyedParentBox = this.parentBox && !this.parentBox.getIsDestroyed();
			var hasParentJQ = this.parentJQuery != null;
			if (hasNotDestroyedParentBox || hasParentJQ) {
				illa.Log.infoIf(this.name, 'is unsetting its parent.');
				this.setParent(null, undefined, undefined, true);
			}
		}

		getZIndex(): number {
			return this.zIndex;
		}

		setZIndex(value: number): void {
			if (this.zIndex == value) return;
			illa.Log.infoIf(this.name, 'has a new z-index: ' + value);
			this.zIndex = value;
			(<HTMLElement>this.getJQuery()[0]).style.zIndex = <any>value;
		}

		updateChildZIndexes(startIndex = 0): void {
			for (var i = startIndex, n = this.children.length; i < n; i++) {
				this.children[i].setZIndex(i);
			}
		}

		getIsRoot(): boolean {
			return this.isRoot;
		}

		setIsRoot(value: boolean): void {
			if (this.isRoot == value) return;
			this.isRoot = value;
			this.model.applySizeToSelf.set(value);
			this.getJQuery().toggleClass(Box.CSS_CLASS_IS_ROOT, value);
			if (value) {
				Box.ROOT_TICKER.addEventCallback(illa.Ticker.EVENT_TICK, this.onRootTick, this);
				this.addEventCallback(Box.EVENT_SOLVE_LAYOUT_NOW_REQUESTED, this.onSolveLayoutNowRequested, this);
			} else {
				Box.ROOT_TICKER.removeEventCallback(illa.Ticker.EVENT_TICK, this.onRootTick, this);
				this.removeEventCallback(Box.EVENT_SOLVE_LAYOUT_NOW_REQUESTED, this.onSolveLayoutNowRequested, this);
			}
			illa.Log.infoIf(this.name, 'is now ' + (value ? '' : 'NOT ') + 'root.');
		}

		getAllowsLayoutActive(): boolean {
			return this.allowsLayoutActive;
		}

		setAllowsLayoutActive(flag: boolean): void {
			if (this.getAllowsLayoutActive() == flag) return;
			this.allowsLayoutActive = flag;
			this.setNeedsLayoutUpdate(true);
		}

		getIsLayoutActive(): boolean {
			return this.getAllowsLayoutActive() && this.getAllowsVisibility();
		}

		getAllowsVisibility(): boolean {
			return this.allowsVisibility;
		}

		setAllowsVisibility(flag: boolean): void {
			if (this.allowsVisibility == flag) return;
			this.allowsVisibility = flag;
			this.getJQuery().toggle(flag);
			this.setNeedsLayoutUpdate(true);
			if (this.getParentBox()) this.getParentBox().getModel().needsLayoutUpdate = true;
		}

		getIsVisible(): boolean {
			return this.getJQuery().is(':visible');
		}

		getScroll(axis: illa.Axis2D): number {
			return berek.ScrollbarUtil.getScroll(this.getJQuery(), axis);
		}

		setScroll(value: number, axis?: illa.Axis2D): void {
			berek.ScrollbarUtil.setScroll(this.getJQuery(), value, axis);
		}

		getModel(): BoxModel {
			return this.model;
		}
		
		setModel(value: BoxModel): void {
			this.model = value;
		}

		getNeedsLayoutUpdate(): boolean {
			return this.model.needsLayoutUpdate;
		}

		setNeedsLayoutUpdate(value: boolean): void {
			this.model.needsLayoutUpdate = value;
		}

		getAlignment(axis: illa.Axis2D): illa.Alignment {
			return this.model.alignment.get(axis);
		}

		setAlignment(value: illa.Alignment, a?: illa.Axis2D): void {
			for (var axis = a || illa.Axis2D.X, lastAxis = (a != null ? a : illa.Axis2D.Y); axis <= lastAxis; axis++) {
				this.model.alignment.set(axis, value);
			}
			this.setNeedsLayoutUpdate(true);
		}

		getInset(axis: illa.Axis2D, e?: illa.End): number {
			var result = 0;
			for (var end = e || illa.End.MIN, lastEnd = (e != null ? e : illa.End.MAX); end <= lastEnd; end++) {
				result += this.model.inset.get(axis, end);
			}
			return result;
		}

		setInset(value: number, a?: illa.Axis2D, e?: illa.End): void {
			for (var axis = a || illa.Axis2D.X, lastAxis = (a != null ? a : illa.Axis2D.Y); axis <= lastAxis; axis++) {
				for (var end = e || illa.End.MIN, lastEnd = (e != null ? e : illa.End.MAX); end <= lastEnd; end++) {
					this.model.inset.set(axis, end, value);
				}
			}
		}

		getDirection(): illa.Axis2D {
			return this.model.direction.get();
		}

		setDirection(value: illa.Axis2D): void {
			this.model.direction.set(value);
		}

		getSizeLimit(axis: illa.Axis2D, end: illa.End): number {
			return this.model.sizeLimit.get(axis, end);
		}

		setSizeLimit(min: number, max: number, a?: illa.Axis2D): void {
			for (var axis = a || illa.Axis2D.X, lastAxis = (a != null ? a : illa.Axis2D.Y); axis <= lastAxis; axis++) {
				if (!isNaN(min)) {
					min = Math.max(0, min);
					this.model.sizeLimit.set(axis, illa.End.MIN, min);
				}
				if (!isNaN(max)) {
					this.model.sizeLimit.set(axis, illa.End.MAX, max);
				}
			}
		}

		getShrinkWrapSizeLimit(axis: illa.Axis2D, end: illa.End, end2: illa.End): number {
			return this.model.shrinkWrapSizeLimit.get(axis, end, end2);
		}

		setShrinkWrapSizeLimit(value: number, a?: illa.Axis2D, e?: illa.End, e2?: illa.End): void {
			for (var axis = a || illa.Axis2D.X, lastAxis = (a != null ? a : illa.Axis2D.Y); axis <= lastAxis; axis++) {
				for (var end = e || illa.End.MIN, lastEnd = (e != null ? e : illa.End.MAX); end <= lastEnd; end++) {
					for (var end2 = e2 || illa.End.MIN, lastEnd2 = (e2 != null ? e2 : illa.End.MAX); end2 <= lastEnd2; end2++) {
						this.model.shrinkWrapSizeLimit.set(axis, end, end2, value);
					}
				}
			}
		}

		getSpaceBefore(axis: illa.Axis2D): number {
			return this.model.spaceBefore.get(axis);
		}

		setSpaceBefore(value: number, a?: illa.Axis2D): void {
			for (var axis = a || illa.Axis2D.X, lastAxis = (a != null ? a : illa.Axis2D.Y); axis <= lastAxis; axis++) {
				this.model.spaceBefore.set(axis, value);
			}
		}

		getDefaultSpaceBefore(axis: illa.Axis2D): number {
			return this.model.defaultSpaceBefore.get(axis);
		}

		setDefaultSpaceBefore(value: number, a?: illa.Axis2D): void {
			for (var axis = a || illa.Axis2D.X, lastAxis = (a != null ? a : illa.Axis2D.Y); axis <= lastAxis; axis++) {
				this.model.defaultSpaceBefore.set(axis, value);
			}
		}

		getWeight(axis: illa.Axis2D): number {
			return this.model.weight.get(axis);
		}

		setWeight(value: number, a?: illa.Axis2D): void {
			for (var axis = a || illa.Axis2D.X, lastAxis = (a != null ? a : illa.Axis2D.Y); axis <= lastAxis; axis++) {
				this.model.weight.set(axis, value);
			}
		}

		getUseContentWeight(axis: illa.Axis2D): boolean {
			return this.model.useContentWeight.get(axis);
		}

		setUseContentWeight(value: boolean, a?: illa.Axis2D): void {
			for (var axis = a || illa.Axis2D.X, lastAxis = (a != null ? a : illa.Axis2D.Y); axis <= lastAxis; axis++) {
				this.model.useContentWeight.set(axis, value);
			}
		}

		getIsSpacer(): boolean {
			return this.model.isSpacer.get();
		}

		setIsSpacer(value: boolean): void {
			this.model.isSpacer.set(value);
		}

		getApplySizeToSelf(): boolean {
			return this.model.applySizeToSelf.get();
		}

		setApplySizeToSelf(value: boolean): void {
			this.model.applySizeToSelf.set(value);
		}

		getMayShowScrollbar(axis: illa.Axis2D): boolean {
			return this.model.mayShowScrollbar.get(axis);
		}

		setMayShowScrollbar(value: boolean, a?: illa.Axis2D): void {
			for (var axis = a || illa.Axis2D.X, lastAxis = (a != null ? a : illa.Axis2D.Y); axis <= lastAxis; axis++) {
				this.model.mayShowScrollbar.set(axis, value);
			}
		}

		getChildren(): Box[] {
			return this.children;
		}
		
		getOverflowIsVisible(): boolean {
			return this.overflowIsVisible;
		}
		
		setOverflowIsVisible(flag: boolean): void {
			if (this.overflowIsVisible != flag) {
				this.overflowIsVisible = flag;
				this.getJQuery().toggleClass(Box.CSS_CLASS_OVERFLOW_VISIBLE, flag);
			}
		}
		
		getDoubleCheckLayout(): boolean {
			return this.doubleCheckLayout;
		}
		
		setDoubleCheckLayout(flag: boolean): void {
			this.doubleCheckLayout = flag;
		}
		
		getIsSolvingLayout(): boolean {
			return this.isSolvingLayout;
		}
		
		setIsSolvingLayout(flag: boolean): void {
			this.isSolvingLayout = flag;
		}

		applyStyle(styles: string): void {
			styles = illa.StringUtil.trim(styles);

			var style = styles.split(/\s*;\s*/g);
			for (var i = 0, n = style.length; i < n; i++) {
				var styleSplit = style[i].split(/\s*:\s*/g);
				var key = styleSplit[0];
				var value = styleSplit[1];
				
				if (key) {
					try {
						if (!this.applySingleStyle(key, value)) {
							illa.Log.warn(this.name || '', 'Style key not recognized: ' + key);
						}
					} catch (e) {
						illa.Log.warn(key + ': ' + e);
					}
				}
			}
		}

		applySingleStyle(key: string, value: string): boolean {
			var success = true;
			switch (key) {
				case 'size-limit-source':
					this.setSizeLimitSource(StyleUtil.readSizeLimitSource(value));
					break;
				case 'size-limit-source-x':
					this.setSizeLimitSource(StyleUtil.readSizeLimitSource(value), illa.Axis2D.X);
					break;
				case 'size-limit-source-y':
					this.setSizeLimitSource(StyleUtil.readSizeLimitSource(value), illa.Axis2D.Y);
					break;

				case 'inset':
					this.setInset(StyleUtil.readNumber(value));
					break;
				case 'inset-x':
					this.setInset(StyleUtil.readNumber(value), illa.Axis2D.X);
					break;
				case 'inset-y':
					this.setInset(StyleUtil.readNumber(value), illa.Axis2D.Y);
					break;
				case 'inset-left':
					this.setInset(StyleUtil.readNumber(value), illa.Axis2D.X, illa.End.MIN);
					break;
				case 'inset-right':
					this.setInset(StyleUtil.readNumber(value), illa.Axis2D.X, illa.End.MAX);
					break;
				case 'inset-top':
					this.setInset(StyleUtil.readNumber(value), illa.Axis2D.Y, illa.End.MIN);
					break;
				case 'inset-bottom':
					this.setInset(StyleUtil.readNumber(value), illa.Axis2D.Y, illa.End.MAX);
					break;

				case 'size-limit':
					this.setSizeLimit(StyleUtil.readNumber(value), StyleUtil.readNumber(value));
					break;
				case 'size-limit-x':
					this.setSizeLimit(StyleUtil.readNumber(value), StyleUtil.readNumber(value), illa.Axis2D.X);
					break;
				case 'size-limit-y':
					this.setSizeLimit(StyleUtil.readNumber(value), StyleUtil.readNumber(value), illa.Axis2D.Y);
					break;
				case 'size-limit-min':
					this.setSizeLimit(StyleUtil.readNumber(value), undefined);
					break;
				case 'size-limit-max':
					this.setSizeLimit(undefined, StyleUtil.readNumber(value));
					break;
				case 'size-limit-x-min':
					this.setSizeLimit(StyleUtil.readNumber(value), undefined, illa.Axis2D.X);
					break;
				case 'size-limit-x-max':
					this.setSizeLimit(undefined, StyleUtil.readNumber(value), illa.Axis2D.X);
					break;
				case 'size-limit-y-min':
					this.setSizeLimit(StyleUtil.readNumber(value), undefined, illa.Axis2D.Y);
					break;
				case 'size-limit-y-max':
					this.setSizeLimit(undefined, StyleUtil.readNumber(value), illa.Axis2D.Y);
					break;

				case 'shrink-wrap-size-limit':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value));
					break;
				case 'shrink-wrap-size-limit-x':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.X);
					break;
				case 'shrink-wrap-size-limit-y':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.Y);
					break;
				case 'shrink-wrap-size-limit-min':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), undefined, illa.End.MIN);
					break;
				case 'shrink-wrap-size-limit-max':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), undefined, illa.End.MAX);
					break;
				case 'shrink-wrap-size-limit-x-min':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.X, illa.End.MIN);
					break;
				case 'shrink-wrap-size-limit-x-max':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.X, illa.End.MAX);
					break;
				case 'shrink-wrap-size-limit-y-min':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.Y, illa.End.MIN);
					break;
				case 'shrink-wrap-size-limit-y-max':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.Y, illa.End.MAX);
					break;
				case 'shrink-wrap-size-limit-min-min':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), undefined, illa.End.MIN, illa.End.MIN);
					break;
				case 'shrink-wrap-size-limit-min-max':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), undefined, illa.End.MIN, illa.End.MAX);
					break;
				case 'shrink-wrap-size-limit-max-min':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), undefined, illa.End.MAX, illa.End.MIN);
					break;
				case 'shrink-wrap-size-limit-max-max':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), undefined, illa.End.MAX, illa.End.MAX);
					break;
				case 'shrink-wrap-size-limit-x-min-min':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.X, illa.End.MIN, illa.End.MIN);
					break;
				case 'shrink-wrap-size-limit-x-min-max':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.X, illa.End.MIN, illa.End.MAX);
					break;
				case 'shrink-wrap-size-limit-x-max-min':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.X, illa.End.MAX, illa.End.MIN);
					break;
				case 'shrink-wrap-size-limit-x-max-max':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.X, illa.End.MAX, illa.End.MAX);
					break;
				case 'shrink-wrap-size-limit-y-min-min':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.Y, illa.End.MIN, illa.End.MIN);
					break;
				case 'shrink-wrap-size-limit-y-min-max':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.Y, illa.End.MIN, illa.End.MAX);
					break;
				case 'shrink-wrap-size-limit-y-max-min':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.Y, illa.End.MAX, illa.End.MIN);
					break;
				case 'shrink-wrap-size-limit-y-max-max':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.Y, illa.End.MAX, illa.End.MAX);
					break;

				case 'space-before':
					this.setSpaceBefore(StyleUtil.readNumber(value));
					break;
				case 'space-before-x':
					this.setSpaceBefore(StyleUtil.readNumber(value), illa.Axis2D.X);
					break;
				case 'space-before-y':
					this.setSpaceBefore(StyleUtil.readNumber(value), illa.Axis2D.Y);
					break;

				case 'default-space-before':
					this.setDefaultSpaceBefore(StyleUtil.readNumber(value));
					break;
				case 'default-space-before-x':
					this.setDefaultSpaceBefore(StyleUtil.readNumber(value), illa.Axis2D.X);
					break;
				case 'default-space-before-y':
					this.setDefaultSpaceBefore(StyleUtil.readNumber(value), illa.Axis2D.Y);
					break;

				case 'weight':
					this.setWeight(StyleUtil.readNumber(value));
					break;
				case 'weight-x':
					this.setWeight(StyleUtil.readNumber(value), illa.Axis2D.X);
					break;
				case 'weight-y':
					this.setWeight(StyleUtil.readNumber(value), illa.Axis2D.Y);
					break;

				case 'use-content-weight':
					this.setUseContentWeight(StyleUtil.readBoolean(value));
					break;
				case 'use-content-weight-x':
					this.setUseContentWeight(StyleUtil.readBoolean(value), illa.Axis2D.X);
					break;
				case 'use-content-weight-y':
					this.setUseContentWeight(StyleUtil.readBoolean(value), illa.Axis2D.Y);
					break;

				case 'alignment':
					this.setAlignment(StyleUtil.readAlignment(value));
					break;
				case 'alignment-x':
					this.setAlignment(StyleUtil.readAlignment(value), illa.Axis2D.X);
					break;
				case 'alignment-y':
					this.setAlignment(StyleUtil.readAlignment(value), illa.Axis2D.Y);
					break;

				case 'is-spacer':
					this.setIsSpacer(StyleUtil.readBoolean(value));
					break;

				case 'direction':
					this.setDirection(StyleUtil.readAxis2D(value));
					break;

				case 'may-show-scrollbar':
					this.setMayShowScrollbar(StyleUtil.readBoolean(value));
					break;
				case 'may-show-scrollbar-x':
					this.setMayShowScrollbar(StyleUtil.readBoolean(value), illa.Axis2D.X);
					break;
				case 'may-show-scrollbar-y':
					this.setMayShowScrollbar(StyleUtil.readBoolean(value), illa.Axis2D.Y);
					break;
				
				case 'overflow-is-visible':
					this.setOverflowIsVisible(StyleUtil.readBoolean(value));
					break;
				
				case 'double-check-layout':
					this.setDoubleCheckLayout(StyleUtil.readBoolean(value));
					break;
					
				case 'name':
					this.name = value;
					break;

				default:
					success = false;
			}

			return success;
		}
		
		static getBoxesFromRootsJQueryByName(name: string, rootsJq = jQuery('.' + Box.CSS_CLASS_IS_ROOT)): Box[] {
			var result: Box[] = [];
			
			for (var i = 0, n = rootsJq.length; i < n; i++) {
				var root = Box.getFrom(rootsJq.eq(i));
				result = result.concat(this.getBoxesFromRootByName(name, root));
			}
			
			return result;
		}
		
		static getBoxesFromRootByName(name: string, root: Box): Box[] {
			var result: Box[] = [];
			
			if (root.name === name) {
				result.push(root);
			}
			
			var children = root.getChildren();
			for (var i = 0, n = children.length; i < n; i++) {
				result = result.concat(this.getBoxesFromRootByName(name, children[i]));
			}
			
			return result;
		}
	}
}