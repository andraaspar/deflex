module deflex {
	export class StyleUtil {
		static readBoolean(value: string): boolean {
			switch (value.toLowerCase()) {
				case 'true': return true;
				case 'false': return false;
				default: throw 'Invalid value. Expected boolean, got: ' + value;
			}
		}
		
		static readNumber(value: string): number {
			switch (value.toLowerCase()) {
				case 'nan': return NaN;
				case 'infinity': return Infinity;
				case '-infinity': return -Infinity;
				default:
					var result = Number(value.replace(/\s*px/ig, ''));
					if (isNaN(result)) throw 'Invalid value. Expected number, got: ' + value;
					return result;
			}
		}
		
		static readAxis2D(value: string): illa.Axis2D {
			switch (value.toLowerCase()) {
				case 'x': return illa.Axis2D.X;
				case 'y': return illa.Axis2D.Y;
				default: throw 'Invalid value. Expected axis, got: ' + value;
			}
		}
		
		static readAlignment(value: string): illa.Alignment {
			switch (value.toLowerCase()) {
				case 'start': return illa.Alignment.START;
				case 'center': return illa.Alignment.CENTER;
				case 'end': return illa.Alignment.END;
				default: throw 'Invalid value. Expected alignment, got: ' + value;
			}
		}
		
		static readBoxSizeSource(value: string): BoxSizeSource {
			switch (value.toLowerCase()) {
				case 'parent-box': return BoxSizeSource.PARENT_BOX;
				case 'child-boxes': return BoxSizeSource.CHILD_BOXES;
				case 'jquery-auto': return BoxSizeSource.JQUERY_AUTO;
				case 'jquery-full': return BoxSizeSource.JQUERY_FULL;
				default: throw 'Invalid value. Expected box size source, got: ' + value;
			}
		}
	}
}