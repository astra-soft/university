// src/interfaces/Router/index.ts

// ! lib
// koa
import Router from '@koa/router';

export interface IModuleRouter {
	getRouter(): Router;
	initializeRoutes(): number;
}

export interface IClassRouter {
	new (): IModuleRouter;
}
