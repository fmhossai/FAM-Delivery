function logoutController() {
    return{
        index(req,res){
            if(req.session.supplierFlag){
                req.session.supplierFlag = false;
                req.session.username = '';
                req.session.cart = '';
                return res.redirect('/');
           }
           if(req.session.username){
               req.session.username = '';
               req.session.cart = '';
               return res.redirect('/');
           }
           else {
               return res.redirect('/');
           }
        }
    }
}
module.exports = logoutController;