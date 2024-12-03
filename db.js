//para conectar a la base de datos
const { Pool } = require('pg');

const pool = new Pool({
  user: '...',
  host: 'localHost',
  database: '...',
  password: '...',    
  port: 5432,                   
});

module.exports = pool;