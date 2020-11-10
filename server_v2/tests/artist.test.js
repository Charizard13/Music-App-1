const request = require("supertest")
const { Artist } = require("../models")
const app = require("../app")

const getArtistsMock = [
    {
        name: 'my artist test1',
        youtube_link: "hrfhrhrhrh"
    },
    {
        name: 'my artist test2',
        youtube_link: "hrfhrhrhrh"

    },
    {
        name: 'my artist test3',
        youtube_link: "hrfhrhrhrh"

    },
]

const postArtistMock = {
    name: 'my artist test1',
        youtube_link: "hrfhrhrhrh"
}

describe('testing artists endpoints', () => {
    beforeEach(async ()=>{
        await Artist.destroy({truncate: true, force:true})
    })
    it('get all artists', async (done) => {
        await Artist.bulkCreate(getArtistsMock)
        const { body } = await request(app).get('/api/artists');
        expect(body.length).toBe(3);
        expect(body[0].name).toBe('my artist test1')
        expect(body[1].name).toBe('my artist test2')
        expect(body[2].name).toBe('my artist test3')
        done();
    })

    it('Can create artist', async () => {
        const { body } = await request(app).post('/api/artists').send(postArtistMock);
        postArtistMock.id = body.id;
        const artistFromDB = await Artist.findByPk(postArtistMock.id);
        expect(artistFromDB.name).toBe(postArtistMock.name)
      })
})