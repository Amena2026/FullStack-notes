const { test } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
    await api
    .get('/notes')
    .expect(200)
    .expect('content-Type', /application\/json/)
})

test('A specific note is within the returned notes', async () => {
    const response = await api.get('/notes')

    const contents = response.body.map(e => e.content)
    assert.strictEqual(contents.includes('Check if the gym opens early on holidays.'), true)
})

test('A valid note can be created', async () => {
    const newNote = {
        content: "async/await simplifies making async calls",
        important: true,
    }

    await api
      .post("/notes")
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

})
