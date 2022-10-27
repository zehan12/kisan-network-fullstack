const express = require("express");

const router = express();

const Contact = require("../models/Contact");



//* @desc      create a contact
//* @route     GET /api/contact/create
router.post("/create", async (req, res, next) => {
    try {
        const { firstName, lastName, phoneNumber } = req.body
        const contact = { firstName, lastName, phoneNumber };
        console.log(contact)
        const phone = await Contact.findOne({ phoneNumber: contact.phoneNumber });
        if (!phone) {
            console.log("here")
            const contactCreated = await Contact.create(contact);
            res.status(200).json(contactCreated);
        } else {
            res.status(401).json({message:"phone already register"});
        }
    } catch (error) {
        console.log(error)
        return next(error)
    }
})

//* @desc      view single contact by id
//* @route     GET /api/contact/:id/view
router.get( "/:id/view", async( req, res, next ) => {
    try {
        const id = req.params.id
        const contact = await Contact.findById(id);
        if  ( !contact ) {
            res.status(401).json({message:"no such contact present"});
        } else {
            res.status(200).json({contact})
        }
    } catch ( error ) {
        console.log(error)
        return next(error)
    }
} )


//* @desc      delete a contact
//* @route     GET /api/contact/:id/delete
router.delete( "/:id/delete",  async( req, res, next ) => {
    try {
        const id = req.params.id
        console.log(id)
        const contact =  await Contact.findByIdAndDelete(id);
        if ( contact ) res.status(200).json({message:"contact deleted"});
        if ( !contact ) res.status(401).json({message:"contact not deleted"})
    } catch ( error ) {
        console.log(error)
        return next(error)
    }   
})


//* @desc      list of all contacts
//* @route     GET /api/contact/list
router.get( "/list", async ( req, res, next ) => {
    try {
        const listOfContact = await Contact.find();
        res.status(200).json({listOfContact})
    } catch ( error ) {
        console.log(error)
        return next(error)
    }
} )


module.exports = router;