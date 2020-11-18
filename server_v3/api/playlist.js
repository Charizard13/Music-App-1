const { Router } = require("express");

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
  const { body } = await client.search({
    index: "playlist",
  });
  res.json(body.hits.hits.map((playlist) => playlist._source));
});

router.get("/top_playlists", async (req, res) => {
  const { body } = await client.search({
    index: "playlist",
    size: 20,
  });
  res.json(body.hits.hits.map((playlist) => playlist._source));
});

router.get("/:id/songs", async (req, res) => {
  const { body } = await client.search({
    index: "playlists_songs",
    body: {
      query: {
        match: { id: req.params.id },
      },
    },
    group: {
      index: "song",
    },
  });
  res.json(body);
});

router.get("/:id", async (req, res) => {
  const { body } = await client.search({
    index: "playlist",
    body: {
      query: {
        match: { id: req.params.id },
      },
    },
  });
  res.json(body.hits.hits.map((playlist) => playlist._source));
});

router.post("/", async (req, res) => {
  try {
    await client.index({
      index: "playlist",
      id: req.body.id,
      body: req.body,
    });
    res.send(`playlist  ${req.body.name} added successfully`);
  } catch (error) {
    res.send(
      `error ${error} has occurred, playlist ${req.body.name} was not added`
    );
  }
});

router.patch("/:id", async (req, res) => {
  const playlist = await playlist.findByPk(req.params.id);
  await playlist.update(req.body);
  res.json(playlist);
});

router.delete("/:playlistId", async (req, res) => {
  try {
    await client.delete({
      index: "playlist",
      body: {
        query: {
          match: { id: req.params.playlistId },
        },
      },
    });
    res.send("playlist deleted successfully");
  } catch (error) {
    res.send(`${error.message} has occurred, playlist was not deleted`);
  }
});

router.get("/:id", async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.id);

  const duration = await playlist.getDuration();
  res.json({ ...playlist.get(), duration });
});

module.exports = router;
