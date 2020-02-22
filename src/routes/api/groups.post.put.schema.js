import joi from '@hapi/joi';

export const schema_post = joi.object({
    name: joi.string()
        .alphanum()
        .required(),

    permissions: joi.array().items(joi.valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES').required()).required()
});

export const schema_put = joi.object({
    name: joi.string()
        .alphanum(),

    permissions: joi.array().items(joi.valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES').required())
});
