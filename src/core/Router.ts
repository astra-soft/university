// src/core/Router.ts

/**
 * Architecture component
 * Router implementation for HTTP request handling
 * @module Core/Router
 * @description
 * Provides routing functionality including:
 * - HTTP method handlers (GET, POST, PUT, DELETE)
 * - Nested route groups
 * - Path normalization
 * - Request context management
 */

// ! lib
// http
import { IncomingMessage, ServerResponse } from 'http';

// ! own
// core
import { Module, RequestContext } from '@core';
// interface
import {
	EHttpMethod,
	ERouterNameModule,
	ETypeModule,
	RequestHandler,
	TModuleValue
} from '@interfaces';
// utils
import { isNotUndefined } from '@utils';

/**
 * Router class for handling HTTP requests
 * @extends Module
 */
export class Router extends Module {
	/** Base path for this router group */
	private basePath: string;
	/** Map of path to HTTP method handlers */
	private handlers: Record<string, Record<EHttpMethod, RequestHandler>> = {};
	/** Map of path to nested router groups */
	private subGroups: Record<string, Router> = {};

	/**
	 * Normalizes path by removing leading slash
	 * @param path - Path to normalize
	 * @returns Normalized path
	 */
	private _normalizedPath(path: string): string {
		return path.startsWith('/') ? path.slice(1) : path;
	}

	/**
	 * Registers a handler for a specific HTTP method and path
	 * @param path - Route path
	 * @param method - HTTP method
	 * @param handler - Request handler function
	 */
	private _addHandlerMethod(
		path: string,
		method: EHttpMethod,
		handler: RequestHandler
	): void {
		const normalizedPath = this._normalizedPath(path);
		if (
			this.handlers[normalizedPath] &&
			this.handlers[normalizedPath][method]
		) {
			this.warn({
				message: `Rewrite handler for ${method} - /${this.basePath}${path}`
			});
		}
		this.handlers[normalizedPath] = this.handlers[normalizedPath] ?? {};
		this.handlers[normalizedPath][method] = handler;

		this.info({
			message: `Register new router ${method} - /${this.basePath}${path}`
		});
	}

	/**
	 * Creates a new router instance
	 * @param basePath - Base path for this router group
	 * @param name - Router name from enum
	 */
	constructor(basePath: string, name: ERouterNameModule) {
		super(ETypeModule.Router, name);
		this.basePath = this._normalizedPath(basePath);
	}

	/**
	 * Gets the base path of this router group
	 * @returns Base path string
	 */
	public getBasePath(): string {
		return this.basePath;
	}

	/**
	 * Registers a GET request handler
	 * @param path - Route path
	 * @param handler - Request handler function
	 */
	public get(path: string, handler: RequestHandler): void {
		this._addHandlerMethod(path, EHttpMethod.GET, handler);
	}

	/**
	 * Registers a POST request handler
	 * @param path - Route path
	 * @param handler - Request handler function
	 */
	public post(path: string, handler: RequestHandler): void {
		this._addHandlerMethod(path, EHttpMethod.POST, handler);
	}

	/**
	 * Registers a PUT request handler
	 * @param path - Route path
	 * @param handler - Request handler function
	 */
	public put(path: string, handler: RequestHandler): void {
		this._addHandlerMethod(path, EHttpMethod.PUT, handler);
	}

	/**
	 * Registers a DELETE request handler
	 * @param path - Route path
	 * @param handler - Request handler function
	 */
	public delete(path: string, handler: RequestHandler): void {
		this._addHandlerMethod(path, EHttpMethod.DELETE, handler);
	}

	/**
	 * Creates a nested router group
	 * @param path - Group base path
	 * @param name - Router name from enum
	 * @returns New router instance for the group
	 */
	public addGroup(
		path: string,
		name: TModuleValue<ETypeModule.Router>
	): Router {
		const normalizedPath = this._normalizedPath(path);
		if (!this.subGroups[normalizedPath]) {
			this.subGroups[normalizedPath] = new Router(path, name);
		}
		return this.subGroups[normalizedPath];
	}

	/**
	 * Checks if a handler exists for the given path and method
	 * @param path - Route path
	 * @param method - HTTP method
	 * @returns True if handler exists
	 */
	public hasHandler(path: string, method: EHttpMethod): boolean {
		return this.handlers[path] && isNotUndefined(this.handlers[path][method]);
	}

	/**
	 * Checks if a nested group exists for the given path
	 * @param path - Group path
	 * @returns True if group exists
	 */
	public hasGroup(path: string): boolean {
		return isNotUndefined(this.subGroups[path]);
	}

	/**
	 * Handles an incoming HTTP request
	 * @param parts - URL path parts
	 * @param method - HTTP method
	 * @param req - HTTP request object
	 * @param res - HTTP response object
	 * @param context - Request context
	 * @returns True if request was handled
	 */
	public handleRequest(
		parts: string[],
		method: EHttpMethod,
		req: IncomingMessage,
		res: ServerResponse,
		context: RequestContext
	): boolean {
		const [currentPath, ...remainingParts] = parts;
		const path = currentPath || '';

		if (remainingParts.length === 0 && this.hasHandler(path, method)) {
			this.handlers[path][method](req, res, context);
			return true;
		}

		if (this.hasGroup(path)) {
			return this.subGroups[path].handleRequest(
				remainingParts,
				method,
				req,
				res,
				context
			);
		}

		return false;
	}
}
