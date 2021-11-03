import Joi from 'joi';
import joiValidator from 'express-joi-validation';
export const validator = joiValidator.createValidator();

export const schema = Joi.object({
    id: Joi.string(),
    login: Joi.string().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().required().min(4).max(130),
    isDeleted: Joi.boolean().required()
});
