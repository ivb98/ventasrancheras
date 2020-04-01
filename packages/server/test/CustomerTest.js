const CachedToken = require("../src/erp/OAuth2/cache/tokenCache");
const QBO = require("../src/erp/OAuth2/Auth/QBOAuth");
const { getCustomers } = require("../src/erp/Customer/Customer");
var expect = require('chai').expect;

beforeEach(function() {
    const cachedToken = CachedToken.get();
    QBO.setRealmId(cachedToken.realmId);
    QBO.setRefreshToken(cachedToken.refresh_token);
    QBO.setAccessToken(null, cachedToken);
  });

  const expectedKeys = ['Id', 'shipAddr', 'displayName'];

describe('Test for getCustomers', function() {
    it('Returns all matched cases with expected keys', function () {
        return getCustomers().then(function(customer) {
            console.log(customer);
            expect(customer[0]).to.have.keys(expectedKeys);
        })
        
    })
});