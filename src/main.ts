import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { ExeptionFilter } from './error/exeption.filter';
import { TYPES } from '../types';
import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { IExeptionFilter } from './error/exeption.filter.interface';
import { IUserController } from './users/userController.interface';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<App>(TYPES.Application).to(App);
});

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
