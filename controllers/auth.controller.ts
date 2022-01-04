import {Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';

import {JWT_EXPIRATION_TIME_MS, JWT_SECRET} from '../config/jwt.config';
import {HTTP_ERROR} from '../constants/http-errors.enum';
import { AuthService } from '../services/auth.service';

export class AuthController {
	private authService: AuthService;

	constructor() {
		this.authService = new AuthService();
	}

	 public login = async ({body}: Request, res: Response): Promise<void> => {
		const {username, password} = body;

		if (this.authService.isValidUser(username, password)) {
			const payload = {user: 'admin'};
			const token =
				jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRATION_TIME_MS});
			res.send(token);
		} else {
			res.status(HTTP_ERROR.BAD_CREDENTIALS)
				.send({success: false, message: 'Bad username/password combination.'});
		}
	};

}
