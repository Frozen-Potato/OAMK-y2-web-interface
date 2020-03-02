require('dotenv').config();
const express = require('express');
const router = express.Router();
const items = require('../models/items');
const passport = require('passport');
require('../middleware/passport');
const multer = require('multer');


const upload = multer({
    storage: multer.diskStorage({
        destination: 'public/images/',
        filename: function(req, file, cb){
            cb(null, file.originalname);
        }
    })
}).array('images', 4);


router.get('/', (req, res) => {
    items.findAll().then(items => {
        res.json({items})
    })
});


router.get('/:id', (req, res) => {
    items.findOne({
        where: {
            ID: req.params.itemId
        }
    }).then(items => {
        if(items){
            res.json({items})
        } else{
            res.send("There is no such item exist!")
        }
    }).catch(err => {
        res.json({err})
    } )
})


router.get('/categories/:category', (req, res) => {
    items.findAll({
        where: {
            category: req.params.category
        }
    }).then(items => {
        if(items) {
            res.json({items})
        } else{
            res.send("No items with such a category exist!")
        }
    }).catch(err => {
        res.send(err)
    })
})

router.get('/locations/:location', (req, res) => {
    items.findAll({
        where: {
            city: req.params.location
        }
    }).then(items => {
        if(items) {
            res.json({items})
        } else{
            res.send("No items from this city exist!")
        }
    }).catch(err => {
        res.send(err)
    })
})

router.get('/dates/:date', (req, res) => {
    items.findAll({
        where:{
            postDate: req.params.date
        }
    }).then(items => {
        if(items) {
            res.json({items})
        } else{
            res.send("No items from this date exist!")
        }
    }).catch(err => {
        res.send(err)
    })
})


router.put('/:id', upload, passport.authenticate('jwt', {session: false}), (req, res) => {
   
        items.update({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            city: req.body.location,
            images: req.files.originalname,
            price: req.body.price,
            deliveryType: req.body.deliveryType,
            sellerName: req.body.sellerName,
            contactNumber: req.body.contactNumber,
        }, {
            where: {
                ID: req.params.itemId
            }
        }).then(() => {
            res.send("Item has been successfully updated!")
        }).catch(err => {
            res.send(err)
        })
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
        items.destroy({
            where: {
                ID: req.params.itemId
            }
        }).then(() => {
            res.send("The item has been successfully deleted!")
        }).catch(err => {
            res.send(err)
        })
});


router.post('/',  upload, passport.authenticate('jwt', {session: false}), (req, res) => {
    

    const postData = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        location: req.body.location,
        images: `${req.files.map(file => file.originalname)}`,
        price: req.body.price,
        postDate: Date.now(),
        deliveryType: req.body.deliveryType,
        sellerName: req.body.sellerName,
        contactNumber: req.body.contactNumber,
    }
    items.create(postData).then((items) => {
        res.send("Your item was successfully created!" + items.images)        
    }).catch(err => {
        res.send(err)
    });
});


module.exports = router;