const express = require('express');
const router = express.Router();
const toBorrow = require ('../models/ToBorrow.model')


//######################## CREATE ########################

router.get('/to-borrow', (req, res, next) => res.render('toBorrow-create'));

router.post('/to-borrow/create', async (req, res, next) => {
    const data = req.body;
    data.owner = req.session.currentUser._id;

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
      console.log('AQUI!!!!!!!!!!');
      res.redirect('profile')
    } catch (error) {
      console.log(error)
    }
   });


//######################## READ ########################

router.get('/list', async (req, res, next) => {
  try {
   const result = await toBorrow.find()
  //  console.log(result)
   res.render('toBorrow-list', { toBorrowList: result })
 } catch (error) {
   console.log(error)
 }
});

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


module.exports = router;

