//apiTest.js
const request = require('supertest');
const server = "localhost:4000";

//==================== user API test ====================

/**
 * Testing get all user endpoint
 */
describe('GET /delivery/', function () {
    it('respond with json containing a list of all deliveries', function (done) {
        request(server)
            .get('/delivery/me')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});