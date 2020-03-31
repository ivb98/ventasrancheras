/* eslint-disable no-undef */
const { expect } = require('chai');
const jwt = require('../Auth/jwt/index');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6MSwiaWF0IjoxNTg1NjE2MTE3LCJleHAiOjE2NDg3MzEzMTd9.IA-RtNtkHRSC1jlo6T78SdJAz0v1TPNTVou-phJoJ38';

describe('Testing the module jwt', () => {
    it('Test for the function createToken',(done) => {
        const result = jwt.createToken(1,1);
        expect(result)
            .to.be.a('string')
            .that.matches(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
        done();
    });
    it('Test for the function ValidateToken',(done) => {
        const result = jwt.validateToken(token);
        expect(result)
            .to.be.an('Object');
        expect(result.id).to.be.a('Number');
        expect(result.role).to.be.a('Number');
        done();
    })
})

