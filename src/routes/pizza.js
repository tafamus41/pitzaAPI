"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/pizza:

const pizza = require('../controllers/pizza')

/* ------------------------------------------------------- */
//* UPLOADING * MULTER
// $ npm i multer
// https://expressjs.com/en/resources/middleware/multer.html

const multer = require('multer')

// upload middleware:
const upload = multer({
    // dest: './upload',
    storage: multer.diskStorage({
        destination: './upload',
        filename: function(req, file, returnCallback) {
            
            // returnCallback(error, fileName)
            // returnCallback(null, file.originalname)
            returnCallback(null, Date.now() + '_' + file.originalname)
        }
    })
})


/* ------------------------------------------------------- */

// URL: /pizzas

router.route('/')
    .get(pizza.list)
    // .post(pizza.create)
    .post(upload.single('image'), pizza.create) // Tek dosya izin ver
    // .post(upload.array('image'), pizza.create) // Çok dosya izin ver. Tavsiye.
    // .post(upload.any(), pizza.create) // Çok dosya izin ver, fieldname önemsiz.

router.route('/:id')
    .get(pizza.read)
    .put(upload.array('image'), pizza.update)
    .patch(upload.array('image'), pizza.update)
    .delete(pizza.delete)

/* ------------------------------------------------------- */
module.exports = router