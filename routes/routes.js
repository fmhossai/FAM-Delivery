const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/cartController');
const homeController = require('../app/http/controllers/homeController');
const categoriesController = require('../app/http/controllers/categoriesController');
const searchController = require('../app/http/controllers/searchController')
const logoutController = require('../app/http/controllers/logoutController');
const requestsController = require('../app/http/controllers/requestsController');
const profileController = require('../app/http/controllers/profileController');

function initRoutes(app, axios) {

    app.get('/', homeController(axios).index);

    app.get('/login', authController().login);
    app.post('/login', authController().postLogin);

    app.get('/logout', logoutController().index);

    app.get('/cart', cartController().index);
    app.get('/search', searchController().index)
    app.post('/update-cart', cartController().update);

    app.get('/categories/:category', categoriesController().index);

    app.get('/profile', profileController().index);

    app.get('/checkout', (req, res) => {
        res.render('checkout');
    });

    app.get('/supplier', requestsController().index);
}

module.exports = initRoutes