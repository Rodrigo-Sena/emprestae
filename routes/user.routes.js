const { Router } = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const mongoose = require('mongoose');
const toBorrow = require ('../models/ToBorrow.model');



////////////////////////////////////////////////////////////////////////
///////////////////////////// SIGNUP //////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .get() route ==> to display the signup form to users
router.get('/signup', (req, res) => res.render('signup'));

// .post() route ==> to process form data
router.post('/signup', (req, res, next) => {
  const { userName, email, neighbourhood, phoneNumber, password } = req.body;
  console.log('Post signup ##############################')


  if (!userName || !email || !neighbourhood || !phoneNumber || !password) {
    res.render('signup', { errorMessage: 'Todos os campos são obrigatórios.' });
    return;
  }

//   make sure passwords are strong:
//   const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  
//   if (!regex.test(password)) {
//     res
//       .status(500)
//       .render('signup', { errorMessage: 'A senha precisa ter pelo menos 6 caracteres e deve conter pelo menos um número, uma letra minúscula e uma letra maiúscula.' });
//       console.log('regex $$$$$$$$$$$$$$$$$$$$$$')
//     return;
//   }

  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
      return User.create({
        // username: username
        userName: userName,
        email: email,
        neighbourhood: neighbourhood,
        phoneNumber: phoneNumber,
        // passwordHash => this is the key from the User model
        //     ^
        //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
        password: hashedPassword
      });
    })
    .then(userFromDB => {
      console.log('Newly created user is: ', userFromDB);
      res.redirect('/profile');
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('signup', { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render('signup', {
          errorMessage: 'O e-mail precisa ser exclusivo. Este e-mail já esta em uso.'
        });
      } else {
        next(error);
      }
    }); // close .catch()
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// LOGIN ////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .get() route ==> to display the login form to users
router.get('/login', (req, res) => res.render('login'));

// .post() login route ==> to process form data
router.post('/login', (req, res, next) => {
  // console.log('SESSION =====> ', req.session);
  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.render('login', {
      errorMessage: 'Please enter both, email and password to login.'
    });
    return;
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.render('login', { errorMessage: 'Email is not registered. Try with other email.' });
        return;
      }
      bcryptjs
        .compare(password, user.password)
        .then(success => {
          if (success) {
            //******* SAVE THE USER IN THE SESSION ********//
            req.session.currentUser = user;
            return res.redirect('/profile');
          }
          res.render('login', { errorMessage: 'Incorrect password.' });
        })
        .catch(err => {
          throw new Error(err);
        });
    })
    .catch(error => next(error));
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// LOGOUT ////////////////////////////////////
////////////////////////////////////////////////////////////////////////

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});
// router.get('/userProfile', (req, res) => res.render('users/user-profile'));

router.get('/profile', async (req, res, next) => { 
    
    try {
        if (req.session.currentUser) {  
            const ownerId = req.session.currentUser._id
            const result = await toBorrow.find({'owner': ownerId}).populate('owner').exec()
            // console.log(`${result} <<<<<<<<<<<<<<<<<<<<<  RESULT `)
        res.render('profile', { toBorrowList: result })
          } else {
              res.redirect('/login')
          }
        
    } catch (error) {
        console.log(error)
    }
    
});

module.exports = router;