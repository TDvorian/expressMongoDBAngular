var mongoose = require('mongoose');
var PersonModel = require('../models/Person').model;
var PersonSchema = mongoose.Schema(PersonModel);
var Person = mongoose.model('Person', PersonSchema, 'users');

mongoose.connect('mongodb://localhost:27017/test');

exports.get = function(req, res) {
    if (!req.params.id) {
        Person.find(function(err, person) {
            if (!err) {
                res.send(
                    person
                );
            } else {
                res.send(400, {
                    error: err
                });
            }
        });
    } else {
        Person.findById(req.params.id, function(err, person) {
            if (!err) {
                res.send(
                    person
                );
            } else {
                res.json({
                    error: err
                });
            }
        });
    }
};

exports.post = function(req, res) {
    var person = new Person(req.body);
    person.save(function(err, person) {
        if (err) return res.json({
            error: err
        });
        res.json({
            result: "OK Insert"
        });
    });
};

exports.put = function(req, res) {
    if (req.params.id) {
        Person.findById(req.params.id, function(err, docs) {
            if (!err) {
                console.error(req.body);
                docs.update(req.body, function(err) {
                    if (!err) {
                        res.json({
                            result: "OK update"
                        });
                    } else {
                        res.json({
                            error: err
                        });
                    }
                });
            } else {
                res.json(400, {
                    error: err
                });
            }
        });
    } else {
        res.json(400, {
            error: "id null or undefined"
        });
    }
};

exports.del = function(req, res) {
    if (req.params.id) {
        Person.remove({
            _id: req.params.id
        }, function(err) {
            if (!err) {
                res.json({
                    result: "OK Delete"
                });
            } else {
                res.json({
                    error: err
                });
            }
        });
    } else {
        res.json(400, {
            error: "id null or undefined"
        });
    }
};