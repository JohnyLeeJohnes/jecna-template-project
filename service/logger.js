import devLogger  from './devLogger.js';
import prodLogger from './prodLogger.js';

let logger;
if (process.env.NODE_ENV === 'development') {
    logger = devLogger;
} else {
    logger = prodLogger;
}

export default logger;