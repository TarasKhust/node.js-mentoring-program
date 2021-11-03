import { data } from '../app';
import Joi from 'joi';
import joiValidator from 'express-joi-validation';
import { Request, Response } from 'express/ts4.0';
export const validator = joiValidator.createValidator();

export const schema = Joi.object({
    id: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().required().min(4).max(130),
    isDeleted: Joi.boolean().required()
});


export const createUser = (req: Request, res: Response)  => {
    const users = req.body;
    const user = data.findIndex(obj => obj.id === users.id);

    if (user >= 0) {
        res.status(200).json({ message: `User with id ${users.id} already created` });
    } else {
        data.push(users);
        res.status(200).json({ message: 'User successfully created' });
    }
};

export const updateUser = (req: Request, res: Response) => {
    const users = req.body;
    const user = data.findIndex(obj => obj.id === users.id);

    if (user >= 0) {
        data[user].age = users.age;
        data[user].login = users.login;
        data[user].password = users.password;
        data[user].isDeleted = users.isDeleted;

        res.status(200).json({ message: `User with id ${users.id} successfully update` });
    } else {
        res.status(404).json({ message: `User with id ${users.id} not found ` });
    }
};

export const getUserById = (req: Request, res: Response) => {
    const user = data.find(({ id }) => id === req.params.id);

    if (user === undefined) {
        res.status(404).json({ message: `User with id ${req.params.id} not found ` });
    } else {
        res.json(user);
    }
};


export const removeUserById = (req: Request, res: Response) => {
    const users = req.body;
    const user = data.findIndex(obj => obj.id === users.id);

    if (user >= 0) {
        data[user].isDeleted = true;

        res.status(200).json({ message: `User with id ${users.id} successfully remove` });
    } else {
        res.status(404).json({ message: `User with id ${users.id} not found` });
    }
};
