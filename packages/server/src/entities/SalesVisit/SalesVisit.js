class SalesVisit {
    constructor(empId, qboClientId, visited, qboEstimateId, date, id) {
        if (id) this.id = id;
        this.emp = empId;
        this.qbo_client_id = qboClientId;
        this.visited = visited;
        this.date = date;
        if (qboEstimateId) this.qbo_estimate_id = qboEstimateId;
    }
}

module.exports = SalesVisit;
