require('dotenv').config()
const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  cloud: {
    id: process.env.ELASTIC_ID
  },
  auth: {
    username: process.env.ELASTIC_AUTH_USER_NAME,
    password: process.env.ELASTIC_AUTH_PASSWORD,
  },
});
async function run() {
  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  // await client.indices.refresh({ index: 'artists' })

  // Let's search!
  const { body } = await client.search({
    index: "playlist",
    groups: {
      index: "song",
    },
  });

  console.log(body.hits.hits);
}

run().catch(console.log);
