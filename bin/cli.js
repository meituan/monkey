#! /usr/bin/env node

// Simple cli stub for monkey

var Mock = require('..');
var argv = process.argv;

if (argv.length < 4) {
    console.log('Usage: ./mock <mock-data-dir> <http-request>');
    process.exit(1);
}

var mock = new Mock(argv[2]);
console.log(JSON.stringify(mock.get(JSON.parse(argv[3]))));
