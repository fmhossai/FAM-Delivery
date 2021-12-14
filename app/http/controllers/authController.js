const bcrypt = require('bcrypt');

function authController() {
    return {
        login(req, res) {
            res.render('login')
        },
        async postLogin(req, res) {
            /*const { name, username, email, password } = req.body

            //need to restructure
            if(!name || !email || !username || !password){
                req.flash('error', '1 or more invalid fields');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/login');
            }

            //check if email/phone exits


            //if it does will display error and redirect to register page agin and if not do what is below

            //optional: hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            //

            //create a usser


            //

            //redirect to home page*/

            console.log(req.body)
        }
    }
}

module.exports = authController