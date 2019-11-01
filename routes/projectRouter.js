const express = require('express');
const projectDb = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/:id/actions', async(req, res) => {
    const {id} = req.params;

    try {
        const projectActions = await projectDb.getProjectActions(id);
        return res.status(200).json(projectActions);
    } catch {
        return res.status(500).json({error: "Internal server error"})
    }
})

router.get('/', async(req, res) => {
    try {
        const projects = await projectDb.get();
        return res.status(200).json(projects)
    } catch {
        return res.status(500).json({error: "Internal server error"})
    }
});

router.post('/',validateProjectPost, async(req, res) => {
    try {
        const newProject = await projectDb.insert(req.body);
        return res.status(201).json(newProject);
    } catch {
        return res.status(500).json({error: "Internal server error"})
    }
});

router.put('/:id', validateProjectPost, async(req, res) => {
    const {id} = req.params;
    try {
        const updatedProject = await projectDb.update(id, req.body);
        return res.status(200).json(updatedProject)
    } catch {
        return res.status(500).json({error: "Internal server error"})
    }
});

router.delete('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        await projectDb.remove(id);
        res.status(200).json({message: "The project has been successfully deleted"})
    } catch {
        return res.status(500).json({error: "Internal server error"})
    }
});

function validateProjectPost(req, res, next) {
    const {name, description} = req.body;

    if(!name) {
        res.status(400).json({message: "Kindly include the name of the project"})
    } else if (!description) {
        res.status(400).json({ message: "a description of the project is required" })
    } else {
        next();
    }
};

module.exports = router;