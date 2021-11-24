import { UserService } from './user.service';

import { Response, Request } from 'express';

export class UserController {
    private usersService: UserService;

    constructor() {
        this.usersService = new UserService();
    }

    public getUserById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const user = await this.usersService.getUserById(id);

            if (user === undefined) {
                res.status(404).json({ message: `User with id ${req.params.id} not found ` });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            res.json({ message : error });
        }
    };

    public getUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.usersService.getUsers();

            if (users === undefined) {
                res.status(404).json({ message: 'Users not found ' });
            } else {
                res.status(200).json(users);
            }
        }  catch (error) {
            res.json({ message : error });
        }
    };

    public create = async (req: Request, res: Response) => {
        try {
            const user = req.body;
            const newUser = await this.usersService.createUser(user);

            if (!newUser) {
                res.status(200).json({ message: `User with id ${user.id} already created` });
            } else {
                res.status(200).json(newUser);
            }
        } catch (error) {
            res.json({ message : error });
        }
    };

    public update = async (req: Request, res: Response) => {
        try {
            const user = req.body;
            const id =  req.params.id;
            const updateUser = await this.usersService.updateUserById(user, id);

            if (updateUser) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: `User with id ${id} not found ` });
            }
        } catch (error) {
            res.json({ message : error });
        }
    };

    public delete = async (req: Request, res: Response) => {
        try {
            const id =  req.params.id;
            const userDelete = await this.usersService.deleteUserById(id);

            if (userDelete) {
                res.status(200).json({ message: `User with id ${id} successfully remove` });
            } else {
                res.status(404).json({ message: `User with id ${id} not found` });
            }
        } catch (error) {
            res.json({ message : error });
        }
    };
}
