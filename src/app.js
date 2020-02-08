import express from 'express';
import autoSuggestRouter from './routes/api/getAutoSuggestUsers';
import usersRouter from './routes/api/users';
import groupsRouter from './routes/api/groups';
import addUsersToGroup from './routes/api/addUsersToGroup';
import config from './config';
import connectAndInitializeDB from './data-access';

const app = express();

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/getautosuggestusers', autoSuggestRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/adduserstogroup', addUsersToGroup);

app.listen(config.port, () => {
    console.log(`server is running on port ${config.port}`);
});

connectAndInitializeDB();
