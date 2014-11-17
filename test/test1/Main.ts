/// <reference path='../../lib/jQuery.d.ts'/>

/// <reference path='../../lib/illa/Arrkup.ts'/>
/// <reference path='../../lib/illa/Log.ts'/>

/// <reference path='../../lib/berek/UnitTest.ts'/>

/// <reference path='../../src/deflex/Factory.ts'/>

module test1 {
	
	export class Main {
		
		private static instance = new Main();
		
		private u: berek.UnitTest;
		private uOut: jQuery.IInstance;
		private div1: jQuery.IInstance;
		private root1: deflex.Box;

		constructor() {
			jQuery(illa.bind(this.onDOMLoaded, this));
		}

		onDOMLoaded() {
		
			this.uOut = jQuery('<div>');
			this.u = new berek.UnitTest(this.uOut);
			
			this.div1 = jQuery(illa.Arrkup.createString(['div', {style: 'position: relative; top: 20px; left: 10px; width: 100px; height: 200px; padding: 2px 0 0 1px'}]));
			this.div1.appendTo('body');
			
			this.root1 = new deflex.Box();
			this.root1.setParent(this.div1);
			
			deflex.Box.ROOT_TICKER.addEventCallback(illa.Ticker.EVENT_AFTER_TICK, this.doTest1, this);
		}
		
		doTest1(e: illa.Event): void {
			this.u.assert(illa.isNull(this.root1.getParentBox()),														'Test1 01');
			this.u.assertEquals(this.root1.getParentJQuery(), this.div1,												'Test1 02');
			this.u.assert(illa.isNull(this.root1.getEventParent()),														'Test1 03');
			this.u.assertEquals(this.root1.getSize(illa.Axis2D.X), 0,													'Test1 04');
			this.u.assertEquals(this.root1.getSize(illa.Axis2D.Y), 0,													'Test1 05');
			this.u.assertEquals(this.root1.getSize(illa.Axis2D.X, berek.Context.INNER), 0,								'Test1 06');
			this.u.assertEquals(this.root1.getSize(illa.Axis2D.Y, berek.Context.INNER), 0,								'Test1 07');
			this.u.assertEquals(this.root1.getSize(illa.Axis2D.X, berek.Context.PARENT), 0,								'Test1 08');
			this.u.assertEquals(this.root1.getSize(illa.Axis2D.Y, berek.Context.PARENT), 0,								'Test1 09');
			this.u.assertEquals(this.root1.getSize(illa.Axis2D.X, berek.Context.PAGE), 0,								'Test1 10');
			this.u.assertEquals(this.root1.getSize(illa.Axis2D.Y, berek.Context.PAGE), 0,								'Test1 11');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X), 0,													'Test1 12');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y), 0,													'Test1 13');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.START), 0,							'Test1 14');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.START), 0,							'Test1 15');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.CENTER), 0,							'Test1 16');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.CENTER), 0,							'Test1 17');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.END), 0,								'Test1 18');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.END), 0,								'Test1 19');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.START, berek.Context.INNER), 0,		'Test1 20');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.START, berek.Context.INNER), 0,		'Test1 21');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.CENTER, berek.Context.INNER), 0,		'Test1 22');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.CENTER, berek.Context.INNER), 0,		'Test1 23');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.END, berek.Context.INNER), 0,		'Test1 24');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.END, berek.Context.INNER), 0,		'Test1 25');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.START, berek.Context.PARENT), 0,		'Test1 26');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.START, berek.Context.PARENT), 0,		'Test1 27');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.CENTER, berek.Context.PARENT), 0,	'Test1 28');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.CENTER, berek.Context.PARENT), 0,	'Test1 29');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.END, berek.Context.PARENT), 0,		'Test1 30');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.END, berek.Context.PARENT), 0,		'Test1 31');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.START, berek.Context.PAGE), 11,		'Test1 32');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.START, berek.Context.PAGE), 22,		'Test1 33');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.CENTER, berek.Context.PAGE), 11,		'Test1 34');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.CENTER, berek.Context.PAGE), 22,		'Test1 35');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.END, berek.Context.PAGE), 11,		'Test1 36');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.END, berek.Context.PAGE), 22,		'Test1 37');
			this.u.assertEquals(this.root1.getShowScrollbar(illa.Axis2D.X), false,										'Test1 38');
			this.u.assertEquals(this.root1.getShowScrollbar(illa.Axis2D.Y), false,										'Test1 39');
			this.u.assertEquals(this.root1.getZIndex(), 0,																'Test1 40');
			this.u.assertEquals(this.root1.getIsDestroyed(), false,														'Test1 41');
			this.u.assertEquals(this.root1.getIsRoot(), true,															'Test1 42');
			this.u.assertEquals(this.root1.getIsLayoutActive(), true,													'Test1 43');
			this.u.assertEquals(this.root1.getIsVisible(), false,														'Test1 44');
			this.u.assertEquals(this.root1.getScroll(illa.Axis2D.X), 0,													'Test1 45');
			this.u.assertEquals(this.root1.getScroll(illa.Axis2D.Y), 0,													'Test1 46');
			this.u.assertEquals(this.root1.getNeedsLayoutUpdate(), false,												'Test1 47');
			this.u.assertEquals(this.root1.getApplySizeToSelf(), true,													'Test1 48');
			this.u.assertEquals(this.root1.getIsSolvingLayout(), false,													'Test1 49');
			
			this.root1.setSizeLimitSource(deflex.SizeLimitSource.JQUERY_FULL);
			
			deflex.Box.ROOT_TICKER.removeEventCallback(illa.Ticker.EVENT_AFTER_TICK, this.doTest1, this);
			deflex.Box.ROOT_TICKER.addEventCallback(illa.Ticker.EVENT_AFTER_TICK, this.doTest2, this);
		}
		
		doTest2(e: illa.Event): void {
			this.u.assertEquals(this.root1.getSize(illa.Axis2D.X), 100,													'Test2 01');
			this.u.assertEquals(this.root1.getSize(illa.Axis2D.Y), 200,													'Test2 02');
			this.u.assertEquals(this.root1.getSize(illa.Axis2D.X, berek.Context.INNER), 100,							'Test2 03');
			this.u.assertEquals(this.root1.getSize(illa.Axis2D.Y, berek.Context.INNER), 200,							'Test2 04');
			this.u.assertEquals(this.root1.getSize(illa.Axis2D.X, berek.Context.PARENT), 100,							'Test2 05');
			this.u.assertEquals(this.root1.getSize(illa.Axis2D.Y, berek.Context.PARENT), 200,							'Test2 06');
			this.u.assertEquals(this.root1.getSize(illa.Axis2D.X, berek.Context.PAGE), 100,								'Test2 07');
			this.u.assertEquals(this.root1.getSize(illa.Axis2D.Y, berek.Context.PAGE), 200,								'Test2 08');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X), 0,													'Test2 09');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y), 0,													'Test2 10');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.START), 0,							'Test2 11');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.START), 0,							'Test2 12');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.CENTER), 50,							'Test2 13');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.CENTER), 100,						'Test2 14');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.END), 100,							'Test2 15');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.END), 200,							'Test2 16');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.START, berek.Context.INNER), 0,		'Test2 17');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.START, berek.Context.INNER), 0,		'Test2 18');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.CENTER, berek.Context.INNER), 50,	'Test2 19');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.CENTER, berek.Context.INNER), 100,	'Test2 20');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.END, berek.Context.INNER), 100,		'Test2 21');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.END, berek.Context.INNER), 200,		'Test2 22');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.START, berek.Context.PARENT), 0,		'Test2 23');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.START, berek.Context.PARENT), 0,		'Test2 24');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.CENTER, berek.Context.PARENT), 50,	'Test2 25');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.CENTER, berek.Context.PARENT), 100,	'Test2 26');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.END, berek.Context.PARENT), 100,		'Test2 27');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.END, berek.Context.PARENT), 200,		'Test2 28');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.START, berek.Context.PAGE), 11,		'Test2 29');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.START, berek.Context.PAGE), 22,		'Test2 30');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.CENTER, berek.Context.PAGE), 61,		'Test2 31');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.CENTER, berek.Context.PAGE), 122,	'Test2 32');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.X, illa.Alignment.END, berek.Context.PAGE), 111,		'Test2 33');
			this.u.assertEquals(this.root1.getOffset(illa.Axis2D.Y, illa.Alignment.END, berek.Context.PAGE), 222,		'Test2 34');
			this.u.assertEquals(this.root1.getShowScrollbar(illa.Axis2D.X), false,										'Test2 35');
			this.u.assertEquals(this.root1.getShowScrollbar(illa.Axis2D.Y), false,										'Test2 36');
			this.u.assertEquals(this.root1.getZIndex(), 0,																'Test2 37');
			this.u.assertEquals(this.root1.getIsDestroyed(), false,														'Test2 38');
			this.u.assertEquals(this.root1.getIsRoot(), true,															'Test2 39');
			this.u.assertEquals(this.root1.getIsLayoutActive(), true,													'Test2 40');
			this.u.assertEquals(this.root1.getIsVisible(), true,														'Test2 41');
			this.u.assertEquals(this.root1.getScroll(illa.Axis2D.X), 0,													'Test2 42');
			this.u.assertEquals(this.root1.getScroll(illa.Axis2D.Y), 0,													'Test2 43');
			this.u.assertEquals(this.root1.getNeedsLayoutUpdate(), false,												'Test2 44');
			this.u.assertEquals(this.root1.getApplySizeToSelf(), true,													'Test2 45');
			this.u.assertEquals(this.root1.getIsSolvingLayout(), false,													'Test2 46');
			
			this.onTestsDone();
		}
		
		onTestsDone() {
			deflex.Box.ROOT_TICKER.setIsStarted(false);
			
			this.u.printStats();
			
			jQuery('body').empty().append(this.uOut);
		}
		
		static getInstance() { return this.instance }
	}
}