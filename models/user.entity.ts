import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users', {
    orderBy: {
        login: 'ASC',
        id: 'DESC'
    }
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
      id!: string;

  @Column({ type: 'text', default: '' })
      login!: string;

  @Column({ type: 'text', default: '' })
      password!: string;

  @Column({ type: 'text', default: '' })
      age!: string;

  @Column({ type: 'text', default: false })
      isdeleted!: boolean;

  @CreateDateColumn()
      createdat!: Date;

  @UpdateDateColumn()
      updatedat!: Date;
}
