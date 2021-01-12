const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { characterService } = require('../services');

const createCharacter = catchAsync(async (req, res) => {
  const character = await characterService.createCharacter(req.body);
  res.status(httpStatus.CREATED).send(character);
});

const getCharacters = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await characterService.queryCharacters(filter, options);
  res.send(result);
});

const getCharacter = catchAsync(async (req, res) => {
  const character = await characterService.getCharacterById(req.params.characterId);
  if (!character) {
    throw new ApiError(httpStatus.NOT_FOUND, 'character not found');
  }
  res.send(character);
});

const updateCharacter = catchAsync(async (req, res) => {
  const character = await characterService.updateCharacterById(req.params.characterId, req.body);
  res.send(character);
});

const deleteCharacter = catchAsync(async (req, res) => {
  await characterService.deleteCharacterById(req.params.characterId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCharacter,
  getCharacter,
  getCharacters,
  updateCharacter,
  deleteCharacter,
};
