const { Album, Artist, Song, Playlist } = require("../models");

/////////////// All tracks ///////////////////
const get_all = async (req, res) => {
  switch (req.baseUrl) {
    case "/api/albums":
      try {
        const allAlbums = await Album.findAll({});
        res.json(allAlbums);
      } catch (err) {
        res.status(404).send("There was an error-", err.message);
      }
      break;
    case "/api/songs":
      try {
        const allSongs = await Song.findAll({});
        res.json(allSongs);
      } catch (err) {
        res.status(404).send("There was an error-", err.message);
      }
      break;
    case "/api/playlists":
      try {
        const allPlaylists = await Playlist.findAll({});
        res.json(allPlaylists);
      } catch (err) {
        res.status(404).send("There was an error-", err.message);
      }
      break;
    case "/api/artists":
      try {
        const allArtists = await Artist.findAll({});
        res.json(allArtists);
      } catch (err) {
        res.status(404).send("There was an error-", err.message);
      }
      break;
    default:
  }
};
///////////////////// Top 20 tracks ///////////////////////

const top_20 = async (req, res) => {
  switch (req.baseUrl) {
    case "/api/albums/top_songs":
      try {
        const allAlbums = await Album.findAll({
          limit: 20,
        });
        res.json(allAlbums);
      } catch (err) {
        res.status(404).send("There was an error-", err.message);
      }
      break;
    case "/api/songs/top_songs":
      try {
        const allSongs = await Song.findAll({
          limit: 20,
        });
        res.json(allSongs);
      } catch (err) {
        res.status(404).send("There was an error-", err.message);
      }
      break;
    case "/api/playlists/top_songs":
      try {
        const allPlaylists = await Playlist.findAll({
          limit: 20,
        });
        res.json(allPlaylists);
      } catch (err) {
        res.status(404).send("There was an error-", err.message);
      }
      break;
    case "/api/artists/top_songs":
      try {
        const allArtists = await Artist.findAll({
          limit: 20,
        });
        res.json(allArtists);
      } catch (err) {
        res.status(404).send("There was an error-", err.message);
      }
      break;
    default:
  }
};
///////////////////// One by Id ///////////////////////
const find_one_by_id = async (req, res) => {
  switch (req.baseUrl) {
    case "/api/albums/:id":
      try {
        const oneAlbum = await Song.findByPk(req.params.id);
        res.json(oneAlbum);
      } catch (err) {
        res.status(404).send("There was an error-", err.message);
      }
      break;
    case "/api/songs/:id":
      try {
        const oneSong = await Song.findByPk(req.params.id);
        res.json(oneSong);
      } catch (err) {
        res.status(404).send("There was an error-", err.message);
      }
      break;
    case "/api/playlists/:id":
      try {
        const onePlaylist = await Song.findByPk(req.params.id);
        res.json(onePlaylist);
      } catch (err) {
        res.status(404).send("There was an error-", err.message);
      }
      break;
    case "/api/artists/:id":
      try {
        const oneArtist = await Song.findByPk(req.params.id);
        res.json(oneArtist);
      } catch (err) {
        res.status(404).send("There was an error-", err.message);
      }
      break;
    default:
  }
};

module.exports = {
  get_all,
  top_20,
  find_one_by_id,
};
