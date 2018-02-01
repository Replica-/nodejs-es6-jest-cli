'use strict';

import { direction, facing, Point } from './consts.js';

/*
* The translator class handles input from a stdin equivalent stream and feeds the commands to it's designated robot
*/
export default class translator {

	constructor() {
		// Is the translator running
		this._active = false;
		// Robot to give commands to
		this._robot = null;
	}

	/**
	* Receieves line from stream buffer event "data". Returns true or false depending on if the command was reocognised or not.
	* @param {streamInput} Input from stdin
	*
	* @return boolean
 	*/
	receiveInput (streamInput) {
		// Check inputs
		if (!(streamInput instanceof Buffer)) {
			throw Error('Robot.receieveInput expects Buffer from a stream');
		}

		const input = streamInput.toString();

		// Santise, extract inputs using Regular expression.
		var regXp = /^(((PLACE) ([0-9]),([0-9]),(NORTH|WEST|SOUTH|EAST))|MOVE|LEFT|RIGHT|REPORT)[\r\n]*$/i;
		var found = input.match(regXp);

		/* Regular expression return */
		/*
		['PLACE 3,3,NORTH',
		'PLACE 3,3,NORTH',
		'PLACE 3,3,NORTH',
		'PLACE',
		'3',
		'3',
		'NORTH',
		index: 0,
		input: 'PLACE 3,3,NORTH' ]
		*/

		if (found == null) {
			return false;
		}

		let command = found[1];

		if (command == 'MOVE') {
			// These should be emitted events that are listened to by the robot but may be out of scope of the test.
			this.robot.move();
		} else if (command == 'RIGHT') {
			this.robot.turn(direction.RIGHT);
		} else if (command == 'LEFT') {
			this.robot.turn(direction.LEFT);
		} else if (command == 'REPORT') {
			this.robot.report();
		} else {
			command = found[3];

			if (command == 'PLACE') {

				const facingDir = facing[found[6]];
				this.robot.place(new Point(Number(found[4]), Number(found[5])), facingDir);

			} else {
				return false;
			}
		}
		return true;
	}

	/**
	* Starts translating stream input into commands the robot can understand.
	* @param {stream} Input stream to read commands from
	* @param {robot} Robot to translate to
 	*/
	start (stream, robot) {

		// If stream or robot is null throw an error
		if ((!stream) || (!robot)) {
			throw Error('Input missing');
		}

		if (this._active) {
			throw Error('Tried to Start. Translator already active');
		}

		this.stream = stream;
		this.robot = robot;

		// Mark this as running so we don't allow subsequent calls to this function
		this._active = true;
		this.stream.addListener('data', (buffer) => { this.receiveInput(buffer) });
	}

	/**
	* Stop reading the stream.
	*/
	stop () {
		if (!this._active) {
			throw Error('Tried to Stop. Translator is not active.');
		}

		this._active = false;

		this.stream.removeListener('data', this.receiveInput);
	}

	/* Various set / getters to keep in the spirit of ES6 Classes*/
	set robot (robot) {
		this._robot = robot;
	}

	get robot () {
		return this._robot;
	}

	set stream (stream) {
		this._stream = stream;
	}

	get stream () {
		return this._stream;
	}
}
