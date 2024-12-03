const express = require('express');
const pool = require('./db');
const app = express();
        
app.use(express.static('public'));          

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let dbConfig = {}; 

app.post('/queryInput', async (req, res) => {
  const { query } = req.body;
  try {
    const result = await pool.query(query) || 'Consulta exitosa';
    console.log(result.rows)
    res.json(result.rows);
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.status(400).json('Consulta invalida');
  }
});
app.get('/consultas/:consulta', async (req, res) => {
  const consulta = req.params.consulta;
  let query = '';
  switch (consulta) {
    case 'cancion_mayor_recaudacion':
      query = `SELECT * FROM cancion_mayor_recaudacion();`;
      break;

    case 'recaudacion_conciertos_2024':
      query = `SELECT * FROM recaudacion_conciertos_2024();`;
      break;

    case 'miembro_mayor_sueldo':
      query = `SELECT * FROM miembro_mayor_sueldo()`;
      break;

    case 'concierto_mayor_asistencia':
      query = `select * from concierto_mayor_asistencia()`;
      break;

    case 'top_3_canciones_reproducciones':
      query = `select * from top_3_canciones_reproducciones()`;
      break;

    case 'conciertos_menos_1100_asistentes':
      query = `select * from conciertos_menos_1100_asistentes()`;
      break;

    case 'conciertos_mayor_coste':
      query = `SELECT * FROM conciertos_mayor_coste()`;
      break;

    case 'albumes_mas_costosos':
      query = `select * from albumes_mas_costosos()`;
      break;

    case 'reproducciones_totales_albumes':
      query = `SELECT * from reproducciones_totales_albumes()`;
      break;

    case 'total_reproducciones_y_recaudacion':
      query = `select * from total_reproducciones_y_recaudacion()`;
      break;
  }

  try {
    const resultados = await pool.query(query);
    res.json(resultados.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al ejecutar la consulta');
  } 
});
app.get('/songs', async (req, res) => {
    try {
      const query = `SELECT DISTINCT a.titulo AS aTitulo, c.cancion_id, c.titulo AS cTitulo, c.reproducciones, cb.recaudacion 
      FROM cancion c 
      JOIN Cancion_banda cb ON cb.cancion_id = c.cancion_id 
      JOIN Album a ON a.album_id = c.album_id
      ORDER BY c.reproducciones DESC
      `;
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(502).send('Error en la BD');
    }
});
app.get('/member', async (req, res) => {
  try {
    const query = `SELECT * FROM miembro m
    JOIN miembro_banda mb ON m.miembro_id = mb.miembro_id
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(502).send('Error en la BD');
  }
});
app.get('/albums', async (req, res) => {
  try {
    const query = `SELECT * FROM album`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(502).send('Error en la BD');
  } 
});
app.get('/tecnicoConcierto_:id', async (req,res)=>{
  const { id } = req.params;
  try {
    const query = `SELECT * from produced(${id})`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(502).send('Error en la BD');
  }
});
app.get('/tecnico', async (req, res) => {
  try {
    const query = `SELECT * from tecnico `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(502).send('Error en la BD');
  }
});
app.get('/tecnicoalbum_:id', async (req,res)=>{
  const { id } = req.params;
  try {
    const query = `select * from producedalbum(${id})`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(502).send('Error en la BD');
  }
});
app.get('/album_:id', async (req,res)=>{
  const { id } = req.params;
  try {
    const query = `select * from getAlbum(${id}) order by cancion_id asc`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(502).send('Error en la BD');
  }
});
app.get('/', (req,res) =>{
    res.redirect('html/index.html');
});
app.get('/conciertos', async (req,res)=>{
  try {
    const query = `
    SELECT * FROM concierto`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(502).send('Error en la BD');
  } 


});
app.get('/recaudaciones', async (req,res)=>{
  try {
    const query = `
    SELECT * FROM concierto_banda`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(502).send('Error en la BD');
  } 
});
app.get('/tconciertos', async (req,res)=>{
  try {
    const query = `
    SELECT * FROM tecnico_concierto`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(502).send('Error en la BD');
  } 
})
app.listen(3000, () => console.log('aaa'));
 
