import { DeleteResult, getConnection, Repository } from 'typeorm';
import { GroupEntity } from '../models/group.entity';
import { GroupRepository } from '../repository/group.repository';
import { UserRepository } from '../repository/user.repository';

export class GroupService {
    private groupRepository: GroupRepository;
    private userRepository: UserRepository;
    private readonly groupAndUsersRepository: Repository<any>;
    constructor() {
        this.groupRepository = getConnection('default').getCustomRepository(GroupRepository);
        this.userRepository = getConnection('default').getCustomRepository(UserRepository);
        this.groupAndUsersRepository = getConnection('default').getRepository('groups_users_users');
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


    async addUsersToGroup(groupId: string, userIds: String[]): Promise<any> {
        // @ts-ignore
        const groupById = await this.groupRepository.findOneOrFail({
            where: {
                id: groupId
            },
            relations: ['users']
        });


        // @ts-ignore
        const usersByIds = await this.userRepository.findByIds(userIds.users);


        // @ts-ignore
        const checkIfUserExist = usersByIds?.filter(x => !groupById.users.some(y => x.id === y.id));


        // @ts-ignore
        if (checkIfUserExist) {
            // @ts-ignore
            // const createGroupUsers = await this.groupAndUsersRepository.create({ groupsId: groupId, usersId: checkIfUserExist.id });
            const seUsers = (usersUpdate) => await getConnection()
                .createQueryBuilder()
                .update('groups_users_user').useTransaction(true)
                .set(usersUpdate)
                .where('id = :id', { id: groupId })
                .execute();

            return checkIfUserExist.forEach((value) => seUsers({ groupsId: groupId, usersId: value }));
        }
    }


    async updateGroupById(group: GroupEntity, groupId: string): Promise<any> {
        if (!group?.users) {
            return await this.groupRepository.update({
                id: groupId
            }, {
                ...group
            });
        }


        const groupById = await this.groupRepository.findOneOrFail({
            where: {
                id: groupId
            },
            relations: ['users']
        });


        // @ts-ignore
        const usersByIds = await this.userRepository.findByIds(group.users);

        // @ts-ignore
        const checkIfUserExist = usersByIds?.filter(x => !groupById.users.some(y => x.id === y.id))[0];

        if (checkIfUserExist) {
            // @ts-ignore
            return;
        }
        // @ts-ignore
        groupById.users.push(usersByIds);

        return await this.groupRepository.save({ ...group, ...groupById });
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
