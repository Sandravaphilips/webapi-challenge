const express = require('express');
const actionDb = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const actions = await actionDb.get();
        return res.status(200).json(actions)
    } catch {
        return res.status(500).json({error: "Internal server error"})
    }
});

router.post('/', validateActionPost, async(req, res) => {
    try {
        const newAction = await actionDb.insert(req.body);
        return res.status(201).json(newAction);
    } catch {
        return res.status(500).json({error: "Internal server error"})
    }
});

router.put('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const updatedAction = await actionDb.update(id, req.body);
        return res.status(200).json(updatedAction)
    } catch {
        return res.status(500).json({error: "Internal server error"})
    }
});

router.delete('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        await actionDb.remove(id);
        res.status(200).json({message: "The action has been successfully deleted"})
    } catch {
        return res.status(500).json({error: "Internal server error"})
    }
});

function validateActionPost(req, res, next) {
    const {project_id, description, notes} = req.body;

    if(!project_id) {
        res.status(400).json({message: "The id of the project is required to be able to add post"})
    } else if (!notes) {
        res.status(400).json({ message: "you need to add notes" })
    } else if (!description) {
        res.status(400).json({ message: "a description of the action is required" })
    } else {
        next();
    }
};


module.exports = router;