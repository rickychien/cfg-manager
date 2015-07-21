# Cfg-manager

Parsing and merging ENVs and user provided ENV paramenters.

## Installation

```
npm install cfg-manager
```

## Usage

You probably do this so often

```
$ myProgram DEBUG=1 FILE_PATH=path/to/somewhere
```

The cfg-manager can treat user input parameters as ENVs and merge it with a given default configuration. Easily access config from modules by parsing pre-stored environment variable.

### Example

You can simply initialize config from an entry module and access it from sub-modules without re-initializing again.
Initialize and generate merged config which is also stored in environment varialbe with the name CONFIG_MANAGER_ENVS.

In entry.js, simply use:

```javascript
var subModule = require('sub-modules');
var cfgManager = require('cfg-manager');

// Pass your default configuration as first argument
// you could read your defaultConfig from a file or an object
var config = cfgManager.init(defaultConfig);
```

Simply access config with getConfig() once you already init() in your config from entry module.

In sub-modules.js:

```javascript
var cfgManager = require('cfg-manager');
var config = cfgManager.getConfig();
```

## Development

### Running unit test

```
npm test
```
