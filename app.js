const express = require('express')
	, path = require('path')
	, cookieParser = require('cookie-parser')
	, routes = require("./routes/cod.mentor/index.js")
	, logger = require('morgan')
	, favicon = require('serve-favicon')

const app = express()
	app
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'pug')

	.use(logger('dev'))
	.use(express.json())
	.use(express.urlencoded({ extended: false }))
	.use(cookieParser())
	.use(express.static(path.join(__dirname, 'public')))
	.use(favicon(path.join(__dirname, 'public/images/favicon.ico')))
	.use(routes)

module.exports = app
