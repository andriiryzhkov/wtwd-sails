/**
* Message.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {
    id_message: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    order: {
      model: 'order'
    },
    user: {
      model: 'user'
    },
    content: {
      type: 'string',
      maxLength: 255
    },
    create_time: {
      type: 'datetime',
      defaultsTo: function (){ return new Date(); }
    }

  }
};
