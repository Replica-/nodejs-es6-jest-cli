import index, { translator } from '../src/translator';
import { facing, direction, Point } from '../src/consts';
import Robot from '../src/robot';

let robot = null;

function reset () {
	robot = new Robot();
};

let output = '';
let write = '';

beforeEach(function() {
  reset();
});

afterEach(function() {

});

test('Robot Placed', () => {
	robot.place(new Point(3,0), facing.NORTH);
  	expect(robot.position).toEqual(new Point(3,0));
});

test('Robot Can Turn LEFT 360 degrees', () => {
	robot.place(new Point(3,0), facing.NORTH);
	robot.turn(direction.LEFT);
	expect(robot.facing).toEqual(facing.WEST);
	robot.turn(direction.LEFT);
	expect(robot.facing).toEqual(facing.SOUTH);
	robot.turn(direction.LEFT);
	expect(robot.facing).toEqual(facing.EAST);
	robot.turn(direction.LEFT);
	expect(robot.facing).toEqual(facing.NORTH);
});


test('Robot Can Turn RIGHT 360 degrees', () => {
	robot.place(new Point(3,0), facing.NORTH);
	robot.turn(direction.RIGHT);
	expect(robot.facing).toEqual(facing.EAST);
	robot.turn(direction.RIGHT);
	expect(robot.facing).toEqual(facing.SOUTH);
	robot.turn(direction.RIGHT);
	expect(robot.facing).toEqual(facing.WEST);
	robot.turn(direction.RIGHT);
	expect(robot.facing).toEqual(facing.NORTH);
});
