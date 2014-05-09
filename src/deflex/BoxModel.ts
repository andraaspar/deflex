/// <reference path='../../node_modules/andraaspar-illa/src/illa/Axis2D.ts'/>
/// <reference path='../../node_modules/andraaspar-illa/src/illa/Log.ts'/>
/// <reference path='../../node_modules/andraaspar-illa/src/illa/Prop.ts'/>
/// <reference path='../../node_modules/andraaspar-illa/src/illa/Prop2.ts'/>
/// <reference path='../../node_modules/andraaspar-illa/src/illa/Prop4.ts'/>
/// <reference path='../../node_modules/andraaspar-illa/src/illa/Prop8.ts'/>
/// <reference path='Alignment.ts'/>
/// <reference path='End.ts'/>
/// <reference path='IBoxImp.ts'/>

module deflex {
	export class BoxModel {
		outOffset =
		new illa.Prop2<illa.Axis2D, number>([0, 0], null, null);

		outSize =
		new illa.Prop2<illa.Axis2D, number>([0, 0], null, null);

		outShowScrollbar =
		new illa.Prop2<illa.Axis2D, boolean>([false, false], this.onSettingChanged, this);

		inset =
		new illa.Prop4<illa.Axis2D, End, number>([0, 0, 0, 0], this.onSettingChanged, this);

		sizeLimit =
		new illa.Prop4<illa.Axis2D, End, number>([0, Infinity, 0, Infinity], this.onSettingChanged, this);

		shrinkWrapSizeLimit =
		new illa.Prop8<illa.Axis2D, End, End, number>([0, Infinity, 0, Infinity, 0, Infinity, 0, Infinity], this.onSettingChanged, this);

		spaceBefore =
		new illa.Prop2<illa.Axis2D, number>([NaN, NaN], this.onSettingChanged, this);

		defaultSpaceBefore =
		new illa.Prop2<illa.Axis2D, number>([1, 1], this.onSettingChanged, this);

		weight =
		new illa.Prop2<illa.Axis2D, number>([1, 1], this.onSettingChanged, this);

		shrinkWrap =
		new illa.Prop2<illa.Axis2D, boolean>([false, false], this.onSettingChanged, this);

		useContentWeight =
		new illa.Prop2<illa.Axis2D, boolean>([false, false], this.onSettingChanged, this);

		alignment =
		new illa.Prop2<illa.Axis2D, Alignment>([Alignment.START, Alignment.START], this.onSettingChanged, this);

		isSpacer =
		new illa.Prop(false, this.onSettingChanged, this);

		direction =
		new illa.Prop(illa.Axis2D.X, this.onSettingChanged, this);

		applySizeToSelf =
		new illa.Prop(false, this.onSettingChanged, this);

		mayShowScrollbar =
		new illa.Prop2<illa.Axis2D, boolean>([true, true], this.onSettingChanged, this);

		parent: BoxModel;
		children: BoxModel[] = [];

		needsLayoutUpdate = false;

		constructor(private imp: IBoxImp) {

		}

		onSettingChanged(): void {
			this.needsLayoutUpdate = true;
		}

		solveLayout(): void {
			for (var axis = illa.Axis2D.X; axis <= illa.Axis2D.Y; axis++) {
				this.outShowScrollbar.set(axis, false);
			}
			while (this.needsLayoutUpdate) {
				this.solveLayoutStep();
			}
		}

		solveLayoutStep(): void {
			this.needsLayoutUpdate = false;

			this.applyShrinkWrap();
			if (this.needsLayoutUpdate) {
				// Shrink wrap changed size limits - new size must be applied
				return;
			}

			for (var axis = illa.Axis2D.X; axis <= illa.Axis2D.Y; axis++) {
				if (this.applySizeToSelf.get()) {
					this.outSize.set(axis, this.sizeLimit.get(axis, End.MIN));
				}

				if (this.direction.get() == axis) {
					var remainingSpace = this.shareSpaceAmongChildren(axis);
					this.stackChildren(axis, remainingSpace);
				} else {
					var contentSpace = this.getContentSpace(axis);
					var largestMinSize = this.getLargestChildSizeLimit(axis, End.MIN);
					var sizeToset = Math.max(contentSpace, largestMinSize);
					this.setChildSizes(axis, sizeToset);
					this.alignChildren(axis, sizeToset);
					var remainingSpace = contentSpace - largestMinSize;
				}

				if (this.mayShowScrollbar.get(1 - axis)) {
					this.outShowScrollbar.set(1 - axis, remainingSpace + this.inset.get(axis, End.MAX) < 0);
				}
			}

			if (this.needsLayoutUpdate) {
				// Scrollbar visibility changed - own or content size will change
				return;
			}

			for (var i = 0, n = this.children.length; i < n; i++) {
				var child = this.children[i];
				child.solveLayoutStep();
				this.needsLayoutUpdate = this.needsLayoutUpdate || child.needsLayoutUpdate;
			}
		}

		shareSpaceAmongChildren(axis: illa.Axis2D): number {
			var allWeight = 0;

			// Reset size & gather data

			for (var i = 0, n = this.children.length; i < n; i++) {
				var item = this.children[i];
				item.outSize.set(axis, item.sizeLimit.get(axis, End.MIN));
				allWeight += item.weight.get(axis);
			}

			var growables = this.children.slice(0);
			growables.sort(function(a, b) {
				// Largest maxSize comes first
				var result = b.sizeLimit.get(axis, End.MAX) - a.sizeLimit.get(axis, End.MAX);
				return result || 0; // Avoid NaN
			});

			var remainingSpace = this.getContentSpace(axis) - this.getChildSizeLimits(axis, End.MIN);

			// Share space

			while (remainingSpace > 0) {
				while (growables.length && growables.length > remainingSpace) {
					var maxedOut = growables.pop();
					allWeight -= maxedOut.weight.get(axis);
				}
				
				if (growables.length == 0 || allWeight == 0) {
					break;
				}

				var spaceUnit = Math.floor(remainingSpace / allWeight) || 1;

				for (var i = 0, n = growables.length; i < n; i++) {
					var growable = growables[i];
					var prevSize = growable.outSize.get(axis);
					var newSize = Math.max(growable.sizeLimit.get(axis, End.MIN),
						Math.min(growable.sizeLimit.get(axis, End.MAX),
							prevSize + spaceUnit * growable.weight.get(axis)));
					if (newSize == prevSize) {
						growables.splice(i, 1);
						allWeight -= growable.weight.get(axis);
						i--;
						n--;
					} else {
						growable.outSize.set(axis, newSize);
						remainingSpace -= newSize - prevSize;
					}
				}
			}

			return remainingSpace;
		}

		stackChildren(axis: illa.Axis2D, remainingSpace: number): void {
			if (this.alignment.get(axis) == Alignment.CENTER) {
				var offset = Math.floor(remainingSpace / 2);
			} else if (this.alignment.get(axis) == Alignment.END) {
				var offset = remainingSpace;
			} else {
				var offset = 0;
			}
			offset = Math.max(0, offset);
			offset += this.inset.get(axis, End.MIN);

			for (var i = 0, n = this.children.length; i < n; i++) {
				var item = this.children[i];
				if (i > 0) {
					if (isNaN(item.spaceBefore.get(axis))) {
						offset += this.defaultSpaceBefore.get(axis);
					} else {
						offset += item.spaceBefore.get(axis);
					}
				}
				item.outOffset.set(axis, offset);
				offset += item.outSize.get(axis);
			}
		}

		alignChildren(axis: illa.Axis2D, contentSpace: number) {
			var insetStart = this.inset.get(axis, End.MIN);
			for (var i = 0, n = this.children.length; i < n; i++) {
				var item = this.children[i];
				var offset = insetStart;
				switch (this.alignment.get(axis)) {
					case Alignment.CENTER:
						offset += Math.max(0, (contentSpace - item.outSize.get(axis)) / 2);
						break;
					case Alignment.END:
						offset += Math.max(0, contentSpace - item.outSize.get(axis));
						break;
				}
				item.outOffset.set(axis, offset);
			}

		}

		setChildSizes(axis: illa.Axis2D, size: number): void {
			for (var i = 0, n = this.children.length; i < n; i++) {
				var item = this.children[i];
				var sizeToSet = Math.max(item.sizeLimit.get(axis, End.MIN),
					Math.min(item.sizeLimit.get(axis, End.MAX), size));
				item.outSize.set(axis, sizeToSet);
			}
		}

		applyContentWeight(): void {
			var childrenWeight = 0;
			for (var i = 0, n = this.children.length; i < n; i++) {
				var child = this.children[i];
				child.applyContentWeight();

				for (var axis = illa.Axis2D.X; axis <= illa.Axis2D.Y; axis++) {
					childrenWeight = child.weight.get(axis);
				}
			}
			if (this.useContentWeight.get(axis)) {
				this.weight.set(axis, childrenWeight);
			}
		}

		getShrinkWrappedSizeLimit(axis: illa.Axis2D, end: End): number {
			if (axis == this.direction.get()) {
				var result = this.getChildSizeLimits(axis, end);
			} else {
				var result = this.getLargestChildSizeLimit(axis, end);
			}

			result = Math.max(this.shrinkWrapSizeLimit.get(axis, end, End.MIN),
				Math.min(this.shrinkWrapSizeLimit.get(axis, end, End.MAX), result));

			result += this.inset.get(axis, End.MIN);
			result += this.inset.get(axis, End.MAX);
			if (this.outShowScrollbar.get(axis)) {
				result += this.imp.getScrollbarSize(axis);
			}
			return result;
		}

		applyShrinkWrap(): void {
			for (var axis = illa.Axis2D.X; axis <= illa.Axis2D.Y; axis++) {
				if (this.shrinkWrap.get(axis)) {
					for (var end = End.MIN; end <= End.MAX; end++) {
						for (var end2 = End.MIN; end2 <= End.MAX; end2++) {
							this.sizeLimit.set(axis, end, this.getShrinkWrappedSizeLimit(axis, end));
						}
					}
				}
			}
		}

		getContentSpace(axis: illa.Axis2D): number {
			var result = this.outSize.get(axis) - this.inset.get(axis, End.MIN) - this.inset.get(axis, End.MAX);
			if (this.outShowScrollbar.get(axis)) {
				result -= this.imp.getScrollbarSize(axis);
			}
			return result;
		}

		getChildSizeLimits(axis: illa.Axis2D, end: End): number {
			var result = 0;
			for (var i = 0, n = this.children.length; i < n; i++) {
				var child = this.children[i];
				// Spacers must not expand maximum size of shrinkwrapped container
				var endToGet = child.isSpacer.get() ? End.MIN : end;

				result += child.sizeLimit.get(axis, endToGet);
				if (i > 0) {
					var childSpaceBefore = child.spaceBefore.get(axis);
					if (isNaN(childSpaceBefore)) {
						result += this.defaultSpaceBefore.get(axis);
					} else {
						result += childSpaceBefore;
					}
				}
				if (!isFinite(result)) {
					// Early exit for Infinity in lengths
					break;
				}
			}
			return result;
		}

		getLargestChildSizeLimit(axis: illa.Axis2D, end: End) {
			var result = 0;
			for (var i = 0, n = this.children.length; i < n; i++) {
				var child = this.children[i];
				// Spacers must not expand maximum size of shrinkwrapped container
				var endToGet = child.isSpacer.get() ? End.MIN : end;

				result = Math.max(result, child.sizeLimit.get(axis, endToGet));
				if (!isFinite(result)) {
					// Early exit for Infinity in lengths
					break;
				}
			}
			return result;
		}
	}
}