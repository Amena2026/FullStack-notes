require('dotenv').config()
const {test, describe} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('HTTP Get requests', () => {
    test('/get returns all notes successfully', async () => {
        // should return 200 + json data of all notes 
        await api
          .get('/notes')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })

    test('/get returns individual note when there exists a note with the provided id', async () => {
        // should return 200 + json data of individual note
        await api
          .get('/notes/79212ea4-dc4e-46d5-a811-700e2c1053f1')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })

    test('/get returns 404 when individual requests a note that doesnt exist', async () => {
        // should return 404
        await api
          .get('/notes/00000000-0000-0000-0000-000000000000')
          .expect(404)
          .expect('Content-Type', /application\/json/)
    })
})

describe('HTTP Post requests', () => {
    test('a valid jwt needs to be passed to create a note', async () => {
        // should return 401 token invald
    })

    test('user must exist in the DB', async () => {
        // should return 400 user not found
    })

    test('a user must include content & important fields in the post request', async () => {
        // should return 400 content and important fields required
    })

    test('a valid note can be created', async () => {
        // should return 201
    })

    
})

describe('HTTP put requests', () => {
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

describe('HTTP delete requests', () => {
    test('A valid jwt needs to be passed to delete a note', async () => {
        // should return 402 token invalid
    })

    test('only the note creator can delete the note', async () => {
        // should return 401 only note creater can delete 
    })

    test('cannot delete a nonexistent note', async () => {
        // should return 404 note does not exist
    })

    test('a note can be deleted', async () => {
        // should return 204
    })

})