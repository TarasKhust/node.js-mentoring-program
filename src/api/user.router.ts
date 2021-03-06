import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { schema, validator, validationUser } from '../validation/user.validation';


export class UserRouter {
    public router: Router;
    public userController: UserController;

    constructor() {
        this.userController = new UserController();
        this.router = Router();
        this.routes();
    }

    public routes() {
        this.router.get('/', this.userController.getUsers);
        this.router.post('/', validator.body(schema('id', validationUser)), this.userController.create);
        this.router.get('/:id', this.userController.getUserById);
        this.router.put('/:id', validator.body(schema('', validationUser)), this.userController.update);
        this.router.delete('/:id', this.userController.delete);
    }
}
