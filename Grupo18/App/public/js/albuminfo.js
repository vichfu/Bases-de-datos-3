const urlAlbum = new URLSearchParams(window.location.search);
const id = urlAlbum.get("album");
console.log("ablum: ",id);

if(id){
  fetch(`/album_${id}`)
    .then(response => response.json()) 
    .then(data => {
      const title = document.getElementById('title');
      title.innerHTML = `Album ${data[0].album_id}`;
      const dataList = document.getElementById('list');
      const head = document.getElementById('table-head');
      head.innerHTML= `
      <th scope="col">ID</th>
      <th scope="col">Titulo</th>
      <th scope="col">Reproducciones</th>
      `
      data.forEach(data => {
        const tr = document.createElement('tr');
        tr.innerHTML= `
        <th scope="row">${data.cancion_id}</th>
        <td>${data.titulo}</td>
        <td>${data.reproducciones}</td>`;
        dataList.appendChild(tr);
      });
    });
}
