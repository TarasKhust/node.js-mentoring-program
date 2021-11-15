import Joi from 'joi';
import joiValidator from 'express-joi-validation';
export const validator = joiValidator.createValidator();

const validation = {
    id: Joi.string().uuid(),
    login: Joi.string().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().required().min(4).max(130),
    isdeleted: Joi.boolean().required()
};

export const schema = (exclude = '') => {
    if (exclude) {
        // @ts-ignore
        delete validation[exclude];
    }

    return Joi.object(validation);
};
