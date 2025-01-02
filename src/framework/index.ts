// src/framework/index.ts

/**
 * @module Framework
 */

// base
/** Logger for the base module application */
export * from './Logger';
/** Base class for modules */
export * from './BaseModule';
/** ErrorHandler for controllers */
export * from './ErrorHandler';

/** Base class for router manager */
export * from './RouterManager';
/** Base class for repositories extends BaseModule */
export * from './BaseRepository';
/** Base class for controllers extends BaseModule */
export * from './BaseController';
/** Base class for routers extends BaseModule */
export * from './BaseRouter';
/** Base class for services extends BaseModule */
export * from './BaseService';
/** Base class for databases extends BaseModule */
export * from './BaseDatabase';

/** Mongo database class for MongoDB extends BaseDatabase */
export * from './MongoDatabase';
