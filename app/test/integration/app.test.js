//npm modules
const supertest = require('supertest')
//env environment configuration
require('custom-env').env('test')
//import express app
const app = require('../../app')
//jest configuration
//jest.setTimeout(5000)

const request = supertest(app)

test('get rootPage', async ()=> {
    const response = await request.get('')
    expect(response.status).toBe(200)
})
