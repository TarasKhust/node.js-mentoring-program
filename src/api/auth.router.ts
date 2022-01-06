import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';


export class AuthRouter {
    public router: Router;
    public authController: AuthController;

    constructor() {
        this.authController = new AuthController();
        this.router = Router();
        this.routes();
    }

    public routes() {
        this.router.post('/login', this.authController.login);
    }
}
