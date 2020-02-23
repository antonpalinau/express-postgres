import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
    format: format.combine(
        format.colorize(),
        format.splat(),
        format.simple()
    ),
    transports: [
        new transports.Console()
    ]
});

const loggerMiddleware = serviceMethod => (req, res, next) => {
    let args;

    switch (serviceMethod) {
        case 'getAllUsers':
            args = undefined;
            break;
        case 'getUserById':
            args = {
                id: req.params.id
            };
            break;
        case 'createUser':
            args = {
                login: req.body.login,
                password: req.body.password,
                age: req.body.age,
                isDeleted: false
            };
            break;
        case 'updateUser':
            args = {
                login: req.body.login,
                password: req.body.password,
                age: req.body.age,
                id: req.params.id
            };
            break;
        case 'softDeleteUser':
            args = {
                id: req.params.id
            };
            break;
        case 'getAllGroups':
            args = undefined;
            break;
        case 'getGroupById':
            args = {
                id: req.params.id
            };
            break;
        case 'createGroup':
            args = {
                name: req.body.name,
                permissions: req.body.permissions
            };
            break;
        case 'updateGroup':
            args = {
                name: req.body.name,
                permissions: req.body.permissions,
                id: req.params.id
            };
            break;
        case 'hardDeleteGroup':
            args = {
                id: req.params.id
            };
            break;
        case 'getAutoSuggestUsers':
            args = {
                loginSubstr: req.query.loginSubstring,
                limit: req.query.limit
            };
            break;
        case 'addUsersToGroup':
            args = {
                groupId: req.body.groupId,
                userIds: req.body.userIds
            };
            break;
        default:
            args = undefined;
    }

    logger.log('info', `Service method is ${serviceMethod} with incoming arguments: ${JSON.stringify(args)}`);
    next();
};

export default loggerMiddleware;
