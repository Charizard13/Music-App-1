require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.json());

//create connection //

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  multipleStatements: true,
});

//connect //

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("mysql connected...");
});

//create db //

app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysqll";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("database created...");
  });
});

// All XXXXX pages //

app.get("/artists", (req, res) => {
  db.query(`SELECT * FROM artists`, (error, results) => {
    if (error) {
      res.send(err.message);
    }
    res.send(results);
  });
});

app.get("/albums", (req, res) => {
  db.query(`SELECT * FROM albums`, (error, results) => {
    if (error) {
      res.send(err.message);
    }
    res.send(results);
  });
});

app.get("/songs", (req, res) => {
  db.query(`SELECT * FROM songs`, (error, results) => {
    if (error) {
      res.send(err.message);
    }
    res.send(results);
  });
});

app.get("/playlists", (req, res) => {
  db.query(`SELECT * FROM playlists`, (error, results) => {
    if (error) {
      res.send(err.message);
    }
    res.send(results);
  });
});

// Top XXXXX pages //

app.get("/top_songs", (req, res) => {
  db.query("SELECT * FROM songs limit 20", (error, results, fields) => {
    if (error) {
      res.send(err.message);
    }
    res.send(results);
  });
});

app.get("/top_artists", (req, res) => {
  db.query("SELECT * FROM artists limit 20", (error, results, fields) => {
    if (error) {
      res.send(err.message);
    }
    res.send(results);
  });
});

app.get("/top_albums", (req, res) => {
  db.query("SELECT * FROM albums limit 20", (error, results, fields) => {
    if (error) {
      res.send(err.message);
    }
    res.send(results);
  });
});

app.get("/top_playlists", (req, res) => {
  db.query("SELECT * FROM playlists limit 20", (error, results, fields) => {
    if (error) {
      res.send(err.message);
    }
    res.send(results);
  });
});

// One Song page //

app.get("/song/:id", async (req, res) => {
  const id = req.params.id;
  db.query(
    `SELECT * FROM songs WHERE song_id = ?`,
    [id],
    (error, results, fields) => {
      if (error) {
        res.send(error.message);
      }
      res.send(results);
    }
  );
});

app.get("/song/artist_related/:id", async (req, res) => {
  const id = req.params.id;
  db.query(
    `SELECT * FROM songs
    join artists
    on songs.artist_id = artists.artist_id
    where songs.artist_id = ?`,
    [id],
    (error, results, fields) => {
      if (error) {
        res.send(error.message);
      }
      res.send(results);
    }
  );
});

app.get("/song/album_related/:id", async (req, res) => {
  const id = req.params.id;
  db.query(
    `SELECT * FROM songs
    join albums
    on songs.album_id = albums.album_id
    where songs.album_id = ?`,
    [id],
    (error, results, fields) => {
      if (error) {
        res.send(error.message);
      }
      res.send(results);
    }
  );
});

app.get("/song/playlist_related/:id", async (req, res) => { 
  const id = req.params.id;
  db.query(
    `SELECT distinct songs.*, artists.artist_name, albums.album_name
    FROM songs 
    JOIN playlists_songs ON playlists_songs.song_id=songs.song_id 
    JOIN albums ON albums.album_id = songs.album_id
    JOIN artists ON artists.artist_id = songs.artist_id
    JOIN playlists 
    WHERE playlists_songs.playlist_id= ?`,
    [id],
    (error, results, fields) => {
      if (error) {
        res.send(error.message);
      }
      res.send(results);
    }
  );
});

// One Artist page //

app.get("/artist/songs/:id", async (req, res) => {
  const id = req.params.id;
  db.query(
    `SELECT distinct songs.*, albums.album_name FROM songs
    join  albums
    on songs.album_id = albums.album_id
   where songs.artist_id = ?`,
    [id],
    (error, results, fields) => {
      if (error) {
        res.send(error.message);
      }
      res.send(results);
    }
  );
});

app.get("/artist/:id", async (req, res) => {
  const id = req.params.id;
  db.query(
    `SELECT * FROM artists 
    where artist_id = ?`,
    [id],
    (error, results, fields) => {
      if (error) {
        res.send(error.message);
      }
      res.send(results);
    }
  );
});

// One Album page //

app.get("/album/songs/:id", async (req, res) => {
  const id = req.params.id;
  db.query(
    `SELECT distinct songs.*, artists.artist_name FROM songs
    join  artists
    on songs.artist_id = artists.artist_id
   where songs.album_id = ?`,
    [id],
    (error, results, fields) => {
      if (error) {
        res.send(error.message);
      }
      res.send(results);
    }
  );
});

app.get("/album/:id", async (req, res) => {
  const id = req.params.id;
  db.query(
    `SELECT * FROM albums WHERE album_id = ?`,
    [id],
    (error, results, fields) => {
      if (error) {
        res.send(error.message);
      }
      res.send(results);
    }
  );
});

// One Playlist page //

app.get("/playlist/songs/:id", async (req, res) => {
  const id = req.params.id;
  db.query(
    `SELECT songs.*, albums.album_name,  artists.artist_name
    FROM playlists
    JOIN playlists_songs ON playlists_songs.playlist_id = playlists.playlist_id
    JOIN songs ON songs.song_id = playlists_songs.song_id
    JOIN albums ON albums.album_id = songs.album_id
    JOIN artists ON artists.artist_id = songs.artist_id
    WHERE playlists.playlist_id = ?;
    `,
    [id],
    (error, results, fields) => {
      if (error) {
        res.send(error.message);
      }
      res.send(results);
    }
  );
});

app.get("/playlist/:id", async (req, res) => {
  const id = req.params.id;
  db.query(
    `SELECT * FROM playlists WHERE playlist_id = ?`,
    [id],
    (error, results, fields) => {
      if (error) {
        res.send(error.message);
      }
      res.send(results);
    }
  );
});

// All Post Requests //

app.post("/song", async (req, res) => {
  let tableName = req.params.table_name;
  let newRow = req.body;
  db.query(`INSERT INTO ${tableName}s SET ? `, [newRow], (err, result) => {
    if (err) throw err;
    res.send(`${newRow.name} - has been posted to your ${tableName}s`);
  });
});

app.post("/album", async (req, res) => {
  let newAlbum = req.body;
  db.query(`INSERT INTO album SET ? `, [newAlbum], (err, result) => {
    if (err) throw err;
    res.send(`Posted  to your songs`);
  });
});

app.post("/playlist", async (req, res) => {
  let newPlayList = req.body;
  db.query(`INSERT INTO playlist SET ? `, [newPlayList], (err, result) => {
    if (err) throw err;
    res.send(`Posted  to your songs`);
  });
});

app.post("/artist", async (req, res) => {
  let newArtist = req.body;
  db.query(`INSERT INTO artists SET ? `, [newArtist], (err, result) => {
    if (err) throw err;
    res.send(`Posted  to your songs`);
  });
});

//  All Update Requests //

app.put("/artist/:id", async (req, res) => {
  const id = req.params.id;
  const updatedArtist = req.body;
  db.query(
    `UPDATE artists SET ? WHERE artist_id = ? `,
    [updatedArtist, id],
    (err, result) => {
      if (err) throw err;
      res.send(`${updatedRow.name} - has been updated to your songs`);
    }
  );
});

app.put("/playlist/:id", async (req, res) => {
  const id = req.params.id;
  const updatedArtist = req.body;
  db.query(
    `UPDATE artists SET ? WHERE artist_id = ? `,
    [updatedArtist, id],
    (err, result) => {
      if (err) throw err;
      res.send(`${updatedRow.name} - has been updated to your songs`);
    }
  );
});

app.put("/album/:id", async (req, res) => {
  const id = req.params.id;
  const updatedAlbum = req.body;
  db.query(
    `UPDATE album SET ? WHERE album_id = ? `,
    [updatedAlbum, id],
    (err, result) => {
      if (err) throw err;
      res.send(`${updatedRow.name} - has been updated to your songs`);
    }
  );
});

app.put("/song/:id", async (req, res) => {
  const id = req.params.id;
  const updatedRow = req.body;
  db.query(
    `UPDATE songs SET ? WHERE song_id = ? `,
    [updatedRow, id],
    (err, result) => {
      if (err) throw err;
      res.send(`${updatedRow.name} - has been updated to your songs`);
    }
  );
});

//  All Delete Requests //

app.delete("/artist/:id", async (req, res) => {
  const id = req.params.id;
  db.query(
    `DELETE FROM artists WHERE artist_id = ?`,
    [id],
    (error, results) => {
      if (error) {
        res.send(error.message);
      }
      res.send(results);
    }
  );
});

app.delete("/album/:id", async (req, res) => {
  const id = req.params.id;
  db.query(`DELETE FROM albums WHERE album_id = ?`, [id], (error, results) => {
    if (error) {
      res.send(error.message);
    }
    res.send(results);
  });
});

app.delete("/song/:id", async (req, res) => {
  const id = req.params.id;
  db.query(`DELETE FROM songs WHERE song_id = ?`, [id], (error, results) => {
    if (error) {
      res.send(error.message);
    }
    res.send(results);
  });
});

app.delete("/playlist/:id", async (req, res) => {
  const id = req.params.id;
  db.query(
    `DELETE FROM playlists WHERE playlist_id = ?`,
    [id],
    (error, results) => {
      if (error) {
        res.send(error.message);
      }
      res.send(results);
    }
  );
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
