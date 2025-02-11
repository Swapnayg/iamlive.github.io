const mysql = require('mysql2/promise');

import "dotenv/config";
/* 
const connection = mysql.createPool({
  host: 'dbtiran.cjakccac2nys.ap-south-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Ajax24x7#365',
  database: 'win',
  port: '3306' 
   
}); */

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  port: process.env.DB_PORT   
})

export default connection;


