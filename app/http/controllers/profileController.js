function profileController() {
    return{
        async index(req,res){
            if(!req.session.username){
                res.redirect('/');
            } else {
                res.render('profile');
            }
        }
    }
}
module.exports = profileController;