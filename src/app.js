import express from 'express';
import autoSuggestRouter from './routes/api/getAutoSuggestUsers';
import usersRouter from './routes/api/users';
import db from './config/database';
import UserModel from './models/UserModel';
import dbInitialData from './config/databaseInitialData';

const app = express();

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/getautosuggestusers', autoSuggestRouter);

app.listen(5000, () => {
    console.log('server is running');
});

db
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');

        UserModel.sync({ force: true })
            .then(() => UserModel.bulkCreate(dbInitialData))
            .then(() => console.log('Database has been initialized successfully'))
            .catch(err => console.log(err));
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
