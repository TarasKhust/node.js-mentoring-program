import { UserService } from '../services/user.service';

import { Response, Request } from 'express';

export class UserController {
    private usersService: UserService;

    constructor() {
        this.usersService = new UserService();
    }

    public getUserById = async (req: Request, res: Response) => {
        const id = req.params.id;
        const user = await this.usersService.getUserById(id);

        if (user === undefined) {
            res.status(404).json({ message: `User with id ${req.params.id} not found ` });
        } else {
            res.status(200).json(user);
        }
    };

    public getUsers = async (req: Request, res: Response) => {
        const users = await this.usersService.getUsers();

        if (users === undefined) {
            res.status(404).json({ message: 'Users not found ' });
        } else {
            res.status(200).json(users);
        }
    };

    public create = async (req: Request, res: Response) => {
        const user = req.body;
        const newUser = await this.usersService.createUser(user);

        if (!newUser) {
            res.status(200).json({ message: `User with id ${user.id} already created` });
        } else {
            res.status(200).json(newUser);
        }
    };

    public update = async (req: Request, res: Response) => {
        const user = req.body;
        const id =  req.params.id;
        const updateUser = await this.usersService.updateUserById(user, id);

        if (updateUser) {
            res.status(200).json({ message: `User with id ${id} successfully update` });
        } else {
            res.status(404).json({ message: `User with id ${id} not found ` });
        }
    };

    public delete = async (req: Request, res: Response) => {
        const id =  req.params.id;
        const userDelete = await this.usersService.deleteUserById(id);

        if (userDelete) {
            res.status(200).json({ message: `User with id ${id} successfully remove` });
        } else {
            res.status(404).json({ message: `User with id ${id} not found` });
        }
    };
}
