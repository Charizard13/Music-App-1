const { Router } = require("express");

const verify = require("./verifyToken");

const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  cloud: {
    id:
      "Spotify:ZWFzdHVzMi5henVyZS5lbGFzdGljLWNsb3VkLmNvbTo5MjQzJDM0NDk4ZTc5OTY5NzQ4NGU4NzlkZDBmMWRkMWIwODViJGUzNmYzNjdmODRmNjRkZWE5MmIwYmQ2YWE4Nzc5NzEz",
  },
  auth: {
    username: "elastic",
    password: "iEqJKUhJRm4zntc3XG7ucL2I",
  },
});

const router = Router();

router.get("/", async (req, res) => {
  const { allAlbums } = await client.search({
    index: "albums",
  });
  res.json(allAlbums.hits.hits.map((album) => album._source));
});

router.get("/top_albums", async (req, res) => {
  const { topAlbums } = await client.search({
    index: "album",
    body: { sort: [{ size: 20 }] },
  });
  res.json(topAlbums.hits.hits.map((album) => album._source));
});

router.get("/:id", async (req, res) => {});

router.get("/:id/songs", async (req, res) => {});

router.post("/", async (req, res) => {
  try {
    const { newAlbum } = await client.index({
      index: "album",
      id: req.body.artistId,
      body: {
        name: req.body.name,
        youtube_link: req.body.link,
        id: req.body.Id,
        artistId: 4
      },
    });
    res.json(newAlbum.hits.hits, "test");
  } catch (err) {
    res.json(err);
  }
});

router.patch("/:id", async (req, res) => {});

router.delete("/:id", async (req, res) => {
  try {
    const { deleteAlbum } = await client.delete({
      index: "albums",
      body: { query: { id: req.body.artistId } },
    });
    res.json(`Album : ${deleteAlbum.hits.hits.id} has been deleted successfully`);

  } catch (err) {
    res.json(err, 'There was an error deleting album');
  }

});

router.get("/:id", async (req, res) => {
  const duration = await album.getDuration();
});

router.get("/search/:name", async (req, res) => {});

module.exports = router;
