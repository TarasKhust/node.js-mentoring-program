import { Router } from 'express';
import { GroupController } from '../controllers/group.controller';
import { schema, validationGroup, validator } from '../validation/user.validation';


export class GroupRouter {
    public router: Router;
    public groupController: GroupController;

    constructor() {
        this.groupController = new GroupController();
        this.router = Router();
        this.routes();
    }

    public routes() {
        this.router.get('/', this.groupController.getGroups);
        this.router.post('/', validator.body(schema('id', validationGroup)), this.groupController.createGroup);
        this.router.get('/:id', this.groupController.getGroupById);
        this.router.put('/:id', validator.body(schema('', validationGroup)), this.groupController.updateGroup);
        this.router.post('/:id',  this.groupController.addUsersToGroup);
        this.router.delete('/:id', this.groupController.deleteGroup);
    }
}
