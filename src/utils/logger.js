import logger from '../routes/middlewares/logger';

export const logGeneratedServiceMessage = (serviceName, serviceMethod, serviceMethodArgs, errorMsg) =>
    logger.log('error', `${serviceName}, method is ${serviceMethod}, arguments are ${JSON.stringify(serviceMethodArgs)}, error message is ${errorMsg}`);
