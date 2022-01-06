export class AuthService {

	isValidUser(username: string, password: string): boolean {
		return username === 'admin' && password === 'admin';
	}
}
