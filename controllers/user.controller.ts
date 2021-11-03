import { UserService } from '../services/user.service';
import { User } from '../models';

import { Router, Response, Request } from 'express';
import { schema, validator } from '../validation/user.validation';

export class UserController {
    public router: Router;
    private usersService: UserService;

    constructor() {
        this.usersService = new UserService(); // Create a new instance of PostController
        this.router = Router();
        this.routes();
    }

    public getUser = async (req: Request, res: Response) => {
        const id = req.params.id;
        const user = await this.usersService.getUserById(id);

        if (user === undefined) {
            res.status(404).json({ message: `User with id ${req.params.id} not found ` });
        } else {
            res.json(user);
        }
    };

    public create = async (req: Request, res: Response) => {
        const user = req.body as User;
        const newUser = await this.usersService.createUser(user);

        if (!newUser) {
            res.status(200).json({ message: `User with id ${user.id} already created` });
        } else {
            res.status(200).json({ message: 'User successfully created' });
        }
    };

    public update = async (req: Request, res: Response) => {
        const user = req.body as User;
        const id =  req.params.id;
        const updateUser = await this.usersService.updateUserById(user, id);

        if (updateUser) {
            res.status(200).json({ message: `User with id ${id} successfully update` });
        } else {
            res.status(404).json({ message: `User with id ${id} not found ` });
        }
    };

    public delete = async (req: Request, res: Response) => {
        const user = req.body;
        const id =  req.params.id;
        const userDelete = await this.usersService.deleteUserById(id);

        if (userDelete) {
            res.status(200).json({ message: `User with id ${user.id} successfully remove` });
        } else {
            res.status(404).json({ message: `User with id ${user.id} not found` });
        }
    };

    public routes() {
        this.router.get('/', this.getUser);
        this.router.post('/', validator.body(schema), this.create);
        this.router.put('/:id', validator.body(schema), this.update);
        this.router.delete('/:id', validator.body(schema), this.delete);
    }
}
