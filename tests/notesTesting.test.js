require('dotenv').config()
const {test, describe} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('HTTP GET requests', () => {
    test('/get returns all notes successfully', async () => {
        await api
          .get('/notes')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })

    test('/get/:id successfully returns an individual note when there exists a note with the provided id', async () => {
        await api
          .get('/notes/79212ea4-dc4e-46d5-a811-700e2c1053f1')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })

    test('/get/:id returns 404 when the tries to access a note that doesnt exist', async () => {
        await api
          .get('/notes/00000000-0000-0000-0000-000000000000')
          .expect(404)
          .expect('Content-Type', /application\/json/)
    })
})

describe('HTTP POST requests', () => {
    test.skip('a valid note can be added', async () => {
        const newNote = {
            "content": "post requests are a success",
            "important": true
        }

        const response = await api
          .post('/notes')
          .send(newNote)
          .expect(201)
          .expect('Content-Type', /application\/json/)
        
        assert.strictEqual(response.body[0].content, newNote.content)
    })

    test('returns 400 when a note without content is created', async () => {
        const invalidNote = {
            "important": true
        }

        await api
          .post('/notes')
          .send(invalidNote)
          .expect(400)
    })

    test('returns 400 when an empty note is created', async () => {
        const invalidNote = {}

        await api
          .post('/notes')
          .send(invalidNote)
          .expect(400)
    })
})

describe('HTTP PUT requests', () => {
    test('updating a valid note returns 200', async () => {
        const updatedNoted = { "important": true }

        const response = await api
          .put('/notes/5e4232b6-1877-4632-b910-27a8ab89926f')
          .send(updatedNoted)
          .expect(200)

        assert.strictEqual(response.body[0].important, true)
        
    })

    test('updating a note that does not exist returns 404', async () => {
        const updatedNoted = { "important": true }
        
        await api
          .put('/notes/00000000-0000-0000-0000-000000000000')
          .send(updatedNoted)
          .expect(404)
    })
})


describe('HTTP DELETE requests', () => {
    test('returns 204 on successful delete request', async () => {
        const created = await api
        .post('/notes')
        .send({ content: 'to be deleted', important: false })
        .expect(201)

        const id = created.body[0]?.id || created.body.id

        await api
        .delete(`/notes/${id}`)
        .expect(204)
    })

    test('returns 404 when deleting a nonexistent note', async () => {
        await api
          .delete('/notes/00000000-0000-0000-0000-000000000000')
          .expect(404)
    })


})
