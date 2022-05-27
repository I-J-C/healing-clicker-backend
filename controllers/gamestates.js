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
        .then((gamestates)=>res.json(gamestates))
        .catch(next);
});

// router.get('/:id', handleValidateId, (req, res, next) => {
//     Gamestate.findById(req.params.id)
//     .then(handleRecordExists)
//     .then((gamestate) => handleValidateOwnership(req, gamestate))
//     .then((gamestate) => res.json(gamestate))
//     .catch(next);
// })

// POST /gamestate

router.post('/', requireToken, (req, res, next) => {
    Gamestate.create({ ... req.body, owner: req.user_id })
    .then((gamestate) => res.status(201).json(gamestate))
    .catch(next);
})

// UPDATE

// router.put('/:id', handleValidateId, requireToken, (req, res, next) => {
//     Gamestate.findById(req.params.id)
//     .then(handleRecordExists)
//     .then((gamestate) => handleValidateOwnership(req, gamestate))
//     .then((gamestate) => gamestate.set(req.body).save())
//     .then((gamestate) => {
//         res.json(gamestate);
//     })
//     .catch(next);
// })

//delete

// router.delete('/:id', handleValidateId, requireToken, (req, res, next) => {
//     Gamestate.findById(req.params.id)
//     .then(handleRecordExists)
//     .then((gamestate) => handleValidateOwnership(req, gamestate))
//     .then((gamestate) => gamestate.remove())
//     .then((gamestate) => {
//         res.sendStatus(204);
//     })
//     .catch(next);
// })