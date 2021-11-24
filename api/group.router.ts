import { Router } from 'express';
import { GroupController } from '../group/group.controller';
import { schema, validationGroup, validationUser, validator } from '../validation/user.validation';


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
        this.router.post('/', validator.body(schema('id', validationUser)), this.groupController.createGroup);
        this.router.get('/:id', this.groupController.getGroupById);
        this.router.put('/:id', validator.body(schema('', validationGroup)), this.groupController.updateGroup);
        this.router.delete('/:id', this.groupController.deleteGroup);
    }
}
