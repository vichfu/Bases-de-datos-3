const songList = document.getElementById('navbar');
songList.innerHTML = `
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-item nav-link" href="index.html">Diez consultas</a>
        <a class="nav-item nav-link" href="band.html">Ver banda</a>
        <a class="nav-item nav-link" href="updateTables.html">Actualizar tablas</a>
      </div>
    </div>
`