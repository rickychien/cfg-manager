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

The cfg-manager can treat user input parameters as ENVs and merge it with a given default configuration.

### Example

Initialize and generate merged config which is also stored in environment varialbe with the name CONFIG_MANAGER_ENVS.

```javascript
var cfgManager = require('cfg-manager');

// Pass your default configuration as first argument
// you could read your defaultConfig from a file or an object
var config = cfgManager.init(defaultConfig);
```

Get config once you already init / store your config as an environment variable

```javascript
var cfgManager = require('cfg-manager');
var config = cfgManager.getConfig();
```

## Development

### Running unit test

```
npm test
```
