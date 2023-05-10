'use strict'
const funciones = {}
, {rootDir, siteMapOBJ} = require('../../bin/config')

// Renderizar según la ruta solicitada(siteMapOBJ) - Navegación
funciones.getFile = (req, res, next) => {
  let map = siteMapOBJ;
  let fileURL = map[req.params.file] ?? false;
  if (fileURL) {res.sendFile(fileURL, {root: rootDir})}
  else { next() }
}

funciones.postEjercicio07 = (req, res, next) => {
  // console.log('body: ', req.body);
  let nombre = req.body.nombre;
  let apellido = req.body.apellido;
  let message = "";
  if(nombre !== "" && apellido !== ""){
    message = `Gracias. Hola ${nombre} ${apellido}`;
  } else {
    message = "Por favor ingrese ambos datos";
  }
  res.send(message);
}

funciones.calculadora08 = (req, res, next) => {
  let num1 = parseInt(req.query.num1);
  let num2 = parseInt(req.query.num2);
  let result = num1 + num2;
  let result2 = num1 - num2;
  let result3 = num1 * num2;
  let result4 = num1 / num2;

  if (isNaN(num1) || isNaN(num2)) {
    res.send('Por favor ingrese dos números')
  }
  else {
    res.send(`num1 + num2 = ${result}<br/>
      num1 - num2 = ${result2}<br/>
      num1 * num2 = ${result3}<br/>
      num1 / num2 = ${result4}<br/>`);
    }
  }

funciones.sugiereNombre09 = (req, res, next) => {
  let personas = new Array(
    "Ana", "Alberto", "Beto", "Cindy", "David",
    "Esteban", "Fiorela", "Guisela", "Henry",
    "Irma", "Jeferson", "Kathy", "Liz", "Nancy",
    "Oscar", "Pedro", "Amelia", "Rocio", "Doris",
    "Erica", "Emilia", "Susan", "Teresa", "Ursula",
    "Victor", "Liliana", "Ernesto", "Willy", "Viviana"
  )
  let nombre = req.query.nombre
  , cantidadDeCaracteres = nombre.length
  , sugerencia = "";

  if (nombre === "marc0") {
    sugerencia = siteMapOBJ;
  } else if (nombre !== "") {
    nombre.toLowerCase()
    personas.forEach((persona) => {
      let comparador = persona.substring(0, cantidadDeCaracteres).toLowerCase()
      // Si hay coincidencias en lo tecleado y el array "personas"
      if (comparador.includes(nombre)) {
        // Empieza a escribir el nombre coincidente, luego agrega más si los hubiera.
        sugerencia = (sugerencia === "") ? persona : sugerencia+=`, ${persona}`;
      }
    }) // fin de forEach
  }

  sugerencia = (sugerencia === "") ? "No fue Encontrado" : sugerencia;
  res.send(sugerencia)
}
// ejercicio 14, 15, 16 (videos 26 - 28)
funciones.getXML = (req, res, next) => {
  // console.log('file: ', req.file);
  // console.log('body: ', req.body);
  // res.sendFile('/public/documents/archivo.xml')// Funciona igualmente que
  res.sendFile('archivo.xml')
}

module.exports = funciones;
