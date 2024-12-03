const input = document.getElementById('input');
const button = document.getElementById('button');

document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault(); });

button.addEventListener('click', () => {
    const inputquery = input.value;
    fetch('/queryInput', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({query: inputquery})
    })
      .then(response => response.json()) 
      .then(data => {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
      })
      .catch(error => {
        console.error('Error al ejecutar la consulta:', error);
      });
  });
function func(x) {
  if(x==1){
    input.value = `CALL addMember('nombre','rol', sueldo)`;
  }else if(x==2){
    input.value = `CALL addAlbum('titulo', tecnico_id, pagoTecnico, coste_album)`;
  }else if(x==3){
    input.value = `CALL addSong('titulo', id_album)`;
  }else if(x==4){
    input.value = `CALL addConcert('lugar', 'fecha', asistencia, recaudacion, coste, tecnico_id, tecnico_pago)`;
  }else if(x==5){
    input.value = `UPDATE cancion SET reproducciones = --- WHERE titulo = 'titulo';`;
  }
  else if(x==11){
    input.value = `CALL deleteMember(id_miembro)`;
  }else if(x==12){
    input.value = `CALL deleteAlbum(id_album)`;
  }else if(x==13){
    input.value = `CALL deleteSong(id_cancion)`;
  }
}