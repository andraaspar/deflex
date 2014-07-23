/// <reference path='../../lib/illa/Log.ts'/>
/// <reference path='Box.ts'/>
/// <reference path='IBoxConstructor.ts'/>

module deflex {
	import jquery = berek.jquery;
	
	export class Factory {
		static CLASS_ATTRIBUTE_NAME = 'data-deflex-class';
		static STYLE_ATTRIBUTE_NAME = 'data-deflex-style';
		static boxConstructors: { [s: string]: IBoxConstructor } = { 'default': Box };

		static checkDOM(): void {
			var jqs = jquery.$('[' + this.CLASS_ATTRIBUTE_NAME + '],[' + this.STYLE_ATTRIBUTE_NAME + ']');
			for (var i = 0, n = jqs.length; i < n; i++) {
				var jq = jqs.eq(i);
				this.create(jq);
			}
		}

		static create(jq: berek.jquery.IInstance): Box {
			var constructorName = jq.attr(this.CLASS_ATTRIBUTE_NAME);
			jq.removeAttr(this.CLASS_ATTRIBUTE_NAME);
			if (typeof constructorName != 'string') {
				constructorName = 'default';
			}

			var boxConstructor = this.boxConstructors[constructorName];
			var box = new boxConstructor(jq);

			var styleString = jq.attr(this.STYLE_ATTRIBUTE_NAME);
			jq.removeAttr(this.STYLE_ATTRIBUTE_NAME);
			if (styleString) {
				this.applyStyle(box, styleString);
			}

			return box;
		}

		static applyStyle(box: Box, styleString: string): void {
			// Trim white space
			styleString = styleString.replace(/^\s+/, '').replace(/\s+$/, '');

			var style = styleString.split(/\s*;\s*/g);
			for (var i = 0, n = style.length; i < n; i++) {
				var styleSplit = style[i].split(/\s*:\s*/g);
				var key = styleSplit[0];
				var value = styleSplit[1];
				
				if (key) {
					try {
						if (!box.applyStyle(key, value)) {
							illa.Log.warn('Style key not recognized: ' + key);
						}
					} catch (e) {
						illa.Log.warn(key + ': ' + e);
					}
				}
			}
		}
	}
}