/*jslint node: true */
'use strict';

var mongoose = require('mongoose')
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');


// Alert Schema
var alertSchema = new Schema({
    alert_id: { type: String, required: true, index: true, unique: true },
    name: { type: String, required: true },
    user_id: String,
    update: { type: Date, default: Date.now },
    lat: SchemaTypes.Double,
    lon: SchemaTypes.Double,
    info: String,
    state: { type: String, enum: ['deleted', 'active'] }

});




alertSchema.set('timestamps', true); // include timestamps in docs

// apply the mongoose unique validator plugin to widgetSchema
alertSchema.plugin(uniqueValidator);


var Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;
