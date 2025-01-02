// src/framework/ErrorHandler.ts

/**
 * ErrorHandler
 * @module Framework/ErrorHandler
 */

// ! own
// errors
import { AppError, EOrigin, ErrorMapping } from '@errors';
// interfaces
import { EHttpServerErrorStatus } from '@interfaces';

type ErrorResponse = {
	status: number;
	body: {
		requestId: string;
		error: string;
		origin: EOrigin;
		subError?: string;
		originalError?: Error;
		message: string;
		details?: Record<string, any>;
	};
};

/**
 * Centralized error handler for the application.
 * Handles known and unknown errors, providing a standardized response format.
 */
export class ErrorHandler {
	/**
	 * Handles the provided error and modifies the Koa context.
	 * @param error - The error to handle.
	 * @param requestId - The unique request identifier.
	 * @returns {ErrorResponse} The response data to send to the client.
	 */
	public static handle(error: unknown, requestId: string): ErrorResponse {
		// Дефолтные значения для неизвестной ошибки
		const response: ErrorResponse = {
			status: EHttpServerErrorStatus.InternalServerError,
			body: {
				requestId,
				error: AppError.name,
				origin: EOrigin.Unknown,
				message: 'Internal Server Error',
				details: { error }
			}
		};

		// Если ошибка является AppError, перезаписываем данные
		if (error instanceof AppError) {
			const handler = ErrorMapping[error.constructor.name];
			if (handler) {
				response.status = handler.statusCode;
				response.body = {
					requestId,
					error: error.name,
					origin: error.origin,
					subError: error.subError,
					message: error.message || handler.defaultMessage,
					details: error.details,
					originalError: error.originalError
				};
			}
		}
		return response;
	}
}
