/*jslint node: true */
'use strict';

var mongoose = require('mongoose');
var path = require('path');
var log = require(path.join(__dirname, '../../log'));
var config = require(path.join(__dirname, '../../config/config'));
var Alert = mongoose.model('Alert');

var PATH = '/alerts';
var VERSION = '1.0.0';

module.exports = function (server) {
  server.get({path: PATH, version: VERSION}, findDocuments);
  server.get({path: PATH + '/:id', version: VERSION}, findOneDocument);
  server.post({path: PATH, version: VERSION}, createDocument);
  server.put({path: PATH, version: VERSION}, updateDocument);
  server.del({path: PATH + '/:id', version: VERSION}, deleteDocument);

  function findDocuments(req, res, next) {
    // http://mongoosejs.com/docs/api.html#model_Model.find
    
    var conditions = {};
    var projection = {};
    var options = {};

    Alert.find(conditions, projection, options).sort({'name': 1}).exec(function (error, alerts) {
      if (error) {
        log.info('findDocuments *******data:\n %s \n*******\n error:%s\n', alerts, error);

        return next(error);
      } else {
        log.info('findDocuments *******data:\n %s', alerts);
        res.header('X-Total-Count', alerts.length);
        res.send(200, alerts);
        return next();
      }
    });
  }

  function findOneDocument(req, res, next) {
    // http://mongoosejs.com/docs/api.html#model_Model.findOne
    var conditions = {'alert_id': req.params.alert_id};
    var projection = {};
    var options = {};

    Alert.findOne(conditions, projection, options, function (error, alert) {

      log.info('findOne *******data:\n %s \n*******\n error:%s\n', alert, error);

      if (error) {
        return next(error);
      } else {
        
        res.send(200, alert);
        return next();
      }
    });
  }

  function createDocument(req, res, next) {

      var alert = new Alert({
          alert_id: req.params.alert_id,
          name: req.params.name,
          user_id: req.params.user_id,
          update: req.params.update,
          lat: req.params.lat,
          lon: req.params.lon,
          info: req.params.info,
          state: req.params.state 
      });
    
      

    // http://mongoosejs.com/docs/api.html#model_Model-save
    alert.save(function (error, myAlert) {
      log.info('createDocument *******data:\n %s \n*******\n error:%s\n', myAlert, error);

      if (error) {
        return next(error);
      } else {
        res.send(201, myAlert);
        return next();
      }
    });
  }

  function updateDocument(req, res, next) {
    // http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
    var conditions = { 'alert_id': req.params.alert_id};
    var update = {
      'name': req.params.name,
      'user_id': req.params.user_id,
      'lat': req.params.lat,
      'lon': req.params.lon,
      'info': req.params.info,
      'state': req.params.state 
    };
    var options = {runValidators: true, context: 'query'};

    Alert.findOneAndUpdate(conditions, update, options, function (error) {
      
      if (error) {
        return next(error);
      } else {
        res.send(200);
        return next();
      }
    });
  }

  function deleteDocument(req, res, next) {
    // http://mongoosejs.com/docs/api.html#query_Query-remove
    var options = {'alert_id': req.params.alert_id};

    Alert.remove(options, function (error) {
      if (error) {
        return next(error);
      } else {
        res.send(204);
        return next();
      }
    });
  }
};
