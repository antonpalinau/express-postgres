import uuid from 'uuid';

const users = [
    {
        age: 25,
        isDeleted: false,
        login: 'Sergey',
        password: '123456'
    },
    {   age: 21,
        isDeleted: true,
        login: 'Lesha',
        password: '5672134dad'
    },
    {
        age: 23,
        isDeleted: false,
        login: 'Ksenia',
        password: 'qweerty'
    },
    {
        age: 28,
        isDeleted: false,
        login: 'Daria',
        password: 'poiuy878'
    },
    {
        age: 24,
        isDeleted: false,
        login: 'Ariana',
        password: '12qwerty3456'
    }
];

export const groups = [
    {
        id: uuid.v4(),
        name: 'students',
        permissions: ['READ', 'WRITE', 'UPLOAD_FILES']
    },
    {
        id: uuid.v4(),
        name: 'teachers',
        permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
    },
    {
        id: uuid.v4(),
        name: 'parents',
        permissions: ['READ', 'WRITE']
    }
];

export default users;
