import express, {Express} from "express";
import {Server} from 'http'
import {LoggerService} from "./logger/logger.service";
import {UserController} from "./users/users.controller";
import {ExeptionFilter} from "./error/exeption.filter";
import {ILogger} from "./logger/logger.interface";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import 'reflect-metadata'

@injectable()
export class App {
    app: Express
    server: Server
    port: number


    constructor(@inject(TYPES.ILogger) private logger: ILogger,
                @inject(TYPES.UserController) private userController: UserController,
                @inject(TYPES.ExeptionFilter) private  exeptionFilter: ExeptionFilter) {
        this.app = express()
        this.port = 8000
    }


    useRoutes() {
        this.app.use('/users', this.userController.router)
    }

    useExeptionFilters() {
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
    }

    public async init() {
        this.useRoutes()
        this.useExeptionFilters()
        this.server = this.app.listen(this.port)
        this.logger.log(`Сервер запущен на http://localhost:${this.port}`)
    }
}

