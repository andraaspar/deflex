/// <reference path='../../lib/illa/Log.ts'/>
/// <reference path='../../lib/berek/jquery/_module.ts'/>
/// <reference path='../../lib/berek/UnitTest.ts'/>
/// <reference path='../../src/deflex/Box.ts'/>

module test2 {
	import jquery = berek.jquery;
	
	export class Main {
		constructor() {
			jquery.$(illa.bind(this.onDOMLoaded, this));
		}

		onDOMLoaded() {
			var u = new berek.UnitTest(jquery.$('body'));
			u.info('Testing...');
			
			
			
			var box = new deflex.Box();
			box.setInset(10, illa.Axis2D.X, deflex.End.MIN);
			box.setInset(20, illa.Axis2D.X, deflex.End.MAX);
			box.setInset(30, illa.Axis2D.Y, deflex.End.MIN);
			box.setInset(40, illa.Axis2D.Y, deflex.End.MAX);
			u.assert(box.getInset(illa.Axis2D.X, deflex.End.MIN) === 10, 'getInset 1');
			u.assert(box.getInset(illa.Axis2D.X, deflex.End.MAX) === 20, 'getInset 2');
			u.assert(box.getInset(illa.Axis2D.Y, deflex.End.MIN) === 30, 'getInset 3');
			u.assert(box.getInset(illa.Axis2D.Y, deflex.End.MAX) === 40, 'getInset 4');
			u.assert(box.getInset(illa.Axis2D.X) === 30, 'getInset 5');
			u.assert(box.getInset(illa.Axis2D.Y) === 70, 'getInset 6');
			box.setInset(5);
			u.assert(box.getInset(illa.Axis2D.X, deflex.End.MIN) === 5, 'getInset 7');
			u.assert(box.getInset(illa.Axis2D.X, deflex.End.MAX) === 5, 'getInset 8');
			u.assert(box.getInset(illa.Axis2D.Y, deflex.End.MIN) === 5, 'getInset 9');
			u.assert(box.getInset(illa.Axis2D.Y, deflex.End.MAX) === 5, 'getInset 10');
			u.assert(box.getInset(illa.Axis2D.X) === 10, 'getInset 11');
			u.assert(box.getInset(illa.Axis2D.Y) === 10, 'getInset 12');
			box.setInset(25, illa.Axis2D.X);
			u.assert(box.getInset(illa.Axis2D.X, deflex.End.MIN) === 25, 'getInset 13');
			u.assert(box.getInset(illa.Axis2D.X, deflex.End.MAX) === 25, 'getInset 14');
			u.assert(box.getInset(illa.Axis2D.Y, deflex.End.MIN) === 5, 'getInset 15');
			u.assert(box.getInset(illa.Axis2D.Y, deflex.End.MAX) === 5, 'getInset 16');
			u.assert(box.getInset(illa.Axis2D.X) === 50, 'getInset 17');
			u.assert(box.getInset(illa.Axis2D.Y) === 10, 'getInset 18');
			box.setInset(15, illa.Axis2D.Y);
			u.assert(box.getInset(illa.Axis2D.X, deflex.End.MIN) === 25, 'getInset 19');
			u.assert(box.getInset(illa.Axis2D.X, deflex.End.MAX) === 25, 'getInset 20');
			u.assert(box.getInset(illa.Axis2D.Y, deflex.End.MIN) === 15, 'getInset 21');
			u.assert(box.getInset(illa.Axis2D.Y, deflex.End.MAX) === 15, 'getInset 22');
			u.assert(box.getInset(illa.Axis2D.X) === 50, 'getInset 23');
			u.assert(box.getInset(illa.Axis2D.Y) === 30, 'getInset 24');



			u.printStats();
		}
	}
}

var test2Main = new test2.Main();