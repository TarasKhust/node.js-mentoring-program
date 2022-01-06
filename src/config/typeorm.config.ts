import { ConnectionOptions } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { GroupEntity } from '../models/group.entity';

const config: ConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'postgres',
    synchronize: true,
    entities: [UserEntity, GroupEntity]
};

export default config;
