import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable
} from 'typeorm';
import { UserEntity } from '../user/user.entity';


@Entity('groups', {
    orderBy: {
        name: 'ASC',
        id: 'DESC'
    }
})
export class GroupEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
        id!: string;

    @Column()
        name!: string;

    @Column('text', { array: true, nullable: true })
        permissions!: String[];

    @ManyToMany(() => UserEntity, (user: UserEntity) => user.group, {
        nullable: true, cascade: true
    })
    @JoinTable()
        user: UserEntity[] | undefined;

    @CreateDateColumn()
        createdat!: Date;

    @UpdateDateColumn()
        updatedat!: Date;
}
