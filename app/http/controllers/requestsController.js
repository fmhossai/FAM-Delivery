const { redirect } = require('express/lib/response');
const { getSupplyRequests, updateSupplyRequest } = require('../../models/mysql_queries');

function requestsController() {
    return {
        async index(req, res) {
            if(req.session.supplierFlag){
                const requests = await getSupplyRequests(req.session.username);
                res.render('supplier', {
                    requests:requests
                })
            }
            else{
                res.redirect("/");
            }
        },
        async update(req, res) {
            console.log(req.body.btn);
            await updateSupplyRequest(req.body.btn);
            res.redirect("/supplier");
        }
    }
}

module.exports = requestsController