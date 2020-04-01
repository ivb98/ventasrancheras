const CachedToken = require("../src/erp/OAuth2/cache/tokenCache");
const QBO = require("../src/erp/OAuth2/Auth/QBOAuth");
const { getInventory } = require("../src/erp/Inventory/Inventory");
var expect = require('chai').expect;

beforeEach(function() {
    const cachedToken = CachedToken.get();
    QBO.setRealmId(cachedToken.realmId);
    QBO.setRefreshToken(cachedToken.refresh_token);
    QBO.setAccessToken(null, cachedToken);
  });

const expectedKeys = ['./mytest.jpg'];

describe('Test for getInventory', function() {
    it('Check for items found uncategorized', function () {

        return getInventory().then(function(inventory) {
            console.log(inventory);
            expect(inventory).to.have.property('Uncategorized');
        })
        
    })
});
