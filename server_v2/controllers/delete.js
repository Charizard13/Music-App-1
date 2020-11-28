const { Album, Artist, Song, Playlist } = require("../models");
const delete_by_id = async (req, res) => {
  switch (req.baseUrl) {
    case "/api/albums/:id":
      try {
        const album = await Album.findByPk(req.params.id);
        await album.destroy();
        res.json({
          deleted: true,
          message: `Album - ${album.name} has been deleted successfully`,
        });
      } catch (err) {
        res.status(404).send("There was an error-", err.message);
      }
      break;
    case "/api/songs/:id":
      try {
        const song = await Song.findByPk(req.params.id);
        await song.destroy();
        res.json({
          deleted: true,
          message: `Song - ${song.name} has been deleted successfully`,
        });
      } catch (err) {
        res.status(404).send("There was an error-", err.message);
      }
      break;
    case "/api/playlists/:id":
      try {
        const playlist = await Playlist.findByPk(req.params.id);
        await playlist.destroy();
        res.json({
          deleted: true,
          message: `Playlist - ${playlist.name} has been deleted successfully`,
        });
      } catch (err) {
        res.status(404).send("There was an error-", err.message);
      }
      break;
    case "/api/artists/:id":
      try {
        const artist = await Artist.findByPk(req.params.id);
        await artist.destroy();
        res.json({
          deleted: true,
          message: `Artist - ${artist.name} has been deleted successfully`,
        });
      } catch (err) {
        res.status(404).send("There was an error-", err.message);
      }
      break;
    default:
  }
};

module.exports = { delete_by_id };
