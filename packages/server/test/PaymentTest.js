const CachedToken = require("../src/erp/OAuth2/cache/tokenCache");
const QBO = require("../src/erp/OAuth2/Auth/QBOAuth");
const { createPayment } = require("../src/erp/Payment/Payment");
var expect = require('chai').expect;

beforeEach(function() {
    const cachedToken = CachedToken.get();
    QBO.setRealmId(cachedToken.realmId);
    QBO.setRefreshToken(cachedToken.refresh_token);
    QBO.setAccessToken(null, cachedToken);
  });

const expectedKeys = ['CustomerRef', 'DepositToAccountRef', 'TotalAmt', 'UnappliedAmt', 'ProcessPayment',
                      'domain', 'sparse', 'Id', 'SyncToken', 'MetaData',  'TxnDate', 'CurrencyRef', 'Line'];

describe('Test for createPayment', function() {
    it('Check for promised objects keys match with expected', function () {

        var payment = {
            "TotalAmt": 25.0, 
            "CustomerRef": {
              "value": "59"
            }
          }
        return createPayment(payment).then(function(paymentInfo) {
            console.log(paymentInfo);
            expect(paymentInfo).to.have.keys(expectedKeys);
        })
        
    })
});
