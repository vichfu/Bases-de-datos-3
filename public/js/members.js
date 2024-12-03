fetch('/members')
  .then(response => response.json()) 
  .then(data => {
    const songList = document.getElementById('song-list');

    const head = document.getElementById('table-head');
    head.innerHTML= `
    <th scope="col">ID</th>
    <th scope="col">Cancion</th>
    <th scope="col">Album</th>
    <th scope="col">Reproducciones</th>
    <th scope="col">Recaudación</th>
    `

    data.forEach(song => {
      const tr = document.createElement('tr');
      tr.innerHTML= `
      <th scope="row">${song.cancion_id}</th>
      <td>${song.ctitulo}</td>
      <td>${song.atitulo}</td>
      <td>${song.reproducciones}</td>
      <td>$${song.recaudacion}</td>`;
      songList.appendChild(tr);
    });
  })
  .catch(error => {
    console.error('Error al obtener las canciones:', error);
  });
