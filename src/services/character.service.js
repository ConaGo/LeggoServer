const httpStatus = require('http-status');
const { Character } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a character
 * @param {Object} characterBody
 * @returns {Promise<Character>}
 */
const createCharacter = async (characterBody) => {
  if (await Character.isNameTaken(characterBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  const character = await Character.create({name:characterBody.name, 
                                            data:"{health:100, maxHealth:190}",
                                            inventory:{ items:[],
                                                        equipment:{
                                                          weapon1:{"umaString":""},
                                                          weapon2:{"umaString":""},
                                                          head:{"umaString":""},
                                                          chest:{"umaString":""},
                                                          legs:{"umaString":""},
                                                          feet:{"umaString":""}
                                                        }
                                                      }
                                          });
  return character;
};

/**
 * Query for characters
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCharacters = async (filter, options) => {
  const characters = await Character.paginate(filter, options);
  return characters;
};

/**
 * Get character by id
 * @param {ObjectId} id
 * @returns {Promise<character>}
 */
const getCharacterById = async (id) => {
  console.log(id);
  return Character.findById(id);
};

/**
 * Update character by id
 * @param {ObjectId} characterId
 * @param {Object} updateBody
 * @returns {Promise<character>}
 */
const updateCharacterById = async (characterId, updateBody) => {
  const character = await getCharacterById(characterId);
  if (!character) {
    throw new ApiError(httpStatus.NOT_FOUND, 'character not found');
  }
  Object.assign(character, updateBody);
  await character.save();
  return character;
};

/**
 * Delete character by id
 * @param {ObjectId} characterId
 * @returns {Promise<character>}
 */
const deleteCharacterById = async (characterId) => {
  const character = await getCharacterById(characterId);
  if (!character) {
    throw new ApiError(httpStatus.NOT_FOUND, 'character not found');
  }
  await character.remove();
  return character;
};

module.exports = {
  createCharacter,
  queryCharacters,
  getCharacterById,
  updateCharacterById,
  deleteCharacterById,
};
