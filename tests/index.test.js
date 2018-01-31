import index, { translator } from '../src/translator';
import { facing, Point } from '../src/consts';
import Robot from '../src/robot';
import Translator from '../src/translator';

let stdin = null;
let robot = null;
let trans = null;

// Allows end to end testing by hijacking Stdin and Stdout
console.log = jest.fn();

function reset () {
	// Set translator to read from a mock STDIN
	stdin = require('mock-stdin').stdin();
	robot = new Robot();
	trans = new Translator();
	trans.start(stdin, robot);
};

let output = '';
let write = '';

beforeEach(function() {
  console.log.mockClear();
  reset();
});

afterEach(function() {
  stdin.send(null);
});

test('Example Input and Output: Example 1', () => {
	
  	stdin.send("PLACE 0,0,NORTH");
  	stdin.send("MOVE");
  	stdin.send("REPORT");

    expect(console.log).lastCalledWith("I AM AT [0,1] facing NORTH");
});


test('Example Input and Output: Example 2', () => {

  	stdin.send("PLACE 0,0,NORTH");
  	stdin.send("LEFT");
  	stdin.send("REPORT");

    expect(console.log).lastCalledWith("I AM AT [0,0] facing WEST");
});

test('Example Input and Output: Example 3', () => {

  	stdin.send("PLACE 1,2,EAST");
  	stdin.send("MOVE");
  	stdin.send("MOVE");
  	stdin.send("LEFT");
  	stdin.send("MOVE");
  	stdin.send("REPORT");

    expect(console.log).lastCalledWith("I AM AT [3,3] facing NORTH");

});

// Hit the lower/upper limits of the X Coordinates
test('Bounds Test 1 (X coord)', () => {
  	stdin.send("PLACE 3,0,WEST");
  	stdin.send("MOVE");
  	stdin.send("MOVE");
  	stdin.send("MOVE");
    stdin.send("REPORT");
    expect(console.log).lastCalledWith("I AM AT [0,0] facing WEST");
    stdin.send("MOVE");
    stdin.send("REPORT");
    expect(console.log).lastCalledWith("I AM AT [0,0] facing WEST");
  	stdin.send("RIGHT");
  	stdin.send("RIGHT");
    stdin.send("REPORT");
    expect(console.log).lastCalledWith("I AM AT [0,0] facing EAST");
  	stdin.send("MOVE");
  	stdin.send("MOVE");
  	stdin.send("MOVE");
  	stdin.send("MOVE");
    stdin.send("REPORT");
    expect(console.log).lastCalledWith("I AM AT [4,0] facing EAST");
    // Make sure we're at the edge of the table
  	stdin.send("MOVE");
    stdin.send("REPORT");
    // Moving past the point should still result in 4
    expect(console.log).lastCalledWith("I AM AT [4,0] facing EAST");
    
});

// Hit the lower/upper limits of the Y Coordinates
test('Bounds Test 2 (Y coord)', () => {
  	stdin.send("PLACE 3,0,NORTH");
  	stdin.send("MOVE");
  	stdin.send("MOVE");
  	stdin.send("MOVE");
  	stdin.send("MOVE");
  	stdin.send("MOVE");
    stdin.send("REPORT");
    expect(console.log).lastCalledWith("I AM AT [3,4] facing NORTH");
  	stdin.send("RIGHT");
  	stdin.send("RIGHT");
    stdin.send("REPORT");
  	expect(console.log).lastCalledWith("I AM AT [3,4] facing SOUTH");
  	stdin.send("MOVE");
  	stdin.send("MOVE");
  	stdin.send("MOVE");
  	stdin.send("MOVE");
  	stdin.send("MOVE");
    stdin.send("REPORT");
  	expect(console.log).lastCalledWith("I AM AT [3,0] facing SOUTH");
});

// Robot non responsive unless placed
test('No placement = Unresponsive Robot', () => {
  	stdin.send("MOVE");
  	stdin.send("REPORT");
  	stdin.send("LEFT");
  	stdin.send("RIGHT");
    stdin.send("REPORT");
    expect(console.log.mock.calls.length).toBe(0);
});

// Multiple placements
test('Multiple placements', () => {
  	stdin.send("PLACE 3,0,NORTH");
  	stdin.send("REPORT");
    expect(console.log).lastCalledWith("I AM AT [3,0] facing NORTH");
  	stdin.send("PLACE 4,0,NORTH");
  	stdin.send("REPORT");
    expect(console.log).lastCalledWith("I AM AT [4,0] facing NORTH");
});

// Invalid inputs with no error thrown
test('Invalid Inputs', () => {
    stdin.send("eqewqewqeqw qwe wq ewq qw 4232");
    stdin.send("PLACE 2,21,EAST");
    stdin.send("PLACE -2,1,EAST");
    stdin.send("REPOewqewqRT");
    stdin.send("\t\t\t\t\"''';;;");
    expect(console.log.mock.calls.length).toBe(0);
});

