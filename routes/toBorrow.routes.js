const express = require('express');
const router = express.Router();
const toBorrow = require ('../models/ToBorrow.model')
const User = require('../models/User.model');
const { Router } = require('express');


//######################## CREATE ########################

router.get('/to-borrow', (req, res, next) => res.render('toBorrow-create'));

router.post('/to-borrow/create', async (req, res, next) => {
    const data = req.body;
    data.owner = req.session.currentUser;
    // console.log(`${data.owner} MMMMMMMMMMMMMMMMMMMMM`)

    try {
        const result = await toBorrow.create(data);
        console.log(result);
        res.redirect('/profile')
    } catch (error) {
        throw new Error(error);
    }
});

//######################## UPDATE ########################

router.get('/to-borrow/:id/update', async(req, res, next) => {
    const { id } = req.params

    try {
        const result =  await toBorrow.findById(id)
        res.render('toBorrow-update', { result })
        console.log('')
    } catch (error) {
        console.log(error)
      }
   });

router.post('/to-borrow/:id/update', async (req, res, next) => {
    const { id } = req.params
    const data = req.body

    try {
      const result = await toBorrow.updateOne({_id: id}, {$set: data})
      // console.log('AQUI!!!!!!!!!!');
      res.redirect('profile')
    } catch (error) {
      console.log(error)
    }
   });


//######################## READ ########################

router.get('/list', async (req, res, next) => {
  try {
   const result = await toBorrow.find().populate('owner').exec()
   console.log(result)
   res.render('toBorrow-list', { toBorrowList: result })
 } catch (error) {
   console.log(error)
 }
});

router.get('/details/:id', async (req, res, next) => {
  const { id } = req.params;
 
  try {
    const result = await toBorrow.findById({_id: id }).populate('owner').exec()
    console.log(result)
    res.render('objectDetails', {detailsResult: result})
  } catch (error) {
    console.log(error)
  }


})

//######################## DELETE ########################

router.get("/to-borrow/:id/delete", async (req, res, next) => {
  const { id } = req.params;

  // Deletar o documento o encontrando por id no banco
  try {
    const deletionResult = await toBorrow.deleteOne({ _id: id });
    console.log(deletionResult);
    res.render("toBorrow-list");
  } catch (err) {
    throw new Error(err);
  }

});

// router home
router.get("/home", (req, res, next) => res.render('home')) 

// router search
router.get("/searchResult", async (req, res, next) => {
  try {
    const search = req.query.searchInput;
    const result = await toBorrow.find({'name': search}).populate('owner').exec()
    res.render('searchResult', { result });
  } catch (error) {
    console.log(error);
  }
}) 




module.exports = router;

