var express = require('express');
var passport = require('passport');
var router = express.Router();

//===============ROUTES=================

//displays our signup page
router.get('/login', function(req, res){
    res.render('login', {error: req.session.error});
});

router.post('/local-reg', 
    function(req, res, next) {
        passport.authenticate('local-signup', 
            function(err, user, info) {
                if (err || !user) { 
                    return res.status(200).json({status: 'error', message: err, user: user});
                }

                req.logIn(user, function(err) {
                    if (err) { 
                        console.log(err);
                        return res.status(200).json({status: 'error', message: err, user: user});
                    }

                    return res.status(200).json({status: 'success', message: '', user: user});
                });
            }
        )(req, res, next);
    }
);

router.post('/change-pass',
    function(req, res, next) {
        passport.authenticate('local-changepass', 
            function(err, user, info) {
                if (err) { 
                    return res.status(200).json({status: 'error', message: err, user: user});
                } else {
                    return res.status(200).json({status: 'success', message: '', user: user});
                }
            }
        )(req, res, next);
    }
);

//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/login', 
    passport.authenticate('local-signin', {
        successRedirect: '/',
        failureRedirect: '/authen/login'
    })
);

//logs user out of site, deleting them from the session, and returns to homepage
router.get('/logout', 
    function(req, res){
        /*var name = req.user.username;
        console.log("LOGGIN OUT " + req.user.username)*/
        req.logout();
        res.redirect('/');
        //req.session.notice = "You have successfully been logged out " + name + "!";
    });

module.exports = router;