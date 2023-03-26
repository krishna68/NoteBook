const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');
//Route1: get all thenotes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        res.status(500).send("Ineternal server error");
    }

})

//Route2: add a new note using post request: login required
router.post('/addnote', fetchuser, [body('title', 'Enter a valid title').isLength({ min: 3 }), body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })], async (req, res) => {
    //first do validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, tag } = req.body;
        //now save new note
        const note = new Notes({
            user: req.user.id, title, description, tag
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        res.status(500).send("Ineternal server error");
    }

})

//Route3: update an existing note
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;
    //now save new note
    try {
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.title = title;
        }
        if (tag) {
            newNote.title = title;
        }
        //find the node to be updated
        //1.first find if this id of note if of this user
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found");
        }
        if (note.user.toString() != req.user.id) {
            return res.status(404).send("Not allowed");
        }

        //now update note
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        res.status(500).send("Ineternal server error");
    }

})

//Route4: delete an existing note using DELETE
router.delete('/deletenote/:id', fetchuser, async (req, res) => {


    //find the note to be deleted and delete ut
    //1.first find if this id of note if of this user
    try {
        let note = await Notes.findById(req.params.id);
        //if note does not exist
        if (!note) {
            return res.status(404).send("Not found");
        }
        //allow deletion of note if user owns this note
        if (note.user.toString() != req.user.id) {
            return res.status(404).send("Not allowed");
        }

        //now delete note
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        res.status(500).send("Ineternal server error");
    }
})
module.exports = router;