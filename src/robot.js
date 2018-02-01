'use strict';

import { facing, direction, vector, Point } from './consts.js';
import { type } from './common.js';

/*
* This is just a simple toy robot doing simple toy robot things.
*
* A robot keeps track of his own world.
* A robot is directly fed commands to it by the translator. A command includes PLACE, MOVE, LEFT, REPORT, RIGHT.
* A robot must be placed first.
* A robot cannot move off the world.
*/

class Robot {

	constructor() {
    // Is the robot placed
		this._placed = false;
    // Initialise position of the robot
		this._position = new Point(-1,-1);

		// No need for a 2D array. Two integers should be enough represent the world as there no obstructions
    // Hardcoded, dynamic table size is out of scope.
		this._bounds = new Point(0,5);
    //Initialise the facing
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

    // If the robot is placed within bounds, then place it, set position and set its facing.
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

  /**
  * REPORT the position of the toy via console
  * Cannot occur unless the robot has been placed.
  *
  * @return boolean
  */
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
    return true;
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
