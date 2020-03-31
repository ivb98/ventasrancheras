class PackageDelivery {
    constructor(empId, qboReceiptId, status, id) {
        if (id) this.id = id;
        this.emp = empId;
        this.qboReceiptId = qboReceiptId;
        this.status = status;
    }
}

module.exports = PackageDelivery;
