import GroupService from '../services/GroupService';
import {
    getAllGroups,
    getGroupById,
    createGroup,
    updateGroup,
    hardDeleteGroup
} from '../routes/controllers/groupsController';

jest.mock('../services/GroupService');

describe('group controller', () => {
    beforeEach(() => {
        GroupService.mockClear();
    });

    describe('getAllGroups', () => {
        test('should return array with all groups', async () => {
            const data = [
                {
                    'id': 'c767fe58-055c-4cbb-8d4a-d520fc0a81b6',
                    'name': 'students',
                    'permissions': [
                        'READ',
                        'WRITE',
                        'UPLOAD_FILES'
                    ]
                },
                {
                    'id': '349766ee-fb03-4255-aabb-2d1190855d39',
                    'name': 'teachers',
                    'permissions': [
                        'READ',
                        'WRITE',
                        'DELETE',
                        'SHARE',
                        'UPLOAD_FILES'
                    ]
                }
            ];
            const resSpy = {
                json: jest.fn()
            };

            GroupService.prototype.getAllGroups.mockReturnValueOnce(Promise.resolve(data));

            await getAllGroups(null, resSpy);

            expect(GroupService.prototype.getAllGroups).toHaveBeenCalled();
            expect(GroupService.prototype.getAllGroups.mock.calls.length).toBe(1);
            expect(resSpy.json).toHaveBeenCalledWith(data);

            GroupService.prototype.getAllGroups.mockClear();
        });
        test('should handle catch block', async () => {
            const error = new Error('get all groups error');
            const nextStub = jest.fn();
            GroupService.prototype.getAllGroups.mockReturnValueOnce(Promise.reject(error));

            await getAllGroups(null, null, nextStub);

            expect(GroupService.prototype.getAllGroups).toHaveBeenCalled();
            expect(GroupService.prototype.getAllGroups.mock.calls.length).toBe(1);
            expect(nextStub).toHaveBeenCalledWith(error);

            GroupService.prototype.getAllGroups.mockClear();
        });
    });
    describe('getGroupById', () => {
        test('should successfully return a group by id', async () => {
            const id = 'c767fe58-055c-4cbb-8d4a-d520fc0a81b6';
            const data = [
                {
                    'id': 'c767fe58-055c-4cbb-8d4a-d520fc0a81b6',
                    'name': 'students',
                    'permissions': [
                        'READ',
                        'WRITE',
                        'UPLOAD_FILES'
                    ]
                }
            ];
            const resSpy = {
                json: jest.fn()
            };

            GroupService.prototype.getGroupById.mockReturnValueOnce(Promise.resolve(data));

            await getGroupById({ params: { id } }, resSpy, null);

            expect(GroupService.prototype.getGroupById).toHaveBeenCalled();
            expect(GroupService.prototype.getGroupById).toHaveBeenCalledWith(id);
            expect(resSpy.json).toHaveBeenCalledWith(data);

            GroupService.prototype.getGroupById.mockClear();
        });
        test('should return a message Group not found', async () => {
            const id = 'b7dadad-055c-4cbb-8d4a-d520fc0a81b6';
            const resSpy = {
                json: jest.fn()
            };

            GroupService.prototype.getGroupById.mockReturnValueOnce(undefined);

            await getGroupById({ params: { id } }, resSpy, null);

            expect(GroupService.prototype.getGroupById).toHaveBeenCalled();
            expect(GroupService.prototype.getGroupById).toHaveBeenCalledWith(id);
            expect(resSpy.json).toHaveBeenCalledWith({ msg: 'Group not found' });

            GroupService.prototype.getGroupById.mockClear();
        });
        test('should handle catch block', async () => {
            const id = 'b7dadad-055c-4cbb-8d4a-d520fc0a81b6';
            const error = new Error('get group by id error');
            const nextStub = jest.fn();
            GroupService.prototype.getGroupById.mockReturnValueOnce(Promise.reject(error));

            await getGroupById({ params: { id } }, null, nextStub);

            expect(GroupService.prototype.getGroupById).toHaveBeenCalled();
            expect(GroupService.prototype.getGroupById).toHaveBeenCalledWith(id);
            expect(GroupService.prototype.getGroupById.mock.calls.length).toBe(1);
            expect(nextStub).toHaveBeenCalledWith(error);

            GroupService.prototype.getGroupById.mockClear();
        });
    });
    describe('createGroup', () => {
        test('should successfully return a success msg and a group created', async () => {
            const name = 'workrers';
            const permissions = ['READ', 'WRITE'];
            const data = [
                {
                    'id': 'c767fe58-055c-4cbb-8d4a-d520fc0a81b6',
                    'name': 'workrers',
                    'permissions': [
                        'READ',
                        'WRITE'
                    ]
                }
            ];
            const resSpy = {
                json: jest.fn()
            };

            GroupService.prototype.createGroup.mockReturnValueOnce(Promise.resolve(data));

            await createGroup({ body: { name, permissions } }, resSpy, null);

            expect(GroupService.prototype.createGroup).toHaveBeenCalled();
            expect(GroupService.prototype.createGroup).toHaveBeenCalledWith(name, permissions);
            expect(resSpy.json).toHaveBeenCalledWith({ msg: 'New group is created', group: data });

            GroupService.prototype.createGroup.mockClear();
        });
        test('should return a message Group with the same name already exists', async () => {
            const name = 'workrers';
            const permissions = ['READ', 'WRITE'];
            const resSpy = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            GroupService.prototype.createGroup.mockReturnValueOnce(undefined);

            await createGroup({ body: { name, permissions } }, resSpy, null);

            expect(GroupService.prototype.createGroup).toHaveBeenCalled();
            expect(GroupService.prototype.createGroup).toHaveBeenCalledWith(name, permissions);
            expect(resSpy.status).toHaveBeenCalledWith(400);
            expect(resSpy.json).toHaveBeenCalledWith({ msg: 'Group with the same name already exists' });

            GroupService.prototype.createGroup.mockClear();
        });
        test('should handle catch block', async () => {
            const name = 'workrers';
            const permissions = ['READ', 'WRITE'];
            const error = new Error('create group error');
            const resSpy = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            GroupService.prototype.createGroup.mockReturnValueOnce(Promise.reject(error));

            await createGroup({ body: { name, permissions } }, resSpy, null);

            expect(GroupService.prototype.createGroup).toHaveBeenCalled();
            expect(GroupService.prototype.createGroup).toHaveBeenCalledWith(name, permissions);
            expect(GroupService.prototype.createGroup.mock.calls.length).toBe(1);
            expect(resSpy.status).toHaveBeenCalledWith(400);
            expect(resSpy.json).toHaveBeenCalledWith({ msg: 'error', e: error });

            GroupService.prototype.createGroup.mockClear();
        });
    });
    describe('updateGroup', () => {
        test('should successfully return a success msg and a group updated', async () => {
            const name = 'workrers';
            const permissions = ['READ', 'WRITE'];
            const id = 1;
            const data = [
                {},
                {
                    'id': '1',
                    'name': 'workrers',
                    'permissions': [
                        'READ',
                        'WRITE'
                    ]
                }
            ];
            const resSpy = {
                json: jest.fn()
            };

            GroupService.prototype.updateGroup.mockReturnValueOnce(Promise.resolve(data));

            await updateGroup({ body: { name, permissions }, params: { id } }, resSpy, null);

            expect(GroupService.prototype.updateGroup).toHaveBeenCalled();
            expect(GroupService.prototype.updateGroup).toHaveBeenCalledWith(name, permissions, id);
            expect(resSpy.json).toHaveBeenCalledWith({ msg: `Group with the id of ${id} was updated`, group: data[1] });

            GroupService.prototype.updateGroup.mockClear();
        });
        test('should return a message No group with the id of ', async () => {
            const name = 'workrers';
            const permissions = ['READ', 'WRITE'];
            const id = 1;
            const resSpy = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            GroupService.prototype.updateGroup.mockReturnValueOnce(undefined);

            await updateGroup({ body: { name, permissions }, params: { id } }, resSpy, null);

            expect(GroupService.prototype.updateGroup).toHaveBeenCalled();
            expect(GroupService.prototype.updateGroup).toHaveBeenCalledWith(name, permissions, id);
            expect(resSpy.status).toHaveBeenCalledWith(400);
            expect(resSpy.json).toHaveBeenCalledWith({ msg: `No group with the id of ${id}` });

            GroupService.prototype.updateGroup.mockClear();
        });
        test('should handle catch block', async () => {
            const name = 'workrers';
            const permissions = ['READ', 'WRITE'];
            const id = 1;
            const error = new Error('update group error');
            const resSpy = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            GroupService.prototype.updateGroup.mockReturnValueOnce(Promise.reject(error));

            await updateGroup({ body: { name, permissions }, params: { id } }, resSpy, null);

            expect(GroupService.prototype.updateGroup).toHaveBeenCalled();
            expect(GroupService.prototype.updateGroup).toHaveBeenCalledWith(name, permissions, id);
            expect(GroupService.prototype.updateGroup.mock.calls.length).toBe(1);
            expect(resSpy.status).toHaveBeenCalledWith(400);
            expect(resSpy.json).toHaveBeenCalledWith({ msg: 'error', e: error });

            GroupService.prototype.updateGroup.mockClear();
        });
    });
    describe('hardDeleteGroup', () => {
        test('should successfully return a success msg and a group deleted', async () => {
            const id = 1;
            const data = [
                {},
                {
                    'id': '1',
                    'name': 'workrers',
                    'permissions': [
                        'READ',
                        'WRITE'
                    ]
                }
            ];
            const resSpy = {
                json: jest.fn()
            };

            GroupService.prototype.hardDeleteGroup.mockReturnValueOnce(Promise.resolve(data));

            await hardDeleteGroup({ params: { id } }, resSpy, null);

            expect(GroupService.prototype.hardDeleteGroup).toHaveBeenCalled();
            expect(GroupService.prototype.hardDeleteGroup).toHaveBeenCalledWith(id);
            expect(resSpy.json).toHaveBeenCalledWith({ msg: `Group with the id of ${id} was hard deleted`, group: data[1] });

            GroupService.prototype.hardDeleteGroup.mockClear();
        });
        test('should return a message No group with the id of ', async () => {
            const id = 1;
            const resSpy = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            GroupService.prototype.hardDeleteGroup.mockReturnValueOnce(undefined);

            await hardDeleteGroup({ params: { id } }, resSpy, null);

            expect(GroupService.prototype.hardDeleteGroup).toHaveBeenCalled();
            expect(GroupService.prototype.hardDeleteGroup).toHaveBeenCalledWith(id);
            expect(resSpy.status).toHaveBeenCalledWith(400);
            expect(resSpy.json).toHaveBeenCalledWith({ msg: `No group with the id of ${id}` });

            GroupService.prototype.hardDeleteGroup.mockClear();
        });
        test('should handle catch block', async () => {
            const id = 1;
            const error = new Error('delete group error');
            const resSpy = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            GroupService.prototype.hardDeleteGroup.mockReturnValueOnce(Promise.reject(error));

            await hardDeleteGroup({ params: { id } }, resSpy, null);

            expect(GroupService.prototype.hardDeleteGroup).toHaveBeenCalled();
            expect(GroupService.prototype.hardDeleteGroup).toHaveBeenCalledWith(id);
            expect(GroupService.prototype.hardDeleteGroup.mock.calls.length).toBe(1);
            expect(resSpy.status).toHaveBeenCalledWith(400);
            expect(resSpy.json).toHaveBeenCalledWith({ msg: 'error', e: error });

            GroupService.prototype.hardDeleteGroup.mockClear();
        });
    });
});
