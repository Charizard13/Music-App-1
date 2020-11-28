const { song, Artist, Song, Playlist } = require("../models");
const create_new = async (req, res) => {
  switch (req.baseUrl) {
    case "/api/albums":
      const album = await Album.findOne({ where: { name: req.body.name } });
      if (album)
        return res
          .status(403)
          .send({ success: false, message: "Album already exists" });

      try {
        const newAlbum = await Album.create(req.body);
        res.json(newAlbum);
      } catch (err) {
        res.status(404).send("There was an error-", err.message);
      }

      break;
    case "/api/songs":
      const song = await Song.findOne({ where: { name: req.body.name } });
      if (song)
        return res
          .status(403)
          .send({ success: false, message: "Song already exists" });

      try {
        const newSong = await Song.create(req.body);
        res.json(newSong);
      } catch (err) {
        res.status(404).send("There was an error-", err.message);
      }
      break;
    case "/api/playlists":
      const playlist = await Playlist.findOne({
        where: { name: req.body.name },
      });
      if (playlist)
        return res
          .status(403)
          .send({ success: false, message: "Playlist already exists" });

      try {
        const newPlaylist = await Playlist.create(req.body);
        res.json(newPlaylist);
      } catch (err) {
        res.status(404).send("There was an error-", err.message);
      }
      break;
    case "/api/artists":
      const artist = await Artist.findOne({ where: { name: req.body.name } });
      if (artist)
        return res
          .status(403)
          .send({ success: false, message: "Artist already exists" });

      try {
        const newArtist = await Artist.create(req.body);
        res.json(newArtist);
      } catch (err) {
        res.json(err);
      }
      break;
    default:
  }
};
module.exports = { create_new };
