import joi from '@hapi/joi';

export const schema_post = joi.object({
    groupId: joi
        .string()
        .required(),

    userIds: joi.array().items(joi.number().required()).required()
});
