import { GroupService } from './group.service';

import { Response, Request } from 'express';

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
        } catch (error) {
            res.json({ message : error });
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
        }  catch (error) {
            res.json({ message : error });
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
        } catch (error) {
            res.json({ message : error });
        }
    };

    public updateGroup = async (req: Request, res: Response) => {
        try {
            const group = req.body;
            const id =  req.params.id;
            const updateGroup = await this.groupService.updateGroupById(group, id);

            if (updateGroup) {
                res.status(200).json(group);
            } else {
                res.status(404).json({ message: `User with id ${id} not found ` });
            }
        } catch (error) {
            res.json({ message : error });
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
        } catch (error) {
            res.json({ message : error });
        }
    };
}
