/// <reference path='../../lib/illa/Log.ts'/>
/// <reference path='Box.ts'/>
/// <reference path='IBoxConstructor.ts'/>

module deflex {

	export class Factory {
		static CLASS_ATTRIBUTE_NAME = 'data-deflex-class';
		static STYLE_ATTRIBUTE_NAME = 'data-deflex-style';
		static boxConstructors: { [s: string]: IBoxConstructor } = { 'default': Box };
		static styleClasses: { [s: string]: string } = {};

		static checkDOM(): void {
			var jqs = jQuery('[' + this.CLASS_ATTRIBUTE_NAME + '],[' + this.STYLE_ATTRIBUTE_NAME + ']');
			for (var i = 0, n = jqs.length; i < n; i++) {
				var jq = jqs.eq(i);
				this.create(jq);
			}
		}

		static create(jq: jQuery.IInstance): Box {
			var className = jq.attr(this.CLASS_ATTRIBUTE_NAME);
			jq.removeAttr(this.CLASS_ATTRIBUTE_NAME);
			if (!illa.isString(className) || className == '') {
				className = 'default';
			}

			var boxConstructor = this.boxConstructors[className];
			var box = new boxConstructor();
			box.initBox(jq);
			
			var styleClassString = this.styleClasses[className];
			if (illa.isString(styleClassString)) {
				box.applyStyle(styleClassString);
			}

			var styleString = jq.attr(this.STYLE_ATTRIBUTE_NAME);
			jq.removeAttr(this.STYLE_ATTRIBUTE_NAME);
			if (styleString) {
				box.applyStyle(styleString);
			}

			return box;
		}
	}
}