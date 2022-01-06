import { GroupService } from '../services/group.service';

import { Response, Request } from 'express';
import errorHandler from '../middleware/error-handler';

export class GroupController {
    private groupService: GroupService;

    constructor() {
        this.groupService = new GroupService();
    }

    public getGroupById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const group = await this.groupService.getGroupById(id);

            if (group === undefined) {
                res.status(404).json({ message: `User with id ${req.params.id} not found ` });
            } else {
                res.status(200).json(group);
            }
        } catch ({ message }) {
            errorHandler(req, message);
            res.json({ message });
        }
    };

    public getGroups = async (req: Request, res: Response) => {
        try {
            const groups = await this.groupService.getGroups();

            if (groups === undefined) {
                res.status(404).json({ message: 'Users not found ' });
            } else {
                res.status(200).json(groups);
            }
        }  catch ({ message }) {
            errorHandler(req, message);
            res.json({ message });
        }
    };

    public createGroup = async (req: Request, res: Response) => {
        try {
            const groups = req.body;
            const newGroup = await this.groupService.createGroup(groups);

            if (!newGroup) {
                res.status(200).json({ message: `User with id ${groups.id} already created` });
            } else {
                res.status(200).json(newGroup);
            }
        } catch ({ message }) {
            errorHandler(req, message);
            res.json({ message });
        }
    };

    public updateGroup = async (req: Request, res: Response) => {
        try {
            const group = req.body;
            const id =  req.params.id;
            const updateGroup = await this.groupService.updateGroupById(group, id);

            if (updateGroup) {
                res.status(200).json(updateGroup);
            } else {
                res.status(404).json({ message: `User with id ${id} not found ` });
            }
        } catch ({ message }) {
            errorHandler(req, message);
            res.json({ message });
        }
    };

    public addUsersToGroup = async (req: Request, res: Response) => {
        try {
            const users = req.body;
            const id =  req.params.id;
            const updateGroupUsers = await this.groupService.addUsersToGroup(id, users);

            if (updateGroupUsers) {
                res.status(200).json(updateGroupUsers);
            } else {
                res.status(404).json({ message: `User with id ${id} not found ` });
            }
        } catch ({ message }) {
            errorHandler(req, message);
            res.json({ message });
        }
    };

    public deleteGroup = async (req: Request, res: Response) => {
        try {
            const id =  req.params.id;
            const groupDelete = await this.groupService.deleteGroupById(id);

            if (groupDelete) {
                res.status(200).json({ message: `User with id ${id} successfully remove` });
            } else {
                res.status(404).json({ message: `User with id ${id} not found` });
            }
        } catch ({ message }) {
            errorHandler(req, message);
            res.json({ message });
        }
    };
}
