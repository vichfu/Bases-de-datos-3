CREATE OR REPLACE FUNCTION cancion_mayor_recaudacion()
    RETURNS TABLE(cancion_id INT, recaudacion NUMERIC) AS $$
    BEGIN
        RETURN QUERY
        SELECT cb.cancion_id, cb.recaudacion
        FROM Cancion_Banda cb
        ORDER BY cb.recaudacion DESC 
        LIMIT 1;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION recaudacion_conciertos_2024()
    RETURNS NUMERIC AS $$
    BEGIN
        RETURN (
            SELECT SUM(recaudacion)
            FROM Concierto_Banda cb
            JOIN Concierto  c ON cb.concierto_id = c.concierto_id
            WHERE EXTRACT(YEAR FROM c.fecha) = 2024
        );
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION miembro_mayor_sueldo()
    RETURNS TABLE(miembro_id INT, sueldo NUMERIC) AS $$
    BEGIN
        RETURN QUERY
        SELECT mb.miembro_id, mb.sueldo
        FROM Miembro_Banda mb
        ORDER BY sueldo DESC 
        LIMIT 1;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION concierto_mayor_asistencia()
    RETURNS TABLE(concierto_id INT, asistencia NUMERIC) AS $$
    BEGIN
        RETURN QUERY
        SELECT c.concierto_id, c.asistencia
        FROM Concierto c
        ORDER BY c.asistencia DESC
        LIMIT 1;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION top_3_canciones_reproducciones()
    RETURNS TABLE(titulo VARCHAR, reproducciones NUMERIC, total_ingresos NUMERIC) AS $$
    BEGIN
        RETURN QUERY
        SELECT c.titulo, c.reproducciones, SUM(cb.recaudacion) AS total_ingresos
        FROM Cancion c
        JOIN Cancion_Banda cb ON c.cancion_id = cb.cancion_id
        GROUP BY c.titulo, c.reproducciones
        ORDER BY c.reproducciones DESC
        LIMIT 3;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION conciertos_menos_1100_asistentes()
    RETURNS TABLE(concierto_id INT, asistencia NUMERIC, lugar VARCHAR) AS $$
    BEGIN
        RETURN QUERY
        SELECT c.concierto_id, c.asistencia, c.lugar
        FROM Concierto c
        WHERE c.asistencia < 1100;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION conciertos_mayor_coste()
    RETURNS TABLE(concierto_id INT, lugar VARCHAR, coste NUMERIC) AS $$
    BEGIN
        RETURN QUERY
        SELECT c.concierto_id, c.lugar, cb.coste
        FROM Concierto_Banda cb
        JOIN Concierto c ON c.concierto_id = cb.concierto_id
        GROUP BY c.concierto_id, cb.coste
        ORDER BY cb.coste DESC;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION albumes_mas_costosos()
    RETURNS TABLE(titulo VARCHAR, coste_album NUMERIC) AS $$
    BEGIN
        RETURN QUERY
        SELECT a.titulo, e.coste_album
        FROM Album a
        JOIN Estudio_Banda e ON a.album_id = e.album_id
        ORDER BY e.coste_album DESC
        LIMIT 5;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION reproducciones_totales_albumes()
    RETURNS TABLE(titulo VARCHAR, reproducciones NUMERIC) AS $$
    BEGIN
        RETURN QUERY
        SELECT a.titulo, SUM(c.reproducciones) AS reproducciones
        FROM Album a
        JOIN Cancion c ON c.album_id = a.album_id
        GROUP BY a.titulo;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION total_reproducciones_y_recaudacion()
    RETURNS TABLE(total_reproducciones NUMERIC, total_recaudacion NUMERIC) AS $$
    BEGIN
        RETURN QUERY
        SELECT SUM(c.reproducciones) AS total_reproducciones, SUM(cb.recaudacion) AS total_recaudacion
        FROM Cancion c
        JOIN Cancion_Banda cb ON c.cancion_id = cb.cancion_id
        WHERE cb.banda_id = 1;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION getAlbum(p_id INT)
    RETURNS TABLE(cancion_id INT, titulo VARCHAR, album_id INT, banda_id INT, reproducciones NUMERIC) AS $$
    BEGIN
        RETURN QUERY
        SELECT c.* FROM cancion c
        JOIN album a ON c.album_id=a.album_id
        WHERE c.album_id= p_id
        ORDER BY c.cancion_id DESC;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION producedalbum(p_id INT)
    RETURNS TABLE(nombre VARCHAR, album_id INT, pago NUMERIC) AS $$
    BEGIN
        RETURN QUERY
        SELECT t.nombre, ta.album_id, ta.pago AS albumpago
        FROM tecnico t
        JOIN tecnico_album ta ON t.tecnico_id = ta.tecnico_id
        WHERE t.tecnico_id = p_id;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION produced(p_id INT)
    RETURNS TABLE(nombre VARCHAR, concierto_id INT, sueldo NUMERIC) AS $$
    BEGIN
        RETURN QUERY
        SELECT t.nombre, tc.concierto_id, tc.sueldo AS conciertopago
        FROM tecnico t
        JOIN tecnico_concierto tc ON t.tecnico_id = tc.tecnico_id
        WHERE t.tecnico_id = p_id;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE addMember(
  nombre_m VARCHAR(50),
  rol VARCHAR(15),
  sueldo NUMERIC
  )
  LANGUAGE plpgsql
  AS $$
  DECLARE 
	  date DATE;
	  m_id INT;
    BEGIN
    INSERT INTO miembro values(DEFAULT, nombre_m, rol);
	SELECT miembro_id INTO m_id FROM miembro m WHERE m.nombre = nombre_m;
	INSERT INTO miembro_banda values(1, m_id, sueldo , '1970-01-01');
  END$$;

CREATE OR REPLACE PROCEDURE deleteMember(
  id_miembro INT
  )
  LANGUAGE plpgsql
  AS $$
    BEGIN
    DELETE FROM miembro_banda WHERE miembro_id = id_miembro;
	DELETE FROM miembro WHERE miembro_id = id_miembro;
  END$$;

CREATE OR REPLACE PROCEDURE addAlbum(
  title VARCHAR(15),
  tecnico_id INT,
  pago NUMERIC,
  coste_album NUMERIC
  )
  LANGUAGE plpgsql
  AS $$
 	DECLARE
  	fecha_actual DATE := CURRENT_DATE;
	id_album INT;
    BEGIN
	INSERT INTO album values(DEFAULT, title, fecha_actual);
	SELECT album_id INTO id_album FROM album a WHERE a.titulo = title;
    INSERT INTO tecnico_album values(tecnico_id, id_album, pago);
	INSERT INTO estudio_banda values(1, 1, id_album,coste_album);
  END$$;

CREATE OR REPLACE PROCEDURE deleteAlbum(
  id_album INT
  )
  LANGUAGE plpgsql
  AS $$
 	DECLARE
  	fecha_actual DATE := CURRENT_DATE;
    BEGIN
	DELETE FROM estudio_banda WHERE album_id = id_album;
	DELETE FROM tecnico_album WHERE album_id = id_album;
    DELETE FROM cancion WHERE album_id = id_album;
	DELETE FROM album WHERE album_id = id_album;
  END$$;

CREATE OR REPLACE PROCEDURE addSong(
  title VARCHAR(15),
  id_album INT
  )
  LANGUAGE plpgsql
  AS $$
 	DECLARE
	s_id INT;
    BEGIN
	INSERT INTO cancion values(default, title, id_album, 1, 0);
	SELECT cancion_id INTO s_id FROM cancion WHERE titulo=title;
	INSERT INTO cancion_banda values(s_id, 1, 0);
  END$$;

CREATE OR REPLACE PROCEDURE deleteSong(
  id_cancion INT
  )
  LANGUAGE plpgsql
  AS $$
    BEGIN
	DELETE FROM cancion_banda WHERE cancion_id = id_cancion;
	DELETE FROM cancion WHERE cancion_id = id_cancion;
  END$$;

CREATE OR REPLACE PROCEDURE addConcert(
  cLugar VARCHAR(50),
  cFecha DATE,
  cAsistencia NUMERIC,
  cRecaudacion NUMERIC,
  cCoste NUMERIC,
  tId INT,
  tSueldo NUMERIC
  )
  LANGUAGE plpgsql
  AS $$
  	DECLARE
	c_id INT;
    BEGIN
	INSERT INTO concierto values(default, cLugar, cFecha, cAsistencia);
	SELECT concierto_id INTO c_id FROM concierto where fecha = cFecha;
	INSERT INTO concierto_banda values(c_id, 1, cCoste, cRecaudacion);
	INSERT INTO tecnico_concierto values(tId, c_id, tSueldo);
  END$$;