class PackageDelivery {
    constructor(empId, qboReceiptId, delivered, address, id) {
        if (id) this.id = id;
        this.emp = empId;
        this.qboReceiptId = qboReceiptId;
        this.delivered = delivered;
        this.address = address;
    }
}

module.exports = PackageDelivery;
