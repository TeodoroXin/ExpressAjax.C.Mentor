const mysql = require('mysql');
// Archivo de configuracion de la base de datos
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'vmiMi8Dxmli_pd0',
  database: 'personas'
});

// funcion de conexión mysql
con.connect(
  (err) => {
    if(!err) {
      console.log('Conexión establecida');
    } else {
      console.log('Error de Conexión con la BD');
    }
  }
);

module.exports = con;
