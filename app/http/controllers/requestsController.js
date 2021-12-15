const { getSupplyRequests } = require('../../models/mysql_queries');
function requestsController() {
    return {
        async index(req, res) {
            const requests = await getSupplyRequests(req.session.username);
            console.log(requests);
            res.render('supplier', {
                requests:requests
            })
        }
    }
}

module.exports = requestsController