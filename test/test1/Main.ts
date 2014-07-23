/// <reference path='../../lib/berek/jquery/_module.ts'/>
/// <reference path='../../lib/illa/Log.ts'/>
/// <reference path='../../src/deflex/Factory.ts'/>

module test1 {
	import jquery = berek.jquery;
	
	export class Main {
		outer: deflex.Box;

		constructor() {
			jquery.$(illa.bind(this.onDOMLoaded, this));
		}

		onDOMLoaded() {
			var startTime = new Date().getTime();

			var itemCount = 0;

			var outer = this.outer = new deflex.Box();
			outer.name = 'outer';
			outer.setParent('body');
			outer.getJQuery().css({ 'background-color': '#aaa' });
			outer.setSizeIsFull(true);
			outer.setAlignment(deflex.Alignment.CENTER);
			outer.setDirection(illa.Axis2D.Y);
			itemCount++;

			var markup = '';
			for (var i = 0, n = 20; i < n; i++) {
				markup += '<div data-deflex-style="shrink-wrap: true">';
				itemCount++;

				for (var j = 0, o = 20; j < o; j++) {
					markup += '<div style="background-color: #ededed" ' +
					'data-deflex-style="alignment: center; may-show-scrollbar: false; shrink-wrap: true; ' +
					'shrink-wrap-size-limit: infinity; shrink-wrap-size-limit-x-min-min: 44px; shrink-wrap-size-limit-y-min-min: 0px">';
					itemCount++;

					markup += '<div data-deflex-style="size-is-auto: true">Cell ' + (i * n + j) + '</div>';
					itemCount++;

					markup += '</div>';
				}

				markup += '</div>';
			}
			
			outer.getJQuery().html(markup);
			
			deflex.Factory.checkDOM();

			illa.Log.info('Init finished:', new Date().getTime() - startTime, 'ms.');
			illa.Log.info('Item count:', itemCount);
		}
	}
}

var test1Main = new test1.Main();