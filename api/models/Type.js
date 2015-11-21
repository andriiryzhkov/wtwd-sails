/**
* Type.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {
    id_type: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: 'string',
      required: true
    }
  }
};
