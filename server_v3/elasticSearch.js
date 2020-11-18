const { Album } = require("../server_v2/models");
const { Artist } = require("../server_v2/models");
const { Song } = require("../server_v2/models");
const { Playlist } = require("../server_v2/models");

require('dotenv').config()

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
// async function uploads() {
//   router.get("/upload", async (req, res) => {
//     try {
//       //*************** All Albums ***************//
//       const allAlbums = await Album.findAll({
//         include: [{ model: Artist, attributes: ["name"] }],
//       });
//       const bodyAlbums = allAlbums.flatMap((doc) => [
//         { index: { _index: "songs" } },
//         doc,
//       ]);
//       const { bodyAlbums: bulkResponseArtists } = await client.bulk({
//         refresh: true,
//         bodyAlbums,
//       });
//       if (bulkResponseArtists.errors) {
//         return res.json(bulkResponseArtists.errors);
//       }
//       const { bodyAlbums: countAlbums } = await client.count({ index: "albums" });
//       res.send(countAlbums);

//       //*************** All Artists ***************//
//       const allArtists = await Artist.findAll({
//         include: [{ model: Album, attributes: ["name"] }],
//       });

//       const bodyArtists = allArtists.flatMap((doc) => [
//         { index: { _index: "artists" } },
//         doc,
//       ]);
//       const { bodyArtists: bulkResponseAlbums } = await client.bulk({
//         refresh: true,
//         bodyArtists,
//       });
//       if (bulkResponseAlbums.errors) {
//         return res.json(bulkResponseAlbums.errors);
//       }
//       const { bodyArtists: countArtists } = await client.count({ index: "artists" });
//       res.send(countArtists);

//       //*************** All Songs ***************//

//       const allSongs = await Song.findAll({
//         include: [
//           {
//             model: Artist,
//             attributes: ["name"],
//           },
//           {
//             model: Album,
//             attributes: ["name"],
//           },
//         ],
//       });
//       const bodySongs = allSongs.flatMap((doc) => [
//         { index: { _index: "songs" } },
//         doc,
//       ]);
//       const { bodySongs: bulkResponseSongs } = await client.bulk({
//         refresh: true,
//         bodySongs,
//       });
//       if (bulkResponseSongs.errors) {
//         return res.json(bulkResponseSongs.errors);
//       }
//       const { bodySongs: countSongs } = await client.count({ index: "songs" });
//       res.send(countSongs);

//       //*************** All Playlists ***************//

//       const allPlaylists = await Playlist.findAll({
//         include: [
//           {
//             model: Song,
//             attributes: ["name", "youtube_link", "createdAt", "updatedAt"],
//             include: [
//               { model: Artist, attributes: ["name", "id"] },
//               { model: Album, attributes: ["name", "id"] },
//             ],
//           },
//         ],
//       });
//       const bodyPlayLists = allPlaylists.flatMap((doc) => [
//         { index: { _index: "playlists" } },
//         doc,
//       ]);
//       const { bodyPlayLists: bulkResponsePlaylists } = await client.bulk({
//         refresh: true,
//         bodyPlayLists,
//       });
//       if (bulkResponsePlaylists.errors) {
//         return res.json(bulkResponsePlaylists.errors);
//       }
//       const { bodyPlayLists: countPlaylists } = await client.count({
//         index: "playlists",
//       });
//       res.send(countPlaylists);
//     } catch (e) {
//       res.json({ error: e.message });
//     }
//   });

  async function run() {
    // here we are forcing an index refresh, otherwise we will not
    // get any result in the consequent search
    // await client.indices.refresh({ index: 'artists' })

    // Let's search!
    const { body } = await client.search({
      index: ["playlist",
    });

    console.log(body.hits.hits);
  }

  run().catch(console.log);
  // uploads().catch(console.log);

