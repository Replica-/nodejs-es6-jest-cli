'use strict';

// Basic point class
export class Point {
	constructor(x,y) {
		this._x = x;
		this._y = y;
	}

	/**
	* Check if the point within bounds
	* @param {bounds} Bounds to be checked
 	*/
	withinBounds(bounds) {
		
		// Check inputs
		if (!(bounds instanceof Point)) {
			throw new Error("Point.withinBounds expects point")
		}

		if ((this.x >= bounds.min) && (this.x < bounds.max) && (this.y >= bounds.min) && (this.y < bounds.max)) {
			return true;
		} else {
			return false;
		}
	}

	// Various setter and getters
	set x (x) {
		this._x = x;
	}

	set y (y) {
		this._y = y;
	}

	get max () {
		return this._y;
	}

	get min () {
		return this._x;
	}

	get x () {
		return this._x;
	}

	get y () {
		return this._y;
	}
}

// Facing
export const facing = { NONE: 0, NORTH: 1, EAST: 2, SOUTH: 3, WEST: 4 };
// Since we don't need vector math, just 4 hardcoded vectors will do.
export const vector = { 0: new Point(0,0), 1: new Point(0, 1), 2: new Point(1,0), 3: new Point(0,-1), 4: new Point(-1,0) };
// Direction
export const direction = { LEFT: -1, RIGHT: 1 };
