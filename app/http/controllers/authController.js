const bcrypt = require('bcrypt');
const { usernameExists } = require('../../models/mysql_queries');

function authController() {
    return {
        login(req, res) {
            res.render('login', { login: true})
        },
        async postLogin(req, res) {
            //sign up
            if(Object.keys(req.body).length === 4 ){
                const { name, username, email, password } = req.body;
                if(!name || !email || !username || !password){
                    req.flash('errorSignUp', '1 or more invalid fields');
                    req.flash('name', name);
                    req.flash('username', username);
                    req.flash('email', email);
                    return res.render('login', { login: false });
                }

                //check if username is in database
                const exists = await usernameExists(username);
                
                //if it does will display error and redirect to register page again and if not do what is below
                if(exists){
                    req.flash('errorSignUp', 'Username Taken');
                    req.flash('name', name);
                    req.flash('username', username);
                    req.flash('email', email);
                    return res.render('login');
                }else {
                    //hash password
                    const hashedPassword = await bcrypt.hash(password, 10);

                    //create a user
                    //redirect to home page
                }
            //log in
            }else if(Object.keys(req.body).length === 2){
                const { username, password } = req.body;
                if(!username || !password){
                    req.flash('errorLogIn', '1 or more invalid fields');
                    req.flash('username', username);
                    return res.render('login', { login: true });
                }
            }
        }
    }
}

module.exports = authController