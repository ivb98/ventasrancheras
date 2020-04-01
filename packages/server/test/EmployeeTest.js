const CachedToken = require("../src/erp/OAuth2/cache/tokenCache");
const QBO = require("../src/erp/OAuth2/Auth/QBOAuth");
const { createEmployee } = require("../src/erp/Employee/Employee");
var expect = require('chai').expect;

beforeEach(function() {
    const cachedToken = CachedToken.get();
    QBO.setRealmId(cachedToken.realmId);
    QBO.setRefreshToken(cachedToken.refresh_token);
    QBO.setAccessToken(null, cachedToken);
  });
//
const expectedKeys = ['GivenName','FamilyName' , 'PrimaryAddr', 'Id','Active','BillableTime','MetaData', 'PrintOnCheckName',
                        'SyncToken', 'domain', 'sparse', 'DisplayName'];

const employee = {

    "GivenName": "HO Lee Shi", 
    "PrimaryAddr": {
      "CountrySubDivisionCode": "CA", 
      "City": "somewhereField", 
      "PostalCode": "93242", 
      "Id": "51", 
      "Line1": "45 N. Elm Street"
    }, 
    "FamilyName": "Marron"
  }

describe('Test for createEmployee', function() {
    it('Returns expected newly created employee', function () {

        return createEmployee(employee).then(function(emp) {
            console.log(emp);
            expect(emp).to.have.keys(expectedKeys);
        })
        
    })
});
