const fs = require('fs');
const CachedToken = require("../src/erp/OAuth2/cache/tokenCache");
const QBO = require("../src/erp/OAuth2/Auth/QBOAuth");
const { uploadSignature, addNote } = require("../src/erp/Signature/Signature");
var expect = require('chai').expect;

beforeEach(function() {
    const cachedToken = CachedToken.get();
    QBO.setRealmId(cachedToken.realmId);
    QBO.setRefreshToken(cachedToken.refresh_token);
    QBO.setAccessToken(null, cachedToken);
  });

 

const expectedKeys = ["Attachable", "time"];

describe('Test for uploadSignature', function() {
    it('Check for promised objects keys match with expected', function () {

        const signature =  {

            note: "Firma de delivery al recibir",
            imgName: "mytest.jpg",
            id: 1041,
            type: "Invoice",
           imgType: "image/jpg",

        };

        
        const base64 = fs.createReadStream('./mytest.jpg');
        
        return uploadSignature(base64, signature).then(function(updated) {
            console.log(updated);
            expect(updated).to.have.keys(expectedKeys);
        })
        
   })
});
