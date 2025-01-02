// src/middleware/Validate.middleware.ts

/**
 * @file Middleware for validating input data.
 * @module Middleware/Validate
 * @description
 * Provides middleware for validating input data.
 */

// ! lib
// koa
import { Context, Next } from 'koa';
// class-transformer
import { plainToInstance } from 'class-transformer';
// class-validator
import { validate } from 'class-validator';

// ! own
// errors
import { EOrigin, ValidationError } from '@errors';
// utils
import { ValueCheckerUtils } from '@utils';

async function validateData(dto: any, data: any) {
	if (!data || ValueCheckerUtils.isEmpty(data)) {
		throw new ValidationError({
			origin: EOrigin.Middleware,
			message: 'No data provided',
			details: {
				reason: 'No data provided'
			}
		});
	}

	// Преобразование данных в экземпляр DTO
	const instance = plainToInstance(dto, data);

	// Валидация
	const errors = await validate(instance as object);
	if (errors.length > 0) {
		throw new ValidationError({
			origin: EOrigin.Middleware,
			message: 'Validation failed',
			details: {
				errors: errors.map(err => ({
					property: err.property,
					constraints: err.constraints
				}))
			}
		});
	}

	return instance;
}

export function ValidateBodyMiddleware(dto: any) {
	return async (ctx: Context, next: Next) => {
		// Используем общую функцию для валидации
		ctx.state.validatedData = await validateData(dto, ctx.request.body);
		await next();
	};
}

export function ValidateParamsMiddleware(dto: any) {
	return async (ctx: Context, next: Next) => {
		// Используем общую функцию для валидации
		ctx.state.validatedParams = await validateData(dto, ctx.params);
		await next();
	};
}
