
var app = {};

app.mostrarUsuarios = function(){
  result = document.getElementById("info")
  var xmlhttp;
  if(window.XMLHttpRequest){
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
      result.innerHTML = xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET", "py2-personas?usuario="+ "index", true)
  xmlhttp.send()
}

app.editarUsuario = function(usuarioID) {
  var nombreID = 'nombreID' + usuarioID
  , borrar = 'borrar' + usuarioID
  , actualizar = 'actualizar' + usuarioID
  , editarNombreID = nombreID + '-editar';

  var nombreUsuario = document.getElementById(nombreID).innerText
  ,  parent = document.querySelector('#' + nombreID);

  // Crea un cuadro de texto para actualizar la BD si no existe
  if (parent.querySelector('#' + editarNombreID) === null) {
    document.getElementById(nombreID).innerHTML = '<input type="text" id="'+ editarNombreID +'" value ="'+ nombreUsuario +'">';
    document.getElementById(borrar).disabled = true;
    document.getElementById(actualizar).style.display = "";
  } else {
    var nombreSinActualizar = document.getElementById(editarNombreID).value;
    document.getElementById(nombreID).innerHTML = nombreSinActualizar;
    document.getElementById(borrar).disabled = false;
    document.getElementById(actualizar).style.display = "none";
  }
}

app.agregarUsuario = function() {
  var xmlhttp
    , nuevoUsuario = document.getElementById("nuevoUsuarioID").value
    , nuevoEmail = document.getElementById("nuevoEmailID").value

  if(window.XMLHttpRequest){
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
      server = JSON.parse(xmlhttp.responseText);
      if (server.created) {
        var tablaUsuarios = document.querySelector(".tablaUsuarios > table")
        , filaFinal = tablaUsuarios.rows.length
        , ultimoID = server.newId

        var nuevaFila = tablaUsuarios.insertRow(filaFinal);
        var celdaId = nuevaFila.insertCell(0).innerText = ultimoID;
        var celdaNombre = nuevaFila.insertCell(1)
            celdaNombre.innerText = nuevoUsuario;
            celdaNombre.id = 'nombreID' + ultimoID;
        var celdaEmail = nuevaFila.insertCell(2)
            celdaEmail.innerText = nuevoEmail;
            celdaEmail.id = 'emailID' + ultimoID;
        // antes var celdaEditar, celdaBorrar, nuevaFila.insertCell(4)...
        var celdaEdicion = nuevaFila.insertCell(3);
            celdaEdicion.innerHTML = '<input id="'+ ultimoID +'" onclick="app.editarUsuario('+ ultimoID +')" type="button" value="Editar" class="btn btn-secondary">'
              + '<input id="borrar'+ ultimoID +'" onclick="app.borrarUsuario('+ ultimoID +')" type="button" value="Borrar" class="btn btn-danger">'
              + '<input id="actualizar'+ ultimoID +'" onclick="app.actualizarUsuario('+ ultimoID +')" type="button" value="Actualizar" class="btn btn-primary" style="display:none">';
      } else {
        app.ejecutarNuevaVentana();
      }
    }
  }
  xmlhttp.open("GET", "py2-personas?nuevoUsuario="+ nuevoUsuario + "&nuevoEmail="+ nuevoEmail, true)
  xmlhttp.send()
}

app.actualizarUsuario = function(usuarioID) {
  var xmlhttp
  , result = {}
  , nombreID = 'nombreID' + usuarioID
  , borrar = 'borrar' + usuarioID
  , actualizar = 'actualizar' + usuarioID
  , nombreActualizado = document.getElementById('nombreID' + usuarioID + '-editar').value
  , celdaNombre = document.querySelector('#' + nombreID)
  if(window.XMLHttpRequest){
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
      result = JSON.parse(xmlhttp.responseText);
      if (result.updated) {
        document.getElementById(nombreID).innerHTML = nombreActualizado;
        document.getElementById(borrar).disabled = false;
        document.getElementById(actualizar).style.display = "none";
        celdaNombre.parentNode.style.backgroundColor = "powderblue";
      }
    }
  }
  xmlhttp.open("GET", "py2-personas?usuarioIDActualizado="+ usuarioID +"&nombreActualizado="+ nombreActualizado, true)
  xmlhttp.send()
}
app.borrarUsuario = function(usuarioID) {
  var xmlhttp
  , confirmadoBorrar = confirm("Estas seguro de borrar este usuario?")

  if (!confirmadoBorrar) return 'cancelled by user';
  var result = {}
  , nombreID = 'nombreID' + usuarioID
  , celdaNombre = document.querySelector('#' + nombreID)
  if(window.XMLHttpRequest){
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
      result = JSON.parse(xmlhttp.responseText);
      if (result.deleted) {
        celdaNombre.parentNode.remove(true)
      }
    }
  }
  xmlhttp.open("GET", "py2-personas?usuarioIDEliminado="+ usuarioID, true)
  xmlhttp.send()
}
app.ejecutarNuevaVentana = function(){
  var overlay = document.getElementById('overlay')
  , nuevaVentana = document.getElementById('nuevaVentana');

  overlay.style.opacity = 0.5;
  if (overlay.style.display == "block") {
    overlay.style.display = "none";
    nuevaVentana.style.display = "none";
  } else {
    overlay.style.display = "block";
    nuevaVentana.style.display = "block";
  }
  // Asegura  que los valores de la nueva ventana estén vacíos.
  document.getElementById('nuevoUsuarioID').value = "";
  document.getElementById('nuevoEmailID').value = "";
}

app.init = function(){
  app.mostrarUsuarios();
}
window.onload = function(){
  app.init();
}
