// src/utils/isEnvironment.ts

// ! own
// config
import { config } from '@config';
// interfaces
import { EEnvironment } from '@interfaces';

export function isProduction(): boolean {
	return getEnvironment() === EEnvironment.Production;
}

export function isNotProduction(): boolean {
	return !isProduction();
}

export function isDevelopment(): boolean {
	return getEnvironment() === EEnvironment.Development;
}

export function isNotDevelopment(): boolean {
	return !isDevelopment();
}

export function isDebug(): boolean {
	return getEnvironment() === EEnvironment.Debug;
}

export function isNotDebug(): boolean {
	return !isDebug();
}

export function isEnvironment(environment: EEnvironment): boolean {
	return getEnvironment() === environment;
}

export function getEnvironment(): EEnvironment {
	if (
		Object.values(EEnvironment).includes(config.app.environment as EEnvironment)
	) {
		return config.app.environment as EEnvironment;
	} else {
		return EEnvironment.Production;
	}
}
