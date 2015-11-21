/**
* Order.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {
    id_order: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    user: {
      model: 'user'
    },
    type: {
      model: 'type'
    },
    content: {
      type: 'string',
      maxLength: 255
    },
    messages:{
      collection: 'message',
      via: 'order'
    },
    create_time: {
      type: 'datetime',
      defaultsTo: function (){ return new Date(); }
    },
    complete_time: {
      type: 'datetime'
    }

  }
};
