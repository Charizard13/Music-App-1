const { Router } = require("express");
const { Song } = require("../models");
const { Artist } = require("../models");
const { Album } = require("../models");
const { Playlist } = require("../models");
const { Playlists_songs } = require("../models");
const verifyToken = require("./verifyToken");

const router = Router();

router.get("/", async (req, res) => {
  const allSongs = await Song.findAll();
  res.json(allSongs);
});

router.get("/top_songs", async (req, res) => {
  const allSongs = await Song.findAll({
    limit: 20,
  });
  res.json(allSongs);
});

router.get("/artist_related/:id", async (req, res) => {
  const song = await Song.findByPk(req.params.id);
  const songs = await Song.findAll({
    where: { artistId: song.artistId },
    include: [{ model: Artist, attributes: ["name"] }],
  });
  return res.json(songs);
});

router.get("/album_related/:id", async (req, res) => {
  const song = await Song.findByPk(req.params.id);
  const songs = await Song.findAll({
    where: { albumId: song.albumId },
    include: [{ model: Album, attributes: ["name"] }],
  });
  return res.json(songs);
});

router.get("/playlist_related/:id", async (req, res) => {
  const song = await Playlists_songs.findOne({
    where: { songId: [req.params.id] },
  });
  const songs = await Playlists_songs.findAll({
    where: { playlistId: [song.playlistId] },
    include: [
      {
        model: Song,
        attributes: ["name", "youtubeLink", "createdAt", "updatedAt"],
        include: [{ model: Artist, attributes: ["name"] }, { model: Album, attributes: ["name"] }]
      },
    ],
  }); 
  return res.json(songs);
});

router.get("/:id",verifyToken, async (req, res) => {
  const song = await Song.findByPk(req.params.id);

  res.json(song);
});

module.exports = router;
