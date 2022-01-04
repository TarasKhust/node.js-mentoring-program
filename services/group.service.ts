import { DeleteResult, getConnection } from 'typeorm';
import { GroupEntity } from '../models/group.entity';
import { GroupRepository } from '../repository/group.repository';
import { UserRepository } from '../repository/user.repository';
import { log } from 'util';

type Users = {
    users: String[]
}

export class GroupService {
    private groupRepository: GroupRepository;
    private userRepository: UserRepository;
    constructor() {
        this.groupRepository = getConnection('default').getCustomRepository(GroupRepository);
        this.userRepository = getConnection('default').getCustomRepository(UserRepository);
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


    async addUsersToGroup(groupId: string, userIds: Users): Promise<any> {
        const groupById = await this.groupRepository.findOneOrFail({
            where: {
                id: groupId
            },
            relations: ['users']
        });


        const usersByIds = await this.userRepository.findByIds(userIds.users);

        // @ts-ignore
        const checkIfUserNotExists = usersByIds?.filter(x => !groupById.users.some(y => x.id === y.id))[0];


        if (checkIfUserNotExists) {
            // @ts-ignore
            groupById.users.push(checkIfUserNotExists);
        }

        return await getConnection().transaction(async transactionalEntityManager => {
            return await transactionalEntityManager.save(groupById);
        }).then((response) => {
            return response;
        })
            .catch(({ message }) => {
                return message;
            });
    }


    async updateGroupById(group: GroupEntity, groupId: string): Promise<any> {

        const groupById = await this.groupRepository.findOneOrFail({
            where: {
                id: groupId
            },
            relations: ['users']
        });

        // @ts-ignore
        const usersByIds = await this.userRepository.findByIds(group.users);

        
        const updateGroupEntity = {
            GroupEntity: {
                id: groupById.id,
                name: group.name,
                permissions: group.permissions,
                users: usersByIds
            }
        };


        return await this.groupRepository.save(updateGroupEntity.GroupEntity);
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
