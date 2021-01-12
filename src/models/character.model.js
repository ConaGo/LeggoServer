const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { string } = require('joi');

const characterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 4,
      required: true,
      trim: true,
    },
    data:{
        type:String,
    },
    inventory:{
        items:[{
            umaString:{ type:String}
        }],
        equipment:{
            weapon1 : {umaString:{ type:String}},
            weapon2 : {umaString:{ type:String}},
            head : {umaString:{ type:String}},
            chest : {umaString:{ type:String}},
            legs : {umaString:{ type:String}},
            feet : {umaString:{ type:String}},
        }
    },
  },
  
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
characterSchema.plugin(toJSON);
characterSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The character's name
 * @param {ObjectId} [excludecharacterId] - The id of the character to be excluded
 * @returns {Promise<boolean>}
 */
characterSchema.statics.isNameTaken = async function (name, excludecharacterId) {
  const character = await this.findOne({ name, _id: { $ne: excludecharacterId } });
  return !!character;
};

/**
 * @typedef character
 */
const character = mongoose.model('character', characterSchema);

module.exports = character;
