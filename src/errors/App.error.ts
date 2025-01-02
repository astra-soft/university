// src/errors/App.error.ts

/**
 * Application error
 * @module Errors/AppError
 * @description
 */

// ! own
// errors
import { THttpStatus } from '@interfaces';

// TODO: перенести в interfaces
export enum EOrigin {
	Middleware = 'Middleware',
	Service = 'Service',
	Controller = 'Controller',
	Repository = 'Repository',
	Unknown = 'Unknown'
}

export class AppError extends Error {
	public readonly name: string;
	public readonly statusCode: THttpStatus;
	public readonly origin: EOrigin; // Место, где ошибка зарегистрирована
	public readonly subError?: string; // Уточнение ошибки
	public readonly originalError?: Error; // Исходная ошибка
	public readonly details?: any; // Дополнительные данные для контекста

	constructor({
		name,
		statusCode,
		origin,
		message,
		subError,
		originalError,
		details
	}: {
		name: string;
		statusCode: THttpStatus;
		origin: EOrigin;
		message: string;
		subError?: string;
		originalError?: Error;
		details?: any;
	}) {
		super(message);
		this.name = name;
		this.statusCode = statusCode;
		this.origin = origin;
		this.subError = subError;
		this.originalError = originalError;
		this.details = details;

		Object.setPrototypeOf(this, new.target.prototype);
	}
}
