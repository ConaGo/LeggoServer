const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const characterController = require('../../controllers/character.controller');

const router = express.Router();

router.route('/').post(characterController.createCharacter).get(characterController.getCharacters);
router
  .route('/:characterId')
  .get(characterController.getCharacter)
  .patch(characterController.updateCharacter)
  .delete(characterController.deleteCharacter);
module.exports = router;