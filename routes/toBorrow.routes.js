const express = require('express');
const router = express.Router();
const toBorrow = require ('../models/ToBorrow.model')

router.get('/to-borrow', (req, res, next) => res.render('toBorrow-create'));

router.post('/to-borrow/create', async (req, res, next) => {
    const data = req.body;

    try {
        const result = await toBorrow.create(data);
        console.log(result);
        res.redirect('/profile')
    } catch (error) {
        throw new Error(error);
    }
});


module.exports = router;

