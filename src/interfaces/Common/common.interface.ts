// src/interfaces/Common/common.interface.ts

// ! lib
// mongoose
import { ObjectId } from 'mongoose';

/**
 * Common interface exports
 * @module Interfaces/Common
 */

export type TId = ObjectId;

export enum ESupportedLanguage {
	EN = 'en',
	RU = 'ru'
}
