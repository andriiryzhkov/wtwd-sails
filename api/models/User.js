/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {
    id_user: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: 'email',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    first_name: {
      type: 'string',
      maxLength: 50,
      required: true
    },
    middle_name: {
      type: 'string',
      maxLength: 50
    },
    last_name: {
      type: 'string',
      maxLength: 50,
      required: true
    },
    address: {
      type: 'string',
      maxLength: 100
    },
    city: {
      type: 'string',
      maxLength: 30
    },
    postcode: {
      type: 'string',
      maxLength: 5
    },
    phone: {
      type: 'string',
      maxLength: 13
    },
    contract: {
      type: 'string',
      maxLength: 10
    },
    manager: {
      type: 'boolean'
    },
    create_time: {
      type: 'datetime',
      defaultsTo: function (){ return new Date(); }
    },
    //Приховаємо пароль з виводу
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  }
};
