'use strict';

import { facing, direction, vector, Point } from './consts.js';
import { type } from './common.js';

class Robot {

	constructor() {
		this._placed = false;
		this._position = new Point(0,0);

		// No need for a 2D array. Two integers should be enough represent the world as there no obstructions
		this._bounds = new Point(0,5);
		this._facing = facing.NONE;
	}

	/**
	* PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.
	* Place must be triggered first before any other actions can take place.
	* Multiple place commands can be issued.
	* @param {newPosition} new Position to set
	* @param {newFacing} new facing to set
	*
	* @return boolean
	*/
	place (newPosition, newFacing) {

		if ((!(newPosition instanceof Point)) && (!(newFacing instanceof Point))) {
			throw new Error("Point.withinBounds expects point")
		}

		if (newPosition.withinBounds(this.bounds)) {
			this.placed = true;
			this.position = newPosition;
			this.facing = newFacing;
		}
	}

	/**
	* TURN changes the facing of the robot, either LEFT OR RIGHT by 90 degrees without changing the position of the robot.
	* Cannot occur unless the robot has been placed.
	* @param {newSide} left or right
	*
	* @return boolean
	*/
	turn (newSide) {
		if (!this.placed) {
			return false;
		}
		// dir can only be 1 or -1
		type(newSide, ["number"]);

		if ((newSide != direction.LEFT) && (newSide != direction.RIGHT)) {
			throw Error("Robot.Turn must take direction.LEFT or direction.RIGHT direction");
		}
	
		this.facing = this.facing + newSide;
		
		// We want to wrap the facing of the robot
		if (this.facing <= 0) {
			this.facing = 4;
		} else if (this.facing > 4) {
			this.facing = 1;
		}
	}

	/**
	* MOVE the toy robot one unit forward in the direction it is currently facing.
	* Cannot occur unless the robot has been placed.
	* @param {newSide} left or right
	*
	* @return boolean
	*/
	move () {
		if (!this.placed) {
			return false;
		}

		// Move it by the vector.
		let x = this.position.x + vector[this.facing].x;
		let y = this.position.y + vector[this.facing].y;

		const newPosition = new Point(x,y);

		// Don't let it exceed the boundaries
		if (newPosition.withinBounds(this.bounds)) {
			this.position = newPosition;
			return true;

		} else {

			return false;

		}
	}

	report() {
		if (!this.placed) {
			return false;
		}

		let facingText = "";

		// Convert to text
		switch (this.facing) {
			case facing.NORTH:
				facingText = "NORTH";
				break;
			case facing.WEST:
				facingText = "WEST";
				break;
			case facing.EAST:
				facingText = "EAST";
				break;
			case facing.SOUTH:
				facingText = "SOUTH";
				break;
			default: facingText = "NONE";
		}

		console.log("I AM AT [" +	this.position.x + "," + this.position.y + "] facing " + facingText);
	}

	/* Various set / getters to keep in the spirit of ES6 Classes*/
	set facing(facing) {
	this._facing = facing;
	}

	get facing() {
		return this._facing;
	}

	set position(position) {
		this._position = position;
	}

	get position() {
		return this._position;
	}

	get bounds() {
		return this._bounds;
	}
	
	set bounds(bounds) {
		return this._bounds;
	}

	set placed(placed) {
		this._placed = placed;
	}
	
	get placed() {
		return this._placed;
	}

}

export default Robot;
