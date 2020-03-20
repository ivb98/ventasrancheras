// Getters and Setters for Quickbooks access token.
let token = null;
class Token {
    static setToken(newValue) {
        token = newValue;
    }

    static getToken() {
        return token;
    }
}

module.exports = Token;
