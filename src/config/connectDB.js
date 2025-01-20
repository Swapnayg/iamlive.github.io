const mysql = require('mysql2/promise');
/* 
const connection = mysql.createPool({
  host: 'dbtiran.cjakccac2nys.ap-south-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Ajax24x7#365',
  database: 'win',
  port: '3306' 
   
}); */

const connection = mysql.createPool({
  host: 'localhost',
  user: 'Swapna',
  password: 'Swapna@123',
  database: 'swapna_test',
  port: '3306' 
   
})

export default connection;


