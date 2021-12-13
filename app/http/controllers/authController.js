function authController() {
    return {
        login(req, res) {
            res.render('login')
        }
    }
}

module.exports = authController