(Daniel Santoro http://www.torosolutions.com.au)

# Toy Robot Simulator

This repo contains a Toy Robot Simulator coded in Node.JS ES6 (Babel) + Jest + ESLint.

This solution is by no means perfectly unit tested and 100% type checked. Given the reasonable amount of time I allowed, this is a reasonable representation of my abilities when it comes to Javascript and CLI. I took this opportunity to learn Jest and as a result made some OOP design decisions that I probably would normally not have.

If I was able to spend more time on this project and it satisfied the scope,
 - I would have ensured that functions were properly test covered, 
 - A larger variety of tests would run
 - All inputs were type checked across all functions 
 - Included a "Table" class to expand on the table
 - Make the Robot class listen to emitted events from the Translator. 

Tests included are 
E2E 
Some unit testing

## Prerequisites
 - Node (8.9.x) & NPM (5.6.x)

## Installation
 1. npm install
 2. npm install -g jest
 3. npm start (to start)
 4. npm test (to test - this will automatically watch
 5. npm dist (create prod version & run)

## Directory structure

 - src (source files)
 - dist (dist files compiled after babel for prod)
 - test (test files)

## NPM Commands

 - npm start
 - npm test
 - npm dist

