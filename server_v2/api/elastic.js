const { Router } = require("express");

const router = Router();
const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  cloud: {
    id:
      process.env.ELASTIC_ID,
  },
  auth: {
    username: process.env.ELASTIC_AUTH_USER_NAME,
    password: process.env.ELASTIC_AUTH_PASSWORD,
  },
});


// *************All******************//
router.get("/all/:name", async (req, res) => {
  let search = req.params.name
  search = search.slice(1)

  const { body } = await client.search({
    index: ["playlist","artists", "songs", "albums"],
    body: {
      query: {
        wildcard: { name: `*${search}*` },
      },
    },
  });
  res.json(body.hits.hits.map((all) => all._source));
});


// ***********playlists*************//


router.get("/playlists", async (req, res) => {
  const { body } = await client.search({
    index: "playlist",
  });
  res.json(body.hits.hits.map((playlist) => playlist._source));
});

router.get("/top_3_playlists", async (req, res) => {
  const { body } = await client.search({
    index: "playlist",
    size: 3,
    from: 0
  });
  res.json(body.hits.hits.map((playlist) => playlist._source));
});

router.get("/playlists/:name", async (req, res) => {
  let search = req.params.name
  search = search.slice(1)

  if(search.length > 0) {
    const { body } = await client.search({
      index: "playlist",
      body: {
        query: {
          wildcard: { name: `*${search}*` },
        },
      },
    });
    res.json(body.hits.hits.map((playlist) => playlist._source));
  }
});

// // ***********albums*************//
router.get("/albums", async (req, res) => {
  const { body } = await client.search({
    index: "albums",
  });
  res.json(body.hits.hits.map((album) => album._source));
});

router.get("/top_3_albums", async (req, res) => {
  const { body } = await client.search({
    index: "albums",
    size: 3,
    from: 0,
  });
  res.json(body.hits.hits.map((album) => album._source));
});

router.get("/albums/:name", async (req, res) => {
  let search = req.params.name
  search = search.slice(1)

  const { body } = await client.search({
    index: "albums",
    body: {
      query: {
        wildcard: { name: `*${search}*` },
      },
    },
  });
  res.json(body.hits.hits.map((album) => album._source));
});

//   // ***********songs*************//

router.get("/top_3_songs", async (req, res) => {
  const { body } = await client.search({
    index: "songs",
    size: 3,
    from: 0,
  });
  res.json(body.hits.hits.map((song) => song._source));
});

router.get("/songs", async (req, res) => {
  const { body } = await client.search({
    index: "songs",
  });
  res.json(body.hits.hits.map((song) => song._source));
});

router.get("/songs/:name", async (req, res) => {
  let search = req.params.name
  search = search.slice(1)

  const { body } = await client.search({
    index: "songs",
    body: {
      query: {
        wildcard: { name: `*${search}*` },
      },
    },
  });
  res.json(body.hits.hits.map((song) => song._source));
});

// ***********artists*************//

router.get("/top_3_artists", async (req, res) => {
  const { body } = await client.search({
    index: "artists",
    size: 3,
    from: 0,
  });
  res.json(body.hits.hits.map((artist) => artist._source));
});

router.get("/artists", async (req, res) => {
  const { body } = await client.search({
    index: "artists",
  });
  res.json(body.hits.hits.map((artist) => artist._source));
});

router.get("/artists/:name", async (req, res) => {
  let search = req.params.name
  search = search.slice(1)

  const { body } = await client.search({
    index: "artists",
    body: {
      query: {
        wildcard: { name: `*${search}*` },
      },
    },
  });
  res.json(body.hits.hits.map((artist) => artist._source));
});

module.exports = router;
