
const modulosDB = {}
, con = require('./conexion-mysql')
// ejercicio 10
modulosDB.expressMysql = (req, res) => {
	con.query('SELECT * FROM usuario', (error, results) => {
		if (!error) {
			let counter = 1;
			let usuariosBD =
			`<table>
			<tr>
			<th>Nombre</th><th>Correo</th>
			</tr>`
				results.forEach((fila) =>{
					usuariosBD +=
					`<tr>
					<td cell="${counter}"> ${fila.nombre} </td>
					<td> ${fila.correo} </td>
					</tr>`;
					counter++;
				})
				usuariosBD += '</table>'
				res.send(usuariosBD)
		}
	})
	.on("error", function (error) {
		console.error("Query Error: ", error.message);
		res.status(500).send({cause:error.message})
	})
	// con.end()
}
// ejercicio 11, 12
modulosDB.expressMysql2 = (req, res, next) => {
	// TODO: informarse - input sanitization
	var usuarioID = req.query.usuario
	, nombre = req.query.nombre
	, usuarioBD = "";

	usuarioID = isNaN(usuarioID) ? false : parseInt(usuarioID);
	nombre = typeof(nombre) == 'string' && nombre.trim().length > 0 ? nombre : false;

	// console.log('usuario, nombre: ', usuario, nombre);
	if (usuarioID) {
		con.query(`SELECT * FROM usuario WHERE id=${usuarioID}`, (error, results) => {
			if (!error) {
				usuarioBD =
				`<table>
				<tr>
				<th>Nombre</th><th>Correo</th>
				</tr>`;
				results.forEach((fila) =>{
					usuarioBD +=
					`<tr>
					<td> ${fila.nombre} </td>
					<td> ${fila.correo} </td>
					</tr>`
				})
				usuarioBD += '</table>'
				res.send(usuarioBD)
			}
		})
		.on("error", function (error) {
      console.error("Query Error: ", error.message);
      res.status(500).send({cause:error.message})
		})
	}
	if (nombre) {
		con.query("SELECT * FROM usuario WHERE nombre LIKE '%"+ nombre +"%'", (error, results) => {
			if (!error) {
				usuarioBD = `<div class="miClase">`;
				results.forEach((fila) =>{
					usuarioBD += `<span> ${fila.nombre} &nbsp;</span>`;
				})
				usuarioBD += '</div>';
				res.send(usuarioBD)
			}
		})
		.on("error", function (error) {
      console.error("Query Error: ", error.message);
      res.status(500).send({cause:error.message})
		})
	}
	// con.end()
}
// ejercicio 13
modulosDB.mysqlInsert = async (req, res, next) => {
	let nombre = req.body.nombre ?? false
		, correo = req.body.correo ?? false;
	// console.log('file: ', req.file);
	// console.log('body: ', req.body);
	if (!nombre || !correo) {
		res.send('<span class="no-encontrado"> Por favor ingrese su nombre y correo </span>')
	} else {
		// let resultadoBD = con.query(`INSERT into usuario values ('', '${nombre}', '${correo}')`)
		con.query(`INSERT into usuario values ('', '${nombre}', '${correo}')`, (error, results) =>{
			if (!error) {
				res.send(`<span class="encontrado"> Gracias. ${nombre} - ${correo} </span>`)
			} else {
				next(error)
			}
		})
	}
}

module.exports = modulosDB;
