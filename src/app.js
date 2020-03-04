import express from 'express';
import autoSuggestRouter from './routes/api/getAutoSuggestUsers';
import usersRouter from './routes/api/users';
import groupsRouter from './routes/api/groups';
import addUsersToGroup from './routes/api/addUsersToGroup';
import login from './routes/api/login';
import config from './config';
import connectAndInitializeDB from './data-access';
import db from './data-access/database';
import { logger } from './routes/middlewares/logger';

const app = express();

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/getautosuggestusers', autoSuggestRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/adduserstogroup', addUsersToGroup);
app.use('/api/login', login);
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    logger.log('error', `error status is ${error.status}, error message is ${error.message}`);
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(config.port, () => {
    console.log(`server is running on port ${config.port}`);
});

connectAndInitializeDB();

process
    .on('unhandledRejection', (reason, promise) => {
        logger.log('error', `unhandledRejection reason is ${reason} and promise is ${promise}`);
    })
    .on('uncaughtException', err => {
        logger.log('error', `uncaughtException err is ${err}`);
        db.close();
        process.exit(1);
    });
