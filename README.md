[![NPM version](http://img.shields.io/npm/v/vapor-winston-logger.svg?style=flat)](https://www.npmjs.org/package/vapor-winston-logger)
[![Dependency Status](https://david-dm.org/scholtzm/vapor-winston-logger.svg)](https://david-dm.org/scholtzm/vapor-winston-logger)

# Vapor Winston Logger

[Vapor](https://github.com/scholtzm/vapor) plugin which provides Winston-based logger for all message events.

### Features

- Colorized console output.
- File output.
- Configurable: logging level, timestamp format, message prefix

### Installation

```sh
npm install vapor-winston-logger
```

### Usage

```js
var winstonLogger = require('vapor-winston-logger');

// Instantiate Vapor etc.

vapor.use(winstonLogger);
// or
vapor.use(winstonLogger, {
  consoleLevel: 'debug',
  fileLevel: 'debug',
  logDir: 'logs',
  dateFormat: 'YYYY-MM-DD HH:mm:ss',
  prefix: false
});
```

### Configuration

#### `consoleLevel` (optional)

Console log level. Default value: `debug`

Available values: `none`, `debug`, `info`, `warn` and `error`.

#### `fileLevel` (optional)

File log level. Default value: `none`

Available values: `none`, `debug`, `info`, `warn` and `error`.

#### `logDir` (optional)

Directory used by file logger if `fileLevel` isn't set to `none`. Default value: `logs`

#### `dateFormat` (optional)

Date format for timestamps. Default value: `YYYY-MM-DD HH:mm:ss`

Timestamps are internally implemented with [momentjs](http://momentjs.com/). Check out their docs for possible formatting options.

#### `prefix` (optional)

If enabled, all log messages are prefixed with bot's username. Default value: `false`

### License

MIT. See `LICENSE`.
