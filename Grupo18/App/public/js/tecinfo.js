const urlTec = new URLSearchParams(window.location.search);
const idt = urlTec.get("tecnico");

if(idt){
  fetch(`/tecnicoalbum_${idt}`)
    .then(response => response.json()) 
    .then(data => {
      const title = document.getElementById('title');
      title.innerHTML = `${data[0].nombre}, en album:`;
      const dataList = document.getElementById('list');
      const head = document.getElementById('table-head');
      head.innerHTML= `
      <th scope="col">Album ID</th>
      <th scope="col">Pago</th>
      `
      data.forEach(data => {
        const tr = document.createElement('tr');
        tr.innerHTML= `
        <th scope="row">${data.album_id}</th>
        <td>$${data.pago}</td>`;
        dataList.appendChild(tr);
      });
    });

    fetch(`/tecnicoConcierto_${idt}`)
    .then(response => response.json()) 
    .then(data => {
      const title = document.getElementById('title2');
      title.innerHTML = `${data[0].nombre}, en conciertos:`;
      const dataList = document.getElementById('list2');
      const head = document.getElementById('table-head2');
      head.innerHTML= `
      <th scope="col">Concierto ID</th>
      <th scope="col">Pago</th>
      `
      data.forEach(data => {
        const tr = document.createElement('tr');
        tr.innerHTML= `
        <th scope="row">${data.concierto_id}</th>
        <td>$${data.sueldo}</td>`;
        dataList.appendChild(tr);
      });
    });
}
