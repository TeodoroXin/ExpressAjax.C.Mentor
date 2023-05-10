'use strict'

const express = require('express')
	, router = express.Router()
	, errorLib = require('./errors')
	, path = require('path')
	, rootDir = path.join(__dirname, '../views/')

/* GET home page. */
const home = (req, res, next) => {
  res.render('index.pug', { title: 'Hello pug'})
}
const razaPerro = (req, res, next) => {
	let raza = req.params.raza
	if(!raza) {
	  return res.send(`<h1>Debes indicar el nombre de la 🐶 </h1>`)
	} else {
	  return res.send(`<h1>La 🐶 solicidata es: ${raza}</h1>`)
	}
}
const abrirArchivo = (req, res, next) => {
	let archivo = req.params.archivo
	if(archivo){
		res.status(200)
		let options = {
			root: rootDir,
			headers: {
			  'x-timestamp': Date.now(),
			  'x-sent': true
			}
		}
		res.sendFile(archivo, options, function (err) {
			console.log(`<h1>El archivo solicidato es: ${archivo} desde el la raiz ${rootDir}</h1>`)
			if (err) {
				res.status(401)
				next(err)
			} else {
				console.log('🗃 Sent:', archivo)
			}
		})
	}
}

router
  .get('/', home)
  .get('/file/:archivo?', abrirArchivo)
  .get('/perrito/:raza?', razaPerro)
  .use(errorLib.catch404)
  .use(errorLib.errorHandler)

module.exports = router;
