import {createLogger, format, transports} from 'winston';

let prodLogger = createLogger({
    transports: [
        new transports.File({
            level:    'warn',
            filename: 'logs/warning.log'
        }),
        new transports.File({
            level:    'error',
            filename: 'logs/error.log'
        })
    ],
    format:        format.combine(
        format.timestamp(),
        format.colorize(),
        format.prettyPrint(),
    ),
});

export default prodLogger;