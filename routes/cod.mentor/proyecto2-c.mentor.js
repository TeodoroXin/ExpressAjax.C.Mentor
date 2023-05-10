'use strict'

const con = require('./conexion-mysql')

const proyecto2 = (req, res, next) => {
  let usuario = req.query.usuario ?? false
  , usuarioIDActualizado = req.query.usuarioIDActualizado ?? false
  , usuarioIDEliminado = req.query.usuarioIDEliminado ?? false
  , nombreActualizado = req.query.nombreActualizado ?? false
  , nuevoUsuario = req.query.nuevoUsuario ?? false
  , nuevoEmail = req.query.nuevoEmail ?? false
  , resultadoBD = ""
  , nombreID = "nombreID"
  , emailID = "emailID"
  , actualizar = "actualizar"
  , borrar = "borrar";

  usuario = typeof(usuario) !== 'string'? false : usuario;
  // console.log('texto ingresado: ', usuario);
  // console.log('actualizarUsuario: ', nombreActualizado);
  // console.log('eliminarUsuario: ', usuarioIDEliminado);
  if (usuario == "index") {
    con.query("SELECT * FROM usuario", (error, results) => {
      if (!error) {
        resultadoBD =
        `	<div class="container tablaUsuarios">
        <table class="table table-striped table-bordered" id="tablaUsuarios">
          <thead>
            <th>Usuario</th><th>Nombre</th><th>E-mail</th><th>Modificar / Borrar</th>
          </thead>`
        results.forEach((fila) => {
          resultadoBD +=
          `<tr>
            <td>${fila.id}</td>
            <td id="${nombreID}${fila.id}">${fila.nombre}</td>
            <td id="${emailID}${fila.id}">${fila.correo}</td>
            <td colspan="2" class="btns-edicion">
              <input id="${fila.id}" onclick="app.editarUsuario(this.id)" type="button" value="Editar" class="btn btn-secondary">
              <input id="${borrar}${fila.id}" onclick="app.borrarUsuario(${fila.id})" type="button" value="Borrar" class="btn btn-danger">
              <input id="${actualizar}${fila.id}" onclick="app.actualizarUsuario(${fila.id})" type="button" value="Actualizar" class="btn btn-primary" style="display:none">
            </td>
          </tr>`;
        })
        resultadoBD += '</table><button onclick="app.ejecutarNuevaVentana()" class="btn btn-primary">Agregar Usuario</button></div>';
        res.send(resultadoBD)
      }
    })
    .on("error", function (error) {
      console.error("Query Error: ", error.message);
      res.status(500).send({query:error.message})
    })
  }
  if (nuevoUsuario && nuevoEmail) {
    con.query(`INSERT into usuario values('', '${nuevoUsuario}', '${nuevoEmail}')`, (error, results) => {
      if (!error) {
        res.send({created:true, newId:results.insertId})
      }
    })
    .on("error", function (error) {
      console.error("Couldn't Create: ", error.message);
      res.status(500).send({created:false})
    })
  }
  if (nombreActualizado) {
    con.query(`UPDATE usuario SET nombre='${nombreActualizado}' WHERE id='${usuarioIDActualizado}'`, (error, results) => {
      if (!error) {
        res.send({updated:true})
      }
    })
    .on("error", function (error) {
      console.error("Couldn't Update: ", error.message);
      res.status(500).send({updated:false})
    })
  }
  if (usuarioIDEliminado) {
    con.query(`DELETE FROM usuario WHERE id=${usuarioIDEliminado}`, (error, results) => {
      if (!error) {
        res.send({deleted:true})
      }
    }).on("error", function (error) {
      console.error("Couldn't Delete: ", error.message);
      res.status(500).send({deleted:false})
    })
  }
}

module.exports = proyecto2;
