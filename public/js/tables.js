const params = new URLSearchParams(window.location.search);
const paramName = params.get("name");
console.log(paramName)

// MIEMBROS
if(paramName === "miembros"){
  fetch('/member')
    .then(response => response.json()) 
    .then(data => {
      const title = document.getElementById('title');
      title.innerHTML = 'Miembros';
      const dataList = document.getElementById('list');
      const head = document.getElementById('table-head');
      head.innerHTML= `
      <th scope="col">ID</th>
      <th scope="col">Nombre</th>
      <th scope="col">Rol</th>
      <th scope="col">Sueldo</th>
      <th scope="col">Fecha de pago</th>
      `
      data.forEach(data => {
        const tr = document.createElement('tr');
        tr.innerHTML= `
        <th scope="row">${data.miembro_id}</th>
        <td>${data.nombre}</td>
        <td>${data.rol}</td>
        <td>$${data.sueldo}</td>
        <td>${data.fecha_pago}</td>`;
        dataList.appendChild(tr);
      });
    })
    .catch(error => {
      console.error('Error al obtener los datos:', error);
    });
  }
// albums
else if(paramName === "albums"){
  fetch('/albums')
    .then(response => response.json()) 
    .then(data => {
      const title = document.getElementById('title');
      title.innerHTML = 'Albums';
      const dataList = document.getElementById('list');
      const head = document.getElementById('table-head');
      head.innerHTML= `
      <th scope="col">ID</th>
      <th scope="col">Album</th>
      <th scope="col">Fecha de lanzamiento</th>
      <th scope="col"></th>
      `
  
      data.forEach(data => {
        const tr = document.createElement('tr');
        tr.innerHTML= `
        <th scope="row">${data.album_id}</th>
        <td>${data.titulo}</td>
        <td>${data.fecha_lanzamiento}</td>
        <td><button type="button" class="btn btn-light"><a href="/html/tables.html?album=${data.album_id}">Ver informacion</a></button></td>`;
        dataList.appendChild(tr);
      });
    })
    .catch(error => {
      console.error('Error al obtener los datos:', error);
    });
  }
// TECNICOS 
else if(paramName === "tecnicos"){
  fetch('/tecnico')
    .then(response => response.json()) 
    .then(data => {
      const title = document.getElementById('title');
      title.innerHTML = 'Tecnicos';
      const dataList = document.getElementById('list');
      const head = document.getElementById('table-head');
      head.innerHTML= `
      <th scope="col">ID</th>
      <th scope="col">Nombre</th>
      <th scope="col">Rol</th>
      <th scope="col"></th>
      `
  
      data.forEach(data => {
        const tr = document.createElement('tr');
        tr.innerHTML= `
        <th scope="row">${data.tecnico_id}</th>
        <td>${data.nombre}</td>
        <td>${data.rol}</td>
        <td><button type="button" class="btn btn-light"><a href="/html/tables.html?tecnico=${data.tecnico_id}">Ver informacion</a></button></td>`;
        dataList.appendChild(tr);
      });
    })
    .catch(error => {
      console.error('Error al obtener los datos:', error);
    });
  }
// SONGS
else if(paramName === "canciones"){
fetch('/songs')
  .then(response => response.json()) 
  .then(data => {
    const title = document.getElementById('title');
    title.innerHTML = 'Canciones';
    const songList = document.getElementById('list');
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
    console.error('Error al obtener los datos:', error);
  });
}
