import {App} from "./app";
import {LoggerService} from "./logger/logger.service";
import {UsersController} from "./users/users.controller";
import {ExeptionFilter} from "./error/exeption.filter";
import {TYPES} from "../types";
import {Container} from "inversify";
import {ILogger} from "./logger/logger.interface";
import {IExeptionFilter} from "./error/exeption.filter.interface";


async function bootstrap() {
    // const logger = new LoggerService()
    // const app = new App(
    //     logger,
    //     new UsersController(logger),
    //     new ExeptionFilter(logger))
    const appContainer = new Container();
    appContainer.bind<ILogger> (TYPES.ILogger).to (LoggerService);
    appContainer.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
    appContainer.bind<UsersController>(TYPES.UserController).to(UsersController);
    appContainer.bind<App> (TYPES.Application) .to (App);
    const app = appContainer.get<App> (TYPES.Application);
    await app.init()
}

bootstrap()