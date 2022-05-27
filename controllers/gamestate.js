const express = require('express');
const Gamestate = require('../models/Gamestate');
const router = express.Router();
const {
    handleValidateId,
    handleRecordExists,
    handleValidateOwnership,
  } = require('../middleware/custom_errors');
  const { requireToken } = require('../middleware/auth');

router.get('/', (req, res, next) => {
    Gamestate.find()
        .then((saves)=>res.json(saves))
        .catch(next);
});

router.get('/:id', handleValidateId, requireToken, (req, res, next) => {
    Gamestate.findById(req.params.id)
    .then(handleRecordExists)
    .then((save) => handleValidateOwnership(req, save))
    .then((save) => res.json(save))
    .catch(next);
})

// POST /save

router.post('/', requireToken, (req, res, next) => {
    Gamestate.create({ ... req.body, owner: req.user_id })
    .then((save) => res.status(201).json(save))
    .catch(next);
})

// UPDATE

router.put('/:id', handleValidateId, requireToken, (req, res, next) => {
    Gamestate.findById(req.params.id)
    .then(handleRecordExists)
    .then((save) => handleValidateOwnership(req, save))
    .then((save) => save.set(req.body).save())
    .then((save) => {
        res.json(save);
    })
    .catch(next);
})

//delete

router.delete('/:id', handleValidateId, requireToken, (req, res, next) => {
    Gamestate.findById(req.params.id)
    .then(handleRecordExists)
    .then((save) => handleValidateOwnership(req, save))
    .then((save) => save.remove())
    .then((save) => {
        res.sendStatus(204);
    })
    .catch(next);
})