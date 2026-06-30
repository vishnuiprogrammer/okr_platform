import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ timestamp, level, message, stack }) => {
    const logContent = stack || message;
    return `${timestamp} : ${level} : ${logContent}`;
});

const loggerTransports = [
    new transports.Console({
        format: combine(
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            colorize({ all: true }),
            customFormat
        )
    })
];

// Only write to file in development
if (process.env.NODE_ENV === 'development') {
    loggerTransports.push(
        new transports.File({
            filename: 'logs/app.log',
            format: combine(
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                customFormat
            )
        })
    );
}

export const logger = createLogger({
    level: 'debug',
    transports: loggerTransports
});