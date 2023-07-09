import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import 'reflect-metadata';
import { ILogger } from '../logger/logger.interface';
import { IUserController } from './userController.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login },
			{ path: '/register', method: 'post', func: this.register },
		]);
	}

	login(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'login');
	}

	register(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'register');
	}
}
