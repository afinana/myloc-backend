/*jslint node: true */
'use strict';

var mongoose = require('mongoose')
require('mongoose-double')(mongoose);


var SchemaTypes = mongoose.Schema.Types;
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');


// Route Schema
var routeSchema = new Schema({
    route_id: { type: String, required: true, index: true, unique: true },
    name: { type: String, required: true },
    update: { type: Date, default: Date.now },
    data: Object,
    info: String,
    state: { type: String, enum: ['deleted', 'active'] }

});
routeSchema.set('timestamps', true); // include timestamps in docs

// apply the mongoose unique validator plugin to widgetSchema
routeSchema.plugin(uniqueValidator);


var Route = mongoose.model('Route', routeSchema);

module.exports = Route;
