const { auth } = require('express-openid-connect');
const dotenv = require('dotenv');
dotenv.config();

// const express = require('express');
// const router = express.Router();


const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:8080',
    clientID: 'iuecxmNfUWyTGKHJEHAqfJgnNk9b400o',
    issuerBaseURL: 'https://dev-eu22xgs0ml2ko37u.us.auth0.com'
  };


router.use('/', require('./swagger'));
router.use('/events', require('./events'));

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

module.exports = router;
