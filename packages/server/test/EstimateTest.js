/*const CachedToken = require("../src/erp/OAuth2/cache/tokenCache");
const QBO = require("../src/erp/OAuth2/Auth/QBOAuth");
const { createSalesOrder } = require("../src/erp/Estimate/Estimate");
var expect = require('chai').expect;

beforeEach(function() {
    const cachedToken = CachedToken.get();
    QBO.setRealmId(cachedToken.realmId);
    QBO.setRefreshToken(cachedToken.refresh_token);
    QBO.setAccessToken(null, cachedToken);
  });

  const expectedKeys = ['TotalAmt', 'ShipAddr', 'BillAddr', 'Line', 'CustomerRef'];

describe('Test for createSalesOrder', function() {
    it('Check for items found uncategorized', function () {

        return createSalesOrder(saleOrder).then(function(sale) {
            console.log(sale);
            expect(sale).to.have.keys(expectedKeys);
        })
        
    })
});


const saleOrder = {
    "Line": [
      {
        "DetailType": "SalesItemLineDetail", 
        "SalesItemLineDetail": {
          "Qty": 1, 
          "UnitPrice": 35, 
          "ItemRef": {
            "name": "Pest Control", 
            "value": "10"
          }
        }, 
        "LineNum": 1, 
        "Amount": 35.0
      }, 
      {
        "DetailType": "SubTotalLineDetail", 
        "Amount": 35.0, 
        "SubTotalLineDetail": {}
      }
    ], 
    "CustomerRef": {
      "value": '58'
    }, 
    "TxnTaxDetail": {
      "TotalTax": 0
    }, 
    "ApplyTaxAfterDiscount": false
  }
*/