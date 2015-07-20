# Config Manager

Parsing and merging ENVs and user provided ENV paramenters.

## Installation

```
npm install config-manager --save
```

## Usage

You probably do this so often

```
$ myProgram DEBUG=1 FILE_PATH=path/to/somewhere
```

The config-manager can treat these input parameters as ENVs and merge with a provided default configuration.

### Example

```
var configManager = require('config-manager');

// Pass your default configuration as first argument
// you could read your defaultConfig from a file or an object

var config = configManager.config(defaultConfig);
```
## Development

### Running unit test

```
npm test
```
