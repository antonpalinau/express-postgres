import express from 'express';
import autoSuggestRouter from './routes/api/getAutoSuggestUsers';
import usersRouter from './routes/api/users';
import groupsRouter from './routes/api/groups';
import config from './config';
import connectAndInitializeDB from './data-access';

const app = express();

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/getautosuggestusers', autoSuggestRouter);
app.use('/api/groups', groupsRouter);

app.listen(config.port, () => {
    console.log(`server is running on port ${config.port}`);
});

connectAndInitializeDB();
