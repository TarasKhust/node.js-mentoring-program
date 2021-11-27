import { DeleteResult, getConnection, UpdateResult } from 'typeorm';
import { GroupEntity } from '../models/group.entity';
import { GroupRepository } from '../repository/group.repository';

export class GroupService {
    private groupRepository: GroupRepository;
    constructor() {
        this.groupRepository = getConnection('default').getCustomRepository(GroupRepository);
    }


    async createGroup(group: GroupEntity): Promise<GroupEntity | boolean> {
        const createGroup = await this.groupRepository.create(group);

        return await this.groupRepository.save(createGroup);
    }


    async getGroupById(groupId: string) {
        return await this.groupRepository.findOne({
            where: {
                id: groupId
            },
            relations: ['users']
        });
    }

    async updateGroupById(group: GroupEntity, id: string): Promise<UpdateResult> {
        return await this.groupRepository.update(id, {
            ...group
        });
    }

    async deleteGroupById(id: string): Promise<DeleteResult> {
        return await this.groupRepository.delete(id);
    }

    async getGroups(): Promise<GroupEntity[]> {
        return await this.groupRepository.find({
            relations: ['users']
        });
    }
}
