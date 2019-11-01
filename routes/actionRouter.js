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

router.post('/', async(req, res) => {
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
