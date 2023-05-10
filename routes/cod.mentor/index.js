'use strict'

const express = require('express')
, router = express.Router()
, errorLib = require('../errors')
, {rootDir} = require('../../bin/config')
, proyecto1 = require('./proyecto1-c.mentor')
, proyecto2 = require('./proyecto2-c.mentor')
, {getFile, postEjercicio07, calculadora08, sugiereNombre09, getXML} = require('./express-ajax')
, {expressMysql, expressMysql2, mysqlInsert} = require('./express-ajax-mysql')

const home = (req, res, next) => {
	res.sendFile('/index.html', {root: rootDir})
}

	router
	.get('/', home)
	.get('/:file?', getFile) // Navegación
	.post('/envio_xhr', postEjercicio07)
	.get('/calculadora', calculadora08)
	.get('/cadena', sugiereNombre09)
	.get('/servidor.express', expressMysql) // ejercicio 10
	.get('/consulta.express', expressMysql2) // ejercicio 11, 12
	.post('/consulta.express', mysqlInsert) // ejercicio 13
	.get('/archivo.xml', getXML) // ejercicio 14, 15, 16 (videos 26 - 28)
	.post('/archivo.xml', getXML) // ejercicio 17
	.get('/py1-personas', proyecto1)
	.get('/py2-personas', proyecto2)

	.use(errorLib.catch404)
	.use(errorLib.errorHandler)

	module.exports = router;
