const {
    Router
} = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require("../models/User.model")

router.get('/signup', (req, res, next) => {
    res.render('auth/signup')
})

router.post('/signup', (req, res, next) => {
    console.log(req.body)
    const {
        username,
        password,
        email
    } = req.body

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {
            return User.create({
                // username: username
                username,
                email,
                // passwordHash => this is the key from the User model
                //     ^
                //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
                passwordHash: hashedPassword
            });
        })
        .then(userFromDB => {
            // console.log('Newly created user is: ', userFromDB);
            res.redirect('/userProfile')
        })
        .catch(error => next(error));

})

router.get('/userProfile', (req, res) => {
    res.render('Users/user-profile')
})



module.exports = router;