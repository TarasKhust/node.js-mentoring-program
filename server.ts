import express, { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import { UserController } from './controllers/user.controller';
import dbConfig from './config/typeorm.config';


class Server {
    private userController: UserController | undefined;
    private app: express.Application;

    constructor() {
        this.app = express(); // init the application
        this.configuration();
        this.routes();
    }


    public configuration() {
        this.app.set('port', process.env.PORT || 3001);
        this.app.use(express.json());
    }


    public async routes() {
        await createConnection(dbConfig);


        this.userController = new UserController();

        this.app.get('/', (req: Request, res: Response) => {
            res.send('Hello world!');
        });

        this.app.use('/api/user/', this.userController.router);
        this.app.use((err, res) => {
            if (err !== null) {
                res.status(404).json({ message: 'Request is wrong ' });
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
