const path = require('path');
const moduleAlias = require('module-alias');

moduleAlias.addAliases({
	'@config': path.join(__dirname, 'dist/config/index.js'),
	'@controllers': path.join(__dirname, 'dist/controllers'),
	'@core': path.join(__dirname, 'dist/core/index.js'),
	'@database': path.join(__dirname, 'dist/database'),
	'@models': path.join(__dirname, 'dist/database/models/index.js'),
	'@errors': path.join(__dirname, 'dist/errors/index.js'),
	'@interfaces': path.join(__dirname, 'dist/interfaces'),
	'@repositories': path.join(__dirname, 'dist/repositories/index.js'),
	'@routers': path.join(__dirname, 'dist/routers/index.js'),
	'@services': path.join(__dirname, 'dist/services/index.js'),
	'@utils': path.join(__dirname, 'dist/utils')
});
