import Joi from 'joi';
import joiValidator from 'express-joi-validation';
export const validator = joiValidator.createValidator();

export const validationUser = {
    id: Joi.string().uuid(),
    login: Joi.string().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().required().min(4).max(130),
    isdeleted: Joi.boolean().required()
};

export const validationGroup = {
    id: Joi.string().uuid(),
    name: Joi.string().required(),
    permission: Joi.array(),
    users: Joi.array()
};


export const schema = (exclude = '',
    validation?: {
    password?: Joi.StringSchema;
    id?: Joi.StringSchema;
    login?: Joi.StringSchema;
    isdeleted?: Joi.BooleanSchema;
    age?: Joi.NumberSchema,
    users?: Joi.ArraySchema,
    permission?: Joi.ArraySchema;
    name?: Joi.StringSchema; }) => {
    if (exclude) {
        // @ts-ignore
        delete validation[exclude];
    }

    return Joi.object(validation);
};
