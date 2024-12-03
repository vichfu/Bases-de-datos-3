CREATE TABLE Banda (
    banda_id SERIAL PRIMARY KEY,
    nombre VARCHAR(15),
    presupuesto NUMERIC
);
CREATE TABLE Miembro (
    miembro_id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    rol VARCHAR(15)
);
CREATE TABLE Miembro_Banda (
    banda_id INT,
    miembro_id INT,
    sueldo NUMERIC,
    fecha_pago DATE,
    PRIMARY KEY (banda_id, miembro_id),
    FOREIGN KEY (banda_id) REFERENCES Banda(banda_id),
    FOREIGN KEY (miembro_id) REFERENCES Miembro(miembro_id)
);
CREATE TABLE Album (
    album_id SERIAL PRIMARY KEY,
    titulo VARCHAR(15),
    fecha_lanzamiento DATE
);
CREATE TABLE Cancion (
    cancion_id SERIAL PRIMARY KEY,
    titulo VARCHAR(15),
    album_id INT,
    banda_id INT,
    reproducciones NUMERIC,
    FOREIGN KEY (album_id) REFERENCES Album(album_id),
    FOREIGN KEY (banda_id) REFERENCES Banda(banda_id)
);
CREATE TABLE Cancion_Banda (
    cancion_id INT,
    banda_id INT,
    recaudacion NUMERIC,
    PRIMARY KEY (cancion_id, banda_id),
    FOREIGN KEY (cancion_id) REFERENCES Cancion(cancion_id),
    FOREIGN KEY (banda_id) REFERENCES Banda(banda_id)
);
CREATE TABLE Concierto (
    concierto_id SERIAL PRIMARY KEY,
    lugar VARCHAR(50),
    fecha DATE,
    asistencia NUMERIC
);
CREATE TABLE Concierto_Banda (
    concierto_id INT,
    banda_id INT,
    coste NUMERIC,
    recaudacion NUMERIC,
    PRIMARY KEY (concierto_id, banda_id),
    FOREIGN KEY (concierto_id) REFERENCES Concierto(concierto_id),
    FOREIGN KEY (banda_id) REFERENCES Banda(banda_id)
);
CREATE TABLE Tecnico (
    tecnico_id SERIAL PRIMARY KEY,
    nombre VARCHAR(15),
    rol VARCHAR(15)
);
CREATE TABLE Tecnico_Album (
    tecnico_id INT,
    album_id INT,
    pago NUMERIC,
    PRIMARY KEY (tecnico_id, album_id),
    FOREIGN KEY (tecnico_id) REFERENCES Tecnico(tecnico_id),
    FOREIGN KEY (album_id) REFERENCES Album(album_id)
);
CREATE TABLE Tecnico_Concierto (
    tecnico_id INT,
    concierto_id INT,
    sueldo NUMERIC,
    PRIMARY KEY (tecnico_id, concierto_id),
    FOREIGN KEY (tecnico_id) REFERENCES Tecnico(tecnico_id),
    FOREIGN KEY (concierto_id) REFERENCES Concierto(concierto_id)
);
CREATE TABLE Estudio (
    estudio_id SERIAL PRIMARY KEY,
    nombre VARCHAR(20)
);
CREATE TABLE Estudio_Banda (
    estudio_id INT,
    banda_id INT,
    album_id INT,
    coste_album NUMERIC,
    PRIMARY KEY (estudio_id, banda_id, album_id),
    FOREIGN KEY (estudio_id) REFERENCES Estudio(estudio_id),
    FOREIGN KEY (banda_id) REFERENCES Banda(banda_id),
    FOREIGN KEY (album_id) REFERENCES Album(album_id)
);

-- Banda
INSERT INTO Banda ( nombre, presupuesto) VALUES ('Banda 1', 15000);

-- Estudio
INSERT INTO Estudio (nombre) VALUES ('Estudio 1');

-- Tecnicos
INSERT INTO Tecnico (nombre, rol) VALUES ('Tecnico 1', 'especialidad A');
INSERT INTO Tecnico (nombre, rol) VALUES ('Tecnico 2', 'especialidad B');
INSERT INTO Tecnico (nombre, rol) VALUES ('Tecnico 3', 'especialidad C');
INSERT INTO Tecnico (nombre, rol) VALUES ('Tecnico 4', 'especialidad D');

