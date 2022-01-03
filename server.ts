import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import { UserRouter } from './api/user.router';
import { GroupRouter } from './api/group.router';
import dbConfig from './config/typeorm.config';
import morganMiddleware from './middleware/morganMiddleware'
import morgan from 'morgan';
dotenv.config();

morgan.token('param', function(req, res, param) {
    // @ts-ignore
    return req?.params[param];
});

class Server {
    private userRouter: UserRouter | undefined;
    private groupRouter: GroupRouter | undefined;
    private app: express.Application;

    constructor() {
        this.app = express();
        this.configuration();
        this.routes();
    }


    public configuration() {
        this.app.set('port', process.env.PORT || 3001);
        this.app.use(express.json());
        this.app.use(morganMiddleware);
    }


    public async routes() {
        await createConnection(dbConfig);


        this.userRouter = new UserRouter();
        this.groupRouter = new GroupRouter();

        this.app.get('/', (req: Request, res: Response) => {
            res.send('Hello world!');
        });

        this.app.use('/api/users/', this.userRouter.router);
        this.app.use('/api/groups/', this.groupRouter.router);

        this.app.use((err, res) => {
            if (err !== null) {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }

    public start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server is listening ${this.app.get('port')} port.`);
        });
    }
}

const server = new Server();
server.start();
