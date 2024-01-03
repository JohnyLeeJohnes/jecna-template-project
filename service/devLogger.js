import {createLogger, format, transports} from 'winston';

let devLogger = createLogger({
    transports: [
        new transports.Console()
    ],
    // format:     format.printf((info) => {
    //     return `[${info.level.toUpperCase().padEnd(7)}] - ${info.message}`
    // }),
    format:        format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint(),
    ),
});

export default devLogger;