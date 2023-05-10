con = require('./conexion-mysql')

const proyecto1 = (req, res, next) => {
  let nombre = req.query.nombre ?? false
    , resultadoBD = ""
    , queryString = "";

  nombre = typeof(nombre) !== 'string'? false : nombre;
  // console.log('texto ingresado: ', nombre);
  if (nombre === "index") {
    queryString = "SELECT * FROM usuario LIMIT 20";
  } else if (nombre){
    queryString = `SELECT * FROM usuario WHERE nombre LIKE '%${nombre}%'`;
  }
  if (queryString !== "") {
    // nombre = (nombre.length > 2) ? helpers.cleanInput(nombre) : nombre;
    con.query(queryString, (error, results) =>{
      if(!error) {
        results.forEach((fila) =>{
          resultadoBD += `<div class="resultDivs" onclick="toggleOverlay(this)"> ${fila.nombre} </div>
          <input type="hidden" value="${fila.correo}">`;
        })
        res.send(resultadoBD)
      }
    })
    .on("error", function (error) {
      console.error("Query Error: ", error.message);
      res.status(500).send({cause:error.message})
    })
  }
}

module.exports = proyecto1;
