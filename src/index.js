'use strict';

import Translator from './translator.js';
import Robot from './robot.js';

let stdin = process.openStdin();

let robot = new Robot();
let trans = new Translator();
trans.start(stdin, robot);
