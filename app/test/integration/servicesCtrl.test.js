//native modules
const assert = require('assert')
//npm modules
const supertest = require('supertest')
//env environment configuration
require('custom-env').env('test')
//import express app
const app = require('../../app')
//import db
const db = require('../../../model/bd/mysqlPool')
//jest configuration
//jest.setTimeout(10000)

const request = supertest(app)
it('get searchGroups', async () => {
    const response = await request.get('/services/searchGroups')
    expect(response.type).toBe('application/json')
    expect(response.body.hasErros).toBe(false)
})
it('get searchResults', async () => {
    const response = await request.get('/services/searchGroups/?id=52')
    expect(response.type).toBe('application/json')
    expect(response.body.hasErros).toBe(false)
})
it('post searchAndSave', async () => {
    await request.post('/services/searchAndSave')
    .send(JSON.stringify({languages:['java','swift'],reposPerPage:1}))
    .set('Content-type','application/json')

    .then(response => {
        assert(!response.body.hasErros)
        assert(response.body.data.length>0)
    })
    .catch(err => {
        throw err
    })
})
afterAll(done => {
    db.end()
    done()
})