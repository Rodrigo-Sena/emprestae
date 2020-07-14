const express = require('express');
const router = express.Router();
const toBorrow = require ('../models/ToBorrow.model')


//Create
router.get('/to-borrow', (req, res, next) => res.render('toBorrow-create'));

router.post('/to-borrow/create', async (req, res, next) => {
    const data = req.body;

    try {
        const result = await toBorrow.create(data);
        console.log(result);
        res.redirect('/list')
    } catch (error) {
        throw new Error(error);
    }
});

//Update

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
      console.log('AQUI!!!!!!!!!');
      res.redirect('/list')
    } catch (error) {
      console.log(error)
    }
   });

// Renderiza na pagina resultado

router.get('/list', async (req, res, next) => {
    try {
     const result = await toBorrow.find()
    //  console.log(result)
     res.render('toBorrow-list', { toBorrowList: result }) //, {toBorrowList: result}
   } catch (error) {
     console.log(error)
   }
});



module.exports = router;

