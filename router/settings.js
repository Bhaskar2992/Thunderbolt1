const express = require('express');
const router = express.Router();

const requireAuth = (req, res, next) => {
    if (req.session.userId) {
        next(); // User is authenticated, continue to next middleware
    } else {
        res.redirect('/login'); // User is not authenticated, redirect to login page
    }
}

router.get('/',requireAuth, function (req, res) {
    res.render('settings', { title: 'Settings' , user : req.session.userId});
});


module.exports = router;