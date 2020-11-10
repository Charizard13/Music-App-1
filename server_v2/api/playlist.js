
const { Router } = require('express');
const { Playlist } = require('../models');
const { Playlists_songs } = require('../models');
const { Album} = require('../models');
const { Artist } = require('../models');
const { Song } = require('../models');




const router = Router();

router.get('/', async (req, res) => {
  const allPlaylists = await Playlist.findAll({
  });
  res.json(allPlaylists)
});

router.get('/top_playlists', async (req, res) => {
  const allPlaylists = await Playlist.findAll({
    limit:20
  });
  res.json(allPlaylists)
})

router.get("/:id/songs", async (req, res) => {
  const songs = await Playlists_songs.findAll({
    where: { playlistId: [req.params.id] },
    include: [
      {
        model: Song,
        attributes: ["name", "youtube_link", "createdAt", "updatedAt"],
        include: [{ model: Artist, attributes: ["name", "id"] }, { model: Album, attributes: ["name", "id"] }]
      },
    ],
  }); 
  return res.json(songs);
});


router.get('/:id', async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.id);

res.json(playlist)
});

router.post('/', async (req, res) => {
  const newPlaylist = await playlist.create(req.body);
  res.json(newPlaylist)
})


router.patch('/:id', async (req, res) => {
  const playlist = await playlist.findByPk(req.params.id);
  await playlist.update(req.body);
  res.json(playlist)
})

router.delete('/:playlistId', async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.id);
  await playlist.destroy();
  res.json({ deleted: true })
})


router.get('/:id', async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.id);


  const duration = await playlist.getDuration();
  res.json({ ...playlist.get(), duration })
});



module.exports = router;