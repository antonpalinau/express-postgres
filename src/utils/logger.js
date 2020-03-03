import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    format: format.combine(
        format.colorize(),
        format.splat(),
        format.simple()
    ),
    transports: [
        new transports.Console()
    ]
});

export const logGeneratedServiceMessage = (serviceName, serviceMethod, serviceMethodArgs, errorMsg) =>
    logger.log('error', `${serviceName}, method is ${serviceMethod}, arguments are ${JSON.stringify(serviceMethodArgs)}, error message is ${errorMsg}`);
