class SalesVisit {
    constructor(empId, qboClientId, visited, address, qboEstimateId, id) {
        if (id) this.id = id;
        this.emp = empId;
        this.qbo_client_id = qboClientId;
        this.visited = visited;
        this.address = address;
        if (qboEstimateId) this.qbo_estimate_id = qboEstimateId;
    }
}

module.exports = SalesVisit;
