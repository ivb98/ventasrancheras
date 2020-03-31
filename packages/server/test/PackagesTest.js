const CachedToken = require("../src/erp/OAuth2/cache/tokenCache");
const QBO = require("../src/erp/OAuth2/Auth/QBOAuth");
const { getPackages } = require("../src/erp/Packages/Packages");
var expect = require('chai').expect;

beforeEach(function() {
    const cachedToken = CachedToken.get();
    QBO.setRealmId(cachedToken.realmId);
    QBO.setRefreshToken(cachedToken.refresh_token);
    QBO.setAccessToken(null, cachedToken);
  });

  const expectedKeys = ['id', 'docNumber', 'currency', 'items', 'customer','address', 'total'];

describe('Test for getPackages', function() {
    it('Check for items found uncategorized', function () {

        return getPackages().then(function(packages) {
            console.log(packages);
            expect(packages[0]).to.have.keys(expectedKeys);
        })
        
    })
});
