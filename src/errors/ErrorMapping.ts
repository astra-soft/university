// src/errors/ErrorMapping.ts

/**
 * Error mapping for HTTP errors
 * @module Errors/ErrorMapping
 * @description
 * Maps App error classes to their corresponding HTTP status codes and error messages.
 */

// ! own
// errors
import {
	NotFoundError,
	UnauthorizedError,
	ValidationError,
	DuplicateKeyError,
	ForbiddenError,
	AppError
} from '@errors';
// interfaces
import { EHttpClientErrorStatus, EHttpServerErrorStatus } from '@interfaces';

/**
 * Handler configuration for specific error classes.
 */
type ErrorHandlerConfig = {
	statusCode: number;
	defaultMessage: string;
	errorName: string; // Имя основной ошибки
};

// Error mapping for known error types
export const ErrorMapping: Record<string, ErrorHandlerConfig> = {
	[NotFoundError.name]: {
		statusCode: EHttpClientErrorStatus.NotFound,
		defaultMessage: 'The requested resource was not found.',
		errorName: NotFoundError.name
	},
	[UnauthorizedError.name]: {
		statusCode: EHttpClientErrorStatus.Unauthorized,
		defaultMessage: 'Unauthorized access.',
		errorName: UnauthorizedError.name
	},
	[ValidationError.name]: {
		statusCode: EHttpClientErrorStatus.BadRequest,
		defaultMessage: 'Validation failed.',
		errorName: ValidationError.name
	},
	[DuplicateKeyError.name]: {
		statusCode: EHttpClientErrorStatus.Conflict,
		defaultMessage: 'Duplicate entry detected.',
		errorName: DuplicateKeyError.name
	},
	[ForbiddenError.name]: {
		statusCode: EHttpClientErrorStatus.Forbidden,
		defaultMessage: 'You do not have permission to perform this action.',
		errorName: ForbiddenError.name
	},
	[AppError.name]: {
		statusCode: EHttpServerErrorStatus.InternalServerError,
		defaultMessage: 'An unexpected error occurred.',
		errorName: AppError.name
	}
};
