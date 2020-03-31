/* eslint-disable no-undef */
const { expect } = require('chai');
const { createToken } = require('../Auth/jwt/index');

// eslint-disable-next-line no-undef
describe('Testing the module jwt', () => {
    it('Test for create jwt',(done) => {
        const result = createToken(1,1);
        expect(result)
            .to.be.a('string')
            .that.matches(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
        done();
    })
})

