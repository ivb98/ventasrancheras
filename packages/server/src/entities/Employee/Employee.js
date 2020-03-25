class Employee {
    constructor(email, password, name, qboId, role, id) {
        if (id) this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.qboId = qboId;
        this.role = role;
    }
}

module.exports = Employee;
