const express = require('express');
const projectDb = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const projects = await projectDb.get();
        return res.status(200).json(projects)
    } catch {
        return res.status(500).json({error: "Internal server error"})
    }
})

router.post('/', async(req, res) => {
    try {
        const newProject = await projectDb.insert(req.body);
        return res.status(201).json(newProject);
    } catch {
        return res.status(500).json({error: "Internal server error"})
    }
})