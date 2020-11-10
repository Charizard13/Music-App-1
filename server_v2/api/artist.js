  
const { Router } = require('express');
const { Artist } = require('../models');
const { Album } = require('../models');
const { Song } = require('../models');
const verify = require('./verifyToken')



const router = Router();

router.get('/', async (req, res) => {
  const allArtists = await Artist.findAll();
  res.json(allArtists)
})

router.get('/top_artists', async (req, res) => {
  const allArtists = await Artist.findAll({
    limit:20
  });
  res.json(allArtists)
})


router.get("/:id/songs", async (req, res) => {
  const songs = await Song.findAll({where: {artistId: req.params.id}, 
    include:[{model: Album, attributes: ['name']}]})
      return res.json(songs);
    });

    router.get('/last', async (req, res) => {
      const artist = await Artist.findAll({
        order: [['id', 'DESC']],
        limit: 1,
        attributes: ['id']
      });
    
    res.json(artist)
    });

router.get('/:id', async (req, res) => {
  const artist = await Artist.findByPk(req.params.id);

res.json(artist)
});


router.post('/', async (req, res) => {
console.log(req.body)
  const artist = await Artist.findOne({ where: { name: req.body.name}})
   if (artist) return res.status(403).send({ success: false, message: 'Artist already exists' })


  try{
    const newArtist = await Artist.create(req.body);
    res.json(newArtist)
  } catch(err){
    res.json(err)
  }
 
})


router.patch('/:artistId', async (req, res) => {
  const artist = await Artist.findByPk(req.params.artistId);
  await artist.update(req.body);
  res.json(artist)
})

router.delete('/:artistId',verify,  async (req, res) => {
  const artist = await Artist.findByPk(req.params.artistId);
  await artist.destroy();
  res.json({ deleted: true })
})

module.exports = router;