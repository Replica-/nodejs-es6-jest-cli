import index, { translator } from '../src/translator';
import { facing, direction, Point } from '../src/consts';

let robot = null;

function reset () {
	
};

beforeEach(function() {
  reset();
});

afterEach(function() {

});

test('Verify Point', () => {
	let point = new Point(4,5);
  	expect(point.x).toEqual(4);
  	expect(point.y).toEqual(5);

  	expect(point.min).toEqual(4);
  	expect(point.max).toEqual(5);
});

test('Verify Input in Bounds Function', () => {
	expect(() => {
		let point = new Point(4,5);
    	point.withinBounds([10,10]);
  	}).toThrow();
});

test('Verify Point in Bounds Function', () => {
	let point = new Point(4,5);
	expect(point.withinBounds(new Point(0,10))).toEqual(true);

	point = new Point(10,5);
	expect(point.withinBounds(new Point(0,10))).toEqual(false);
});
