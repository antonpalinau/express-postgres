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
});
