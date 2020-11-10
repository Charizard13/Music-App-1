
const { Router } = require('express');
const { Album } = require('../models');
const { Artist } = require('../models');
const { Song } = require('../models');
const verify = require('./verifyToken')



const router = Router();

router.get('/', async (req, res) => {
  const allAlbums = await Album.findAll({
  });
  res.json(allAlbums)
});

router.get('/search/:name', async (req, res) => {
  const searched = await Album.findAll({ where: {name: req.params.name}
  });
  res.json(searched)
});

router.get('/top_albums', async (req, res) => {
  const allAlbums = await Album.findAll({
    limit:20
  });
  res.json(allAlbums)
})



router.get('/:id', async (req, res) => {
  const album = await Album.findByPk(req.params.id);

res.json(album)
});


router.get("/:id/songs", async (req, res) => {
  const songs = await Song.findAll({where: {albumId: req.params.id}, 
  include:[{model: Artist, attributes: ['name']}]})
  return res.json(songs);
    });


    router.post('/',verify,  async (req, res) => {
      try{
        const newAlbum = await Album.create(req.body);
        res.json(newAlbum)
      } catch(err){
        res.json(err);
      }
      
    })
    
    
    router.patch('/:id', async (req, res) => {
      const album = await Album.findByPk(req.params.id);
      await album.update(req.body);
      res.json(album)
    })
    
    router.delete('/:id', async (req, res) => {
      const album = await Album.findByPk(req.params.id);
      await album.destroy();
      res.json({ deleted: true })
    })


router.get('/:id', async (req, res) => {
  const album = await Album.findByPk(req.params.id);


  const duration = await album.getDuration();
  res.json({ ...album.get(), duration })
});



module.exports = router;