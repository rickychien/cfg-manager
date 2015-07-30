# Cfg-manager

Parsing and merging ENVs and user provided ENV paramenters.

## Installation

```
npm install cfg-manager
```

## Usage

You probably do this so often

```
$ execMyProgram DEBUG=1 FILE_PATH=path/to/somewhere
```

The cfg-manager can treat user input parameters as ENVs and merge it with a given default configuration. Easily access config from modules by parsing pre-stored environment variable.

### Example



### APIs



## Development

### Build

This project built with ES6, so you should transpile it to ES5 through babel after modifying any codebase.

```
$ npm install // Trigger babel transpiler to convert source from ES6 to ES5.
```

### Running test

We use [mocha](http://mochajs.org/) for testing and it is able to transpile ES6 to ES5 automatically.

```
$ npm test
```
