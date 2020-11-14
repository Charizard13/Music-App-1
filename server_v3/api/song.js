const { Router } = require("express");

const verifyToken = require("./verifyToken");
const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  cloud: {
    id: "Spotify:ZWFzdHVzMi5henVyZS5lbGFzdGljLWNsb3VkLmNvbTo5MjQzJDM0NDk4ZTc5OTY5NzQ4NGU4NzlkZDBmMWRkMWIwODViJGUzNmYzNjdmODRmNjRkZWE5MmIwYmQ2YWE4Nzc5NzEz",
  },
  auth: {
    username:  "elastic",
    password:  "iEqJKUhJRm4zntc3XG7ucL2I",
  },
});


const router = Router();



router.get("/songs", async (req, res) => {
  try {
    // const { body: count1 } = await client.count({ index: "music_app2" });
    // console.log(("hibro", count1));
    const allSongs = await Song.findAll({
      include: [
        {
          model: Artist,
          attributes: ["name"],
        },
        {
          model: Album,
          attributes: ["name"],
        },
      ],
    });
    const body = allSongs.flatMap((doc) => [
      { index: { _index: "songs" } },
      doc,
    ]);
    const { body: bulkResponse } = await client.bulk({ refresh: true, body });
    if (bulkResponse.errors) {
      return res.json(bulkResponse.errors);
    }
    const { body: count } = await client.count({ index: "songs" });
    res.send(count);
  } catch (e) {
    res.json({ error: e.message });
  }
});


router.get("/", async (req, res) => {
  const { body } = await client.search({
    index: 'playlist',
   
})
  res.json(body.hits.hits);
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
    include: [{ model: Artist, attributes: ["name"], model: Album, attributes: ["name"] }],
  });
  return res.json(songs);
});

router.get("/album_related/:id", async (req, res) => {
  const song = await Song.findByPk(req.params.id);
  const songs = await Song.findAll({
    where: { albumId: song.albumId },
    include: [{ model: Album, attributes: ["name"], model: Artist, attributes: ["name"]}],
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

router.get("/:id", async (req, res) => {
  const song = await Song.findByPk(req.params.id, {
    where: { artistId: song.artistId },
    include: [{ model: Album, attributes: ["name"], model: Artist, attributes: ["name"]}]
  });
  res.json(song);
});

router.get("/songs", async (req, res) => {
  try {
    const { body: count1 } = await client.count({ index: "spotify" });
    console.log(("hibro", count1));
    const allSongs = await Song.findAll({
      include: [
        {
          model: Artist,
          attributes: ["name"],
        },
        {
          model: Album,
          attributes: ["name"],
        },
      ],
    });
    const body = allSongs.flatMap((doc) => [
      { index: { _index: "spotify" } },
      doc,
    ]);
    const { body: bulkResponse } = await client.bulk({ refresh: true, body });
    if (bulkResponse.errors) {
      return res.json(bulkResponse.errors);
    }
    const { body: count } = await client.count({ index: "spotify" });
    res.send(count);
  } catch (e) {
    res.json({ error: e.message });
  }
});

module.exports = router;
