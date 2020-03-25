import UserService from '../services/UserService';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    softDeleteUser
} from '../routes/controllers/usersController';

jest.mock('../services/UserService');

describe('users controller', () => {
    beforeEach(() => {
        UserService.mockClear();
    });

    describe('getAllUsers', () => {
        test('should return array with all users', async () => {
            const data = [
                {
                    id: 5,
                    login: 'Ariana',
                    password: '12qwerty3456',
                    age: 24,
                    isDeleted: false
                },
                {
                    id: 4,
                    login: 'Angelina',
                    password: '12345qwerty',
                    age: 21,
                    isDeleted: true
                }
            ];
            const resSpy = {
                json: jest.fn()
            };

            UserService.prototype.getAllUsers.mockReturnValueOnce(Promise.resolve(data));

            await getAllUsers(null, resSpy);

            expect(UserService.prototype.getAllUsers).toHaveBeenCalled();
            expect(UserService.prototype.getAllUsers.mock.calls.length).toBe(1);
            expect(resSpy.json).toHaveBeenCalledWith(data);

            UserService.prototype.getAllUsers.mockClear();
        });
        test('should handle catch block', async () => {
            const error = new Error('get all users error');
            const nextStub = jest.fn();
            UserService.prototype.getAllUsers.mockReturnValueOnce(Promise.reject(error));

            await getAllUsers(null, null, nextStub);

            expect(UserService.prototype.getAllUsers).toHaveBeenCalled();
            expect(UserService.prototype.getAllUsers.mock.calls.length).toBe(1);
            expect(nextStub).toHaveBeenCalledWith(error);

            UserService.prototype.getAllUsers.mockClear();
        });
    });
    describe('getUserById', () => {
        test('should successfully return a user by id', async () => {
            const id = 1;
            const data = [
                {
                    id: 1,
                    login: 'Ariana',
                    password: '12qwerty3456',
                    age: 24,
                    isDeleted: false
                }
            ];
            const resSpy = {
                json: jest.fn()
            };

            UserService.prototype.getUserById.mockReturnValueOnce(Promise.resolve(data));

            await getUserById({ params: { id } }, resSpy, null);

            expect(UserService.prototype.getUserById).toHaveBeenCalled();
            expect(UserService.prototype.getUserById).toHaveBeenCalledWith(id);
            expect(resSpy.json).toHaveBeenCalledWith(data);

            UserService.prototype.getUserById.mockClear();
        });
        test('should return a message User not found', async () => {
            const id = 1;
            const resSpy = {
                json: jest.fn()
            };

            UserService.prototype.getUserById.mockReturnValueOnce(undefined);

            await getUserById({ params: { id } }, resSpy, null);

            expect(UserService.prototype.getUserById).toHaveBeenCalled();
            expect(UserService.prototype.getUserById).toHaveBeenCalledWith(id);
            expect(resSpy.json).toHaveBeenCalledWith({ msg: 'User not found' });

            UserService.prototype.getUserById.mockClear();
        });
        test('should handle catch block', async () => {
            const id = 1;
            const error = new Error('get user by id error');
            const nextStub = jest.fn();
            UserService.prototype.getUserById.mockReturnValueOnce(Promise.reject(error));

            await getUserById({ params: { id } }, null, nextStub);

            expect(UserService.prototype.getUserById).toHaveBeenCalled();
            expect(UserService.prototype.getUserById).toHaveBeenCalledWith(id);
            expect(UserService.prototype.getUserById.mock.calls.length).toBe(1);
            expect(nextStub).toHaveBeenCalledWith(error);

            UserService.prototype.getUserById.mockClear();
        });
    });
    describe('createUser', () => {
        test('should successfully return a success msg and a user created', async () => {
            const login = 'Kate';
            const password = '3e3e3e3';
            const age = 18;
            const data = [
                {
                    id: 1,
                    login: 'Kate',
                    password: '3e3e3e3',
                    age: 18,
                    isDeleted: false
                }
            ];
            const resSpy = {
                json: jest.fn()
            };

            UserService.prototype.createUser.mockReturnValueOnce(Promise.resolve(data));

            await createUser({ body: { login, password, age } }, resSpy, null);

            expect(UserService.prototype.createUser).toHaveBeenCalled();
            expect(UserService.prototype.createUser).toHaveBeenCalledWith(login, password, age, false);
            expect(resSpy.json).toHaveBeenCalledWith({ msg: 'New user is created', user: data });

            UserService.prototype.createUser.mockClear();
        });
        test('should return a message User with the same login already exists', async () => {
            const login = 'Kate';
            const password = '3e3e3e3';
            const age = 18;
            const resSpy = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            UserService.prototype.createUser.mockReturnValueOnce(undefined);

            await createUser({ body: { login, password, age } }, resSpy, null);

            expect(UserService.prototype.createUser).toHaveBeenCalled();
            expect(UserService.prototype.createUser).toHaveBeenCalledWith(login, password, age, false);
            expect(resSpy.status).toHaveBeenCalledWith(400);
            expect(resSpy.json).toHaveBeenCalledWith({ msg: 'User with the same login already exists' });

            UserService.prototype.createUser.mockClear();
        });
        test('should handle catch block', async () => {
            const login = 'Kate';
            const password = '3e3e3e3';
            const age = 18;
            const error = new Error('create user by id error');
            const nextStub = jest.fn();

            UserService.prototype.createUser.mockReturnValueOnce(Promise.reject(error));

            await createUser({ body: { login, password, age } }, null, nextStub);

            expect(UserService.prototype.createUser).toHaveBeenCalled();
            expect(UserService.prototype.createUser).toHaveBeenCalledWith(login, password, age, false);
            expect(UserService.prototype.createUser.mock.calls.length).toBe(1);
            expect(nextStub).toHaveBeenCalledWith(error);

            UserService.prototype.createUser.mockClear();
        });
    });
    describe('updateUser', () => {
        test('should successfully return a success msg and a user updated', async () => {
            const login = 'Kate';
            const password = '3e3e3e3';
            const age = 18;
            const id = 1;
            const data = [
                {},
                {
                    id: 1,
                    login: 'Kate',
                    password: '3e3e3e3',
                    age: 18,
                    isDeleted: false
                }
            ];
            const resSpy = {
                json: jest.fn()
            };

            UserService.prototype.updateUser.mockReturnValueOnce(Promise.resolve(data));

            await updateUser({ body: { login, password, age }, params: { id } }, resSpy, null);

            expect(UserService.prototype.updateUser).toHaveBeenCalled();
            expect(UserService.prototype.updateUser).toHaveBeenCalledWith(login, password, age, id);
            expect(resSpy.json).toHaveBeenCalledWith({ msg: `User with the id of ${id} was updated`, user: data[1] });

            UserService.prototype.updateUser.mockClear();
        });
        test('should return a message No user with the id of ', async () => {
            const login = 'Kate';
            const password = '3e3e3e3';
            const age = 18;
            const id = 1;
            const resSpy = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            UserService.prototype.updateUser.mockReturnValueOnce(undefined);

            await updateUser({ body: { login, password, age }, params: { id } }, resSpy, null);

            expect(UserService.prototype.updateUser).toHaveBeenCalled();
            expect(UserService.prototype.updateUser).toHaveBeenCalledWith(login, password, age, id);
            expect(resSpy.status).toHaveBeenCalledWith(400);
            expect(resSpy.json).toHaveBeenCalledWith({ msg: `No user with the id of ${id}` });

            UserService.prototype.updateUser.mockClear();
        });
        test('should handle catch block', async () => {
            const login = 'Kate';
            const password = '3e3e3e3';
            const age = 18;
            const id = 1;
            const error = new Error('update user error');
            const nextStub = jest.fn();

            UserService.prototype.updateUser.mockReturnValueOnce(Promise.reject(error));

            await updateUser({ body: { login, password, age  }, params: { id } }, null, nextStub);

            expect(UserService.prototype.updateUser).toHaveBeenCalled();
            expect(UserService.prototype.updateUser).toHaveBeenCalledWith(login, password, age, id);
            expect(UserService.prototype.updateUser.mock.calls.length).toBe(1);
            expect(nextStub).toHaveBeenCalledWith(error);

            UserService.prototype.updateUser.mockClear();
        });
    });
    describe('softDeleteUser', () => {
        test('should successfully return a success msg and a user deleted', async () => {
            const id = 1;
            const data = [
                {},
                {
                    id: 1,
                    login: 'Kate',
                    password: '3e3e3e3',
                    age: 18,
                    isDeleted: false
                }
            ];
            const resSpy = {
                json: jest.fn()
            };

            UserService.prototype.softDeleteUser.mockReturnValueOnce(Promise.resolve(data));

            await softDeleteUser({ params: { id } }, resSpy, null);

            expect(UserService.prototype.softDeleteUser).toHaveBeenCalled();
            expect(UserService.prototype.softDeleteUser).toHaveBeenCalledWith(id);
            expect(resSpy.json).toHaveBeenCalledWith({ msg: `User with the id of ${id} was softly deleted`, user: data[1] });

            UserService.prototype.softDeleteUser.mockClear();
        });
        test('should return a message No user with the id of ', async () => {
            const id = 1;
            const resSpy = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            UserService.prototype.softDeleteUser.mockReturnValueOnce(undefined);

            await softDeleteUser({ params: { id } }, resSpy, null);

            expect(UserService.prototype.softDeleteUser).toHaveBeenCalled();
            expect(UserService.prototype.softDeleteUser).toHaveBeenCalledWith(id);
            expect(resSpy.status).toHaveBeenCalledWith(400);
            expect(resSpy.json).toHaveBeenCalledWith({ msg: `No user with the id of ${id}` });

            UserService.prototype.softDeleteUser.mockClear();
        });
        test('should handle catch block', async () => {
            const id = 1;
            const error = new Error('delete user error');
            const nextStub = jest.fn();

            UserService.prototype.softDeleteUser.mockReturnValueOnce(Promise.reject(error));

            await softDeleteUser({ params: { id } }, null, nextStub);

            expect(UserService.prototype.softDeleteUser).toHaveBeenCalled();
            expect(UserService.prototype.softDeleteUser).toHaveBeenCalledWith(id);
            expect(UserService.prototype.softDeleteUser.mock.calls.length).toBe(1);
            expect(nextStub).toHaveBeenCalledWith(error);

            UserService.prototype.softDeleteUser.mockClear();
        });
    });
});
