import { logGeneratedServiceMessage } from '../utils/logger';
import measureTime from '../utils/measureTime';

class UserService {
    constructor(userModel, db) {
        this.userModel = userModel;
        this.db = db;
    }
    @measureTime
    getAllUsers() {
        return this.userModel.findAll()
            .then(users => users)
            .catch(err => {
                logGeneratedServiceMessage('UserService', 'getAllUsers', undefined, err.message);
                throw err;
            });
    }
    @measureTime
    getUserById(id, transaction) {
        return this.userModel.findByPk(id, { ...(transaction && { transaction }) })
            .then(user => user)
            .catch(err => {
                logGeneratedServiceMessage('UserService', 'getUserById', { id, transaction }, err.message);
                throw err;
            });
    }
    @measureTime
    async createUser(login, password, age, isDeleted) {
        let transaction;
        try {
            transaction = await this.db.transaction();
            const user =  await this.userModel.create({
                login,
                password,
                age,
                isDeleted
            }, { transaction });
            await transaction.commit();

            return user;
        } catch (err) {
            if (transaction) await transaction.rollback();
            logGeneratedServiceMessage('UserService', 'createUser', { login, password, age, isDeleted }, err.message);
        }
    }
    @measureTime
    async updateUser(login, password, age, id) {
        let transaction;

        try {
            transaction = await this.db.transaction();
            const userToUpdate = await this.getUserById(id, transaction);

            if (!userToUpdate) {
                return null;
            }

            const user = await this.userModel.update({ login, password, age }, {
                where: {
                    id
                },
                transaction,
                returning: true
            });
            await transaction.commit();

            return user;
        } catch (err) {
            if (transaction) await transaction.rollback();
            logGeneratedServiceMessage('UserService', 'updateUser', { login, password, age, id }, err.message);
        }
    }
    @measureTime
    async softDeleteUser(id) {
        let transaction;

        try {
            transaction = await this.db.transaction();
            const userToDelete = await this.getUserById(id, transaction);

            if (!userToDelete) {
                return null;
            }

            const user = await this.userModel.destroy({
                where: {
                    id
                },
                transaction,
                returning: true
            });
            await transaction.commit();

            return user;
        } catch (err) {
            if (transaction) await transaction.rollback();
            logGeneratedServiceMessage('UserService', 'softDeleteUser', { id }, err.message);
        }
        // return this.userModel.update({ isDeleted: true }, {
        //     where: {
        //         id
        //     },
        //     returning: true
        // })
        //     .then(user => user)
        //     .catch(err => console.log(err));
    }
}

export default UserService;
