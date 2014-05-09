/// <reference path='../../node_modules/andraaspar-illa/lib/JQuery.d.ts'/>
/// <reference path='../../node_modules/andraaspar-illa/src/illa/Axis2D.ts'/>
/// <reference path='../../node_modules/andraaspar-illa/src/illa/IventHandler.ts'/>
/// <reference path='../../node_modules/andraaspar-illa/src/illa/Log.ts'/>
/// <reference path='../../node_modules/andraaspar-illa/src/illa/ScrollbarUtil.ts'/>
/// <reference path='../../node_modules/andraaspar-illa/src/illa/Ticker.ts'/>
/// <reference path='Alignment.ts'/>
/// <reference path='BoxModel.ts'/>
/// <reference path='Context.ts'/>
/// <reference path='End.ts'/>
/// <reference path='IBoxImp.ts'/>
/// <reference path='StyleUtil.ts'/>

module deflex {
	export class Box extends illa.IventHandler implements IBoxImp {
		static ROOT_TICKER = new illa.Ticker();

		static JQUERY_DATA_KEY = 'deflex_Box';
		static CSS_CLASS = 'deflex-Box';
		static CSS_CLASS_SIZE_AUTO_X = 'deflex-Box-size-auto-x';
		static CSS_CLASS_SIZE_AUTO_Y = 'deflex-Box-size-auto-y';
		static CSS_CLASS_SIZE_FULL_X = 'deflex-Box-size-full-x';
		static CSS_CLASS_SIZE_FULL_Y = 'deflex-Box-size-full-y';
		static CSS_CLASS_IS_ROOT = 'deflex-Box-is-root';
		static EVENT_DESTROYED = 'deflex_Box_destroyed';

		private jQuery: JQuery;
		private sizeCacheX = 0;
		private sizeCacheY = 0;
		private sizeIsFullX = false;
		private sizeIsFullY = false;
		private sizeIsAutoX = false;
		private sizeIsAutoY = false;
		private offsetCacheX = 0;
		private offsetCacheY = 0;
		private parentBox: Box;
		private parentJQuery: JQuery;
		private children: Array<Box> = [];
		private zIndex = 0;
		private isDestroyed = false;
		private isRoot = false;
		private allowsVisibility = true;
		private allowsLayoutActive = true;
		private model = new BoxModel(this);

		public name = '';

		constructor(jq?: JQuery) {
			super();

			if (jq) {
				this.jQuery = jq;
				var nextBoxJQ = this.jQuery.next('.' + Box.CSS_CLASS);
				if (!nextBoxJQ.length) nextBoxJQ = undefined;
				this.setParent(jq.parent(), nextBoxJQ ? End.MIN : End.MAX, nextBoxJQ, true);
			} else {
				this.jQuery = jQuery('<div>');
			}
			this.jQuery.data(Box.JQUERY_DATA_KEY, this);
			this.jQuery.addClass(Box.CSS_CLASS);
			if (!(Box.EVENT_DESTROYED in jQuery['event'].special)) {
				jQuery['event'].special[Box.EVENT_DESTROYED] = {
					remove: function(o) {
						if (o.handler) {
							o.handler();
						}
					}
				};
			}
			this.jQuery.on(Box.EVENT_DESTROYED, jQuery.proxy(this.onDestroyed, this));
		}

		getJQuery(): JQuery {
			return this.jQuery;
		}

		onRootTick(e: illa.Ivent): void {
			var startTime = new Date().getTime();
			this.onTick();

			if (this.getNeedsLayoutUpdate()) {
				illa.ScrollbarUtil.clearDefaultSizeCache();
				this.updateModel();
				this.model.applyContentWeight();

				while (this.getNeedsLayoutUpdate()) {
					this.model.solveLayout();
					this.applyModel();
				}
				illa.Log.infoIf(this.name, 'layout solved:', new Date().getTime() - startTime, 'ms.');
			}
		}

		onTick(): void {
			this.checkNeedsLayoutUpdate();

			for (var i = 0, n = this.children.length; i < n; i++) {
				var child = this.children[i];
				child.onTick();
				this.setNeedsLayoutUpdate(this.getNeedsLayoutUpdate() || child.getNeedsLayoutUpdate());
			}
		}
		
		checkNeedsLayoutUpdate(): void {
			for (var axis = illa.Axis2D.X; axis <= illa.Axis2D.Y; axis++) {
				if (this.getSizeIsAuto(axis) || this.getSizeIsFull(axis)) {
					var size = this.getSize(axis);
					this.model.sizeLimit.set(axis, End.MIN, size);
					this.model.sizeLimit.set(axis, End.MAX, size);
				}
			}
		}

		updateModel(): void {
			var model = this.model;
			var parentBox = this.getParentBox();
			model.parent = parentBox ? parentBox.getModel() : null;

			var childModels: BoxModel[] = [];
			for (var i = 0, n = this.children.length; i < n; i++) {
				var childBox = this.children[i];
				if (childBox.getIsLayoutActive()) {
					childModels.push(childBox.getModel());
					childBox.updateModel();
				}
			}
			model.children = childModels;
		}

		applyModel(): void {
			var model = this.model;
			for (var axis = illa.Axis2D.X; axis <= illa.Axis2D.Y; axis++) {
				this.setOffset(model.outOffset.get(axis), axis);
				this.setShowScrollbar(model.outShowScrollbar.get(axis), axis);
				if (!this.getSizeIsFull(axis) && !this.getSizeIsAuto(axis)) {
					this.setSize(model.outSize.get(axis), axis);
				}
			}

			for (var i = 0, n = this.children.length; i < n; i++) {
				var child = this.children[i];
				child.applyModel();
				this.setNeedsLayoutUpdate(this.getNeedsLayoutUpdate() || child.getNeedsLayoutUpdate());
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

		getSize(axis: illa.Axis2D, context = Context.PARENT): number {
			var result = NaN;
			switch (axis) {
				case illa.Axis2D.X:
					if (isNaN(this.sizeCacheX)) {
						result = this.jQuery[0].offsetWidth;
					} else {
						result = this.sizeCacheX;
					}
					break;
				case illa.Axis2D.Y:
					if (isNaN(this.sizeCacheY)) {
						result = this.jQuery[0].offsetHeight;
					} else {
						result = this.sizeCacheY;
					}
					break;
			}
			if (context == Context.INNER) {
				result -= this.getVisibleScrollbarSize(axis);
				result = Math.max(0, result);
			}
			return result;
		}

		getSizeIsAuto(axis: illa.Axis2D): boolean {
			var result = false;
			switch (axis) {
				case illa.Axis2D.X:
					result = this.sizeIsAutoX;
					break;
				case illa.Axis2D.Y:
					result = this.sizeIsAutoY;
					break;
			}
			return result;
		}

		getSizeIsFull(axis: illa.Axis2D): boolean {
			var result = false;
			switch (axis) {
				case illa.Axis2D.X:
					result = this.sizeIsFullX;
					break;
				case illa.Axis2D.Y:
					result = this.sizeIsFullY;
					break;
			}
			return result;
		}

		setSize(v: number, a?: illa.Axis2D, context = Context.PARENT): void {
			this.setSizeIsFull(false, a);
			this.setSizeIsAuto(false, a);
			for (var axis = a || illa.Axis2D.X, lastAxis = (a != null ? a : illa.Axis2D.Y); axis <= lastAxis; axis++) {
				var value = v;
				if (context == Context.INNER) {
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
							this.jQuery[0].style.width = value + 'px';
						}
						break;
					case illa.Axis2D.Y:
						if (this.sizeCacheY != value) {
							this.sizeCacheY = value;
							this.jQuery[0].style.height = value + 'px';
						}
						break;
				}
			}
		}

		setSizeIsFull(flag: boolean, axis?: illa.Axis2D): void {
			if (flag) {
				this.clearSizeCache(axis);
				this.setSizeIsAuto(false, axis);
			}
			switch (axis) {
				default:
				case illa.Axis2D.X:
					if (this.sizeIsFullX != flag) {
						this.sizeIsFullX = flag;
						this.jQuery.toggleClass(Box.CSS_CLASS_SIZE_FULL_X, flag);
						this.setNeedsLayoutUpdate(true);
					}
					if (axis != null) break;
				case illa.Axis2D.Y:
					if (this.sizeIsFullY != flag) {
						this.sizeIsFullY = flag;
						this.jQuery.toggleClass(Box.CSS_CLASS_SIZE_FULL_Y, flag);
						this.setNeedsLayoutUpdate(true);
					}
			}
		}

		setSizeIsAuto(flag: boolean, axis?: illa.Axis2D): void {
			if (flag) {
				this.clearSizeCache(axis);
				this.setSizeIsFull(false, axis);
			}
			switch (axis) {
				default:
				case illa.Axis2D.X:
					if (this.sizeIsAutoX != flag) {
						this.sizeIsAutoX = flag;
						this.jQuery.toggleClass(Box.CSS_CLASS_SIZE_AUTO_X, flag);
						this.setNeedsLayoutUpdate(true);
					}
					if (axis != null) break;
				case illa.Axis2D.Y:
					if (this.sizeIsAutoY != flag) {
						this.sizeIsAutoY = flag;
						this.jQuery.toggleClass(Box.CSS_CLASS_SIZE_AUTO_Y, flag);
						this.setNeedsLayoutUpdate(true);
					}
			}
		}

		getOffset(axis: illa.Axis2D, alignment = Alignment.START, context = Context.PARENT): number {
			var result = NaN;
			var offset: JQueryCoordinates;
			switch (context) {
				case Context.INNER:
					offset = { left: 0, top: 0 };
					break;
				case Context.PARENT:
					if (isNaN(this.offsetCacheX) || isNaN(this.offsetCacheY)) {
						offset = this.jQuery.position();
					} else {
						offset = { left: this.offsetCacheX, top: this.offsetCacheY };
					}
					break;
				case Context.PAGE:
					offset = this.jQuery.offset();
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
			if (alignment != Alignment.START) {
				var size = this.getSize(axis, context);
				if (alignment == Alignment.CENTER) {
					size = size / 2;
				}
				result += size;
			}
			return result;
		}

		setOffset(v: number, a?: illa.Axis2D, alignment = Alignment.START, context = Context.PARENT): void {
			for (var axis = a || illa.Axis2D.X, lastAxis = (a != null ? a : illa.Axis2D.Y); axis <= lastAxis; axis++) {
				var value = v;
				if (context == Context.PAGE) {
					var pageOffset = this.getOffset(axis, Alignment.START, Context.PAGE);
					var currentOffset = this.getOffset(axis);
					value -= pageOffset - currentOffset; // Page offset of parent
				} else if (context == Context.INNER) {
					value += this.getOffset(axis); // Parent offset
				}
				if (alignment != Alignment.START) {
					var size = this.getSize(axis, context);
					if (alignment == Alignment.CENTER) {
						size = size / 2;
					}
					value -= size;
				}
				if (isNaN(value) || !isFinite(value)) {
					value = 0;
				} else {
					value = Math.round(value);
				}
				switch (axis) {
					case illa.Axis2D.X:
						if (this.offsetCacheX != value) {
							this.offsetCacheX = value;
							this.jQuery[0].style.left = value + 'px';
						}
						break;
					case illa.Axis2D.Y:
						if (this.offsetCacheY != value) {
							this.offsetCacheY = value;
							this.jQuery[0].style.top = value + 'px';
						}
						break;
				}
			}
		}

		getShowScrollbar(axis: illa.Axis2D): boolean {
			var overflow = '';
			switch (axis) {
				case illa.Axis2D.X:
					overflow = this.jQuery[0].style.overflowY;
					break;
				case illa.Axis2D.Y:
					overflow = this.jQuery[0].style.overflowX;
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
						this.jQuery[0].style.overflowY = overflow;
					}
					if (axis != null) break;
				case illa.Axis2D.Y:
					if (this.getShowScrollbar(illa.Axis2D.Y) != flag) {
						this.jQuery[0].style.overflowX = overflow;
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
			return illa.ScrollbarUtil.getDefaultSize(axis);
		}

		static getFrom(source: JQuery): Box {
			var result: Box = null;
			if (source) {
				var stored = source.data(Box.JQUERY_DATA_KEY);
				if (stored instanceof Box) {
					result = stored;
				}
			}
			return result;
		}

		setParent(parent: Box, end?: End, related?: Box, dontModifyDOM?: boolean): void;
		setParent(parent: JQuery, end?: End, related?: JQuery, dontModifyDOM?: boolean): void;
		setParent(parent: string, end?: End, dontModifyDOM?: boolean): void;
		setParent(parent, end = End.MAX, related = null, dontModifyDOM = false) {
			var parentBox: Box = null;
			var parentJQuery: JQuery = null;
			var relatedBox: Box = null;
			var relatedJQuery: JQuery = null;

			if (parent instanceof Box) {
				parentBox = <Box>parent;
				relatedBox = <Box>related;
			} else if (parent instanceof jQuery || related instanceof jQuery) {
				parentJQuery = <JQuery>parent;
				relatedJQuery = <JQuery>related;
				parentBox = Box.getFrom(parentJQuery);
				relatedBox = Box.getFrom(relatedJQuery);
			} else if (typeof parent == 'string') {
				parentJQuery = jQuery(<string>parent);
			}

			if (this.parentBox) {
				this.parentBox.removeChild(this);
			}

			if (parentBox) {
				if (this.parentBox != parentBox) {
					if (!dontModifyDOM) {
						parentBox.getJQuery().append(this.getJQuery());
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
						case End.MIN:
							relatedJQuery.insertBefore(this.getJQuery());
							break;
						case End.MAX:
							relatedJQuery.insertAfter(this.getJQuery());
							break;
					}
				}
				this.setIsRoot(true);
			} else if (parentJQuery) {
				this.parentBox = null;
				this.parentJQuery = parentJQuery;

				if (!dontModifyDOM) {
					switch (end) {
						case End.MIN:
							parentJQuery.append(this.getJQuery());
							break;
						case End.MAX:
							parentJQuery.prepend(this.getJQuery());
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

		getParentJQuery(): JQuery {
			return this.parentJQuery;
		}

		getEventParent(): illa.IIventHandler {
			if (this.parentBox) {
				return this.parentBox;
			} else if (this.parentJQuery) {
				return Box.getFrom(this.parentJQuery.closest('.' + Box.CSS_CLASS));
			} else {
				return null;
			}
		}

		insertChild(child: Box, end = End.MAX, related: Box = null): void {
			var newIndex = 0;
			if (related) {
				var relatedIndex = this.getChildIndex(related);
				if (relatedIndex == -1) throw 'Related not a child.';
				switch (end) {
					case End.MIN:
						newIndex = relatedIndex;
						break;
					case End.MAX:
						newIndex = relatedIndex + 1;
						break;
				}
				this.children.splice(newIndex, 0, child);
			} else {
				switch (end) {
					case End.MIN:
						this.children.unshift(child);
						break;
					case End.MAX:
						newIndex = this.children.push(child) - 1;
						break;
				}
			}
			if (child.name) illa.Log.infoIf(this.name, 'inserted child:', child.name);
			this.updateChildZIndexes(newIndex);
			this.setNeedsLayoutUpdate(true);
		}

		moveChild(child: Box, end = End.MAX, related: Box = null): void {
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
			return jQuery.inArray(child, this.children);
		}

		destroy(): void {
			this.getJQuery().remove();
		}

		onDestroyed(event: JQueryEventObject): void {
			illa.Log.infoIf(this.name, 'is being destroyed.');
			this.isDestroyed = true;
			var hasNotDestroyedParentBox = this.parentBox && !this.parentBox.getIsDestroyed();
			var hasParentJQ = this.parentJQuery != null;
			if (hasNotDestroyedParentBox || hasParentJQ) {
				illa.Log.infoIf(this.name, 'is unsetting its parent.');
				this.setParent(null);
			}
		}

		getZIndex(): number {
			return this.zIndex;
		}

		setZIndex(value: number): void {
			if (this.zIndex == value) return;
			illa.Log.infoIf(this.name, 'has a new z-index: ' + value);
			this.zIndex = value;
			this.getJQuery()[0].style.zIndex = <any>value;
		}

		getIsDestroyed(): boolean {
			return this.isDestroyed;
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
				Box.ROOT_TICKER.addIventCallback(illa.Ticker.EVENT_TICK, this.onRootTick, this);
			} else {
				Box.ROOT_TICKER.removeIventCallback(illa.Ticker.EVENT_TICK, this.onRootTick, this);
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
			var result = NaN;
			switch (axis) {
				case illa.Axis2D.X:
					result = this.getJQuery().scrollLeft();
					break;
				case illa.Axis2D.Y:
					result = this.getJQuery().scrollTop();
					break;
			}
			return result;
		}

		setScroll(value: number, axis?: illa.Axis2D): void {
			switch (axis) {
				default:
				case illa.Axis2D.X:
					this.getJQuery().scrollLeft(value);
					if (axis != null) break;
				case illa.Axis2D.Y:
					this.getJQuery().scrollTop(value);
			}
		}

		getModel(): BoxModel {
			return this.model;
		}

		getNeedsLayoutUpdate(): boolean {
			return this.model.needsLayoutUpdate;
		}

		setNeedsLayoutUpdate(value: boolean): void {
			this.model.needsLayoutUpdate = value;
		}

		getAlignment(axis: illa.Axis2D): Alignment {
			return this.model.alignment.get(axis);
		}

		setAlignment(value: Alignment, a?: illa.Axis2D): void {
			for (var axis = a || illa.Axis2D.X, lastAxis = (a != null ? a : illa.Axis2D.Y); axis <= lastAxis; axis++) {
				this.model.alignment.set(axis, value);
			}
			this.setNeedsLayoutUpdate(true);
		}

		getInset(axis: illa.Axis2D, end: End): number {
			return this.model.inset.get(axis, end);
		}

		setInset(value: number, a?: illa.Axis2D, e?: End): void {
			for (var axis = a || illa.Axis2D.X, lastAxis = (a != null ? a : illa.Axis2D.Y); axis <= lastAxis; axis++) {
				for (var end = e || End.MIN, lastEnd = (e != null ? e : End.MAX); end <= lastEnd; end++) {
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

		getSizeLimit(axis: illa.Axis2D, end: End): number {
			return this.model.sizeLimit.get(axis, end);
		}

		setSizeLimit(min: number, max: number, a?: illa.Axis2D): void {
			for (var axis = a || illa.Axis2D.X, lastAxis = (a != null ? a : illa.Axis2D.Y); axis <= lastAxis; axis++) {
				if (!isNaN(min)) {
					min = Math.max(0, min);
					this.model.sizeLimit.set(axis, End.MIN, min);
				}
				if (!isNaN(max)) {
					this.model.sizeLimit.set(axis, End.MAX, max);
				}
			}
		}

		getShrinkWrapSizeLimit(axis: illa.Axis2D, end: End, end2: End): number {
			return this.model.shrinkWrapSizeLimit.get(axis, end, end2);
		}

		setShrinkWrapSizeLimit(value: number, a?: illa.Axis2D, e?: End, e2?: End): void {
			for (var axis = a || illa.Axis2D.X, lastAxis = (a != null ? a : illa.Axis2D.Y); axis <= lastAxis; axis++) {
				for (var end = e || End.MIN, lastEnd = (e != null ? e : End.MAX); end <= lastEnd; end++) {
					for (var end2 = e2 || End.MIN, lastEnd2 = (e2 != null ? e2 : End.MAX); end2 <= lastEnd2; end2++) {
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

		getShrinkWrap(axis: illa.Axis2D): boolean {
			return this.model.shrinkWrap.get(axis);
		}

		setShrinkWrap(value: boolean, a?: illa.Axis2D): void {
			for (var axis = a || illa.Axis2D.X, lastAxis = (a != null ? a : illa.Axis2D.Y); axis <= lastAxis; axis++) {
				this.model.shrinkWrap.set(axis, value);
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

		applyStyle(key: string, value: string): boolean {
			var success = true;
			switch (key) {
				case 'size-is-full':
					this.setSizeIsFull(StyleUtil.readBoolean(value));
					break;
				case 'size-is-full-x':
					this.setSizeIsFull(StyleUtil.readBoolean(value), illa.Axis2D.X);
					break;
				case 'size-is-full-y':
					this.setSizeIsFull(StyleUtil.readBoolean(value), illa.Axis2D.Y);
					break;

				case 'size-is-auto':
					this.setSizeIsAuto(StyleUtil.readBoolean(value));
					break;
				case 'size-is-auto-x':
					this.setSizeIsAuto(StyleUtil.readBoolean(value), illa.Axis2D.X);
					break;
				case 'size-is-auto-y':
					this.setSizeIsAuto(StyleUtil.readBoolean(value), illa.Axis2D.Y);
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
					this.setInset(StyleUtil.readNumber(value), illa.Axis2D.X, End.MIN);
					break;
				case 'inset-right':
					this.setInset(StyleUtil.readNumber(value), illa.Axis2D.X, End.MAX);
					break;
				case 'inset-top':
					this.setInset(StyleUtil.readNumber(value), illa.Axis2D.Y, End.MIN);
					break;
				case 'inset-bottom':
					this.setInset(StyleUtil.readNumber(value), illa.Axis2D.Y, End.MAX);
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
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), undefined, End.MIN);
					break;
				case 'shrink-wrap-size-limit-max':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), undefined, End.MAX);
					break;
				case 'shrink-wrap-size-limit-x-min':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.X, End.MIN);
					break;
				case 'shrink-wrap-size-limit-x-max':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.X, End.MAX);
					break;
				case 'shrink-wrap-size-limit-y-min':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.Y, End.MIN);
					break;
				case 'shrink-wrap-size-limit-y-max':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.Y, End.MAX);
					break;
				case 'shrink-wrap-size-limit-min-min':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), undefined, End.MIN, End.MIN);
					break;
				case 'shrink-wrap-size-limit-min-max':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), undefined, End.MIN, End.MAX);
					break;
				case 'shrink-wrap-size-limit-max-min':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), undefined, End.MAX, End.MIN);
					break;
				case 'shrink-wrap-size-limit-max-max':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), undefined, End.MAX, End.MAX);
					break;
				case 'shrink-wrap-size-limit-x-min-min':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.X, End.MIN, End.MIN);
					break;
				case 'shrink-wrap-size-limit-x-min-max':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.X, End.MIN, End.MAX);
					break;
				case 'shrink-wrap-size-limit-x-max-min':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.X, End.MAX, End.MIN);
					break;
				case 'shrink-wrap-size-limit-x-max-max':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.X, End.MAX, End.MAX);
					break;
				case 'shrink-wrap-size-limit-y-min-min':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.Y, End.MIN, End.MIN);
					break;
				case 'shrink-wrap-size-limit-y-min-max':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.Y, End.MIN, End.MAX);
					break;
				case 'shrink-wrap-size-limit-y-max-min':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.Y, End.MAX, End.MIN);
					break;
				case 'shrink-wrap-size-limit-y-max-max':
					this.setShrinkWrapSizeLimit(StyleUtil.readNumber(value), illa.Axis2D.Y, End.MAX, End.MAX);
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

				case 'shrink-wrap':
					this.setShrinkWrap(StyleUtil.readBoolean(value));
					break;
				case 'shrink-wrap-x':
					this.setShrinkWrap(StyleUtil.readBoolean(value), illa.Axis2D.X);
					break;
				case 'shrink-wrap-y':
					this.setShrinkWrap(StyleUtil.readBoolean(value), illa.Axis2D.Y);
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

				default:
					success = false;
			}
			
			return success;
		}
	}
}