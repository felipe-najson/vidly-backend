const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
  winston.exceptions.handle(
    // This will handle all uncaught exceptions
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
  );

  // We need to use process.on for unhandledRejection because winston not handle this type of exeption
  process.on('unhandledRejection', (ex) => {
    // You should terminate the node process because your
    // node process could be in an unclean state.

    throw ex; // This throw is a workaround so winston will log the exception.
  });

  winston.add(new winston.transports.File({ filename: 'logfile.log' }));
  // winston.add(winston.transports.MongoDB, {
  //   db: 'mongodb://localhost/vidly',
  //   level: 'info', --> Only error, warn and info will be logged
  // });
};
