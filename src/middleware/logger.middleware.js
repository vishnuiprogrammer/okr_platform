import { createLogger, format, transports } from 'winston'; // Imported required things to implement logging using winston.
const { combine, timestamp, printf, colorize } = format;

// Creating custom format timestamp: LEVEL : description format to print logs
const customFormat = printf(({ timestamp, level, message, stack }) => {
    const logContent = stack || message;
    return `${timestamp}:${level}:${logContent}`;
});

export const logger = createLogger({
    // Log levels: TRACE DEBUG INFO WARN ERROR FATAL
    level: 'debug',
    // Stores logs in file 
    transports: [
        new transports.File({
            filename: 'logs/app.log',
            format: combine(
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                customFormat
            )
        }),
        // Print logs on console
        new transports.Console({
            format: combine(
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                colorize({ all: true }), // Apply Color
                customFormat
            )
        })
    ]
});
