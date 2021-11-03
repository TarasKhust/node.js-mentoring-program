import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { schema, validator } from '../validation/user.validation';


export class UserRouter {
    public router: Router;
    public userController: UserController;

    constructor() {
        this.userController = new UserController();
        this.router = Router();
        this.routes();
    }

    public routes() {
        this.router.get('/', this.userController.getUser);
        this.router.post('/', validator.body(schema), this.userController.create);
        this.router.put('/:id', validator.body(schema), this.userController.update);
        this.router.delete('/:id', validator.body(schema), this.userController.delete);
    }
}

