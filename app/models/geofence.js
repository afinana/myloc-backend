/*jslint node: true */
'use strict';

var mongoose = require('mongoose')
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');


// Geofence schema
var geofenceSchema = new Schema({
    geofence_id: { type: String, required: true, index: true, unique: true },
    name: { type: String, required: true },
    update: { type: Date, default: Date.now },
    lat: SchemaTypes.Double,
    lon: SchemaTypes.Double,
    radious: SchemaTypes.String,
    duration: { type: Date },
    state: { type: String, enum: ['deleted', 'active'] }

});


geofenceSchema.set('timestamps', true); // include timestamps in docs

// apply the mongoose unique validator plugin to Schema
geofenceSchema.plugin(uniqueValidator);

var Geofence = mongoose.model('Geofence', geofenceSchema);

module.exports = Geofence;


