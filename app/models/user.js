/*jslint node: true */
'use strict';

var mongoose = require('mongoose')
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

// User schema
var userPosSchema = new Schema({

    user_id: { type: String, required: true, index: true, unique: true },
    name: { type: String, required: true },
    update: { type: Date, default: Date.now },
    lat: SchemaTypes.Double,
    lon: SchemaTypes.Double,
    info: String,
    state: {
        type: String,
        enum: ['deleted', 'active']
    }

});


userPosSchema.set('timestamps', true); // include timestamps in docs

// apply the mongoose unique validator plugin to widgetSchema
userPosSchema.plugin(uniqueValidator);

var UserPos = mongoose.model('UserPos', userPosSchema);

module.exports = UserPos;