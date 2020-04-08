class Manager {
    constructor(email, password, name, id) {
        if (id) this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
    }
}

module.exports = Manager;
