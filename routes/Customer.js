var mongoose = require('mongoose');
var CustomerModel = new require('../models/Customer').model;
var CustomerSchema = new mongoose.Schema(CustomerModel);

function formatPhone(obj) {
    var numbers = obj.replace(/\D/g, ''),
        char = {
            0: '',
            4: '-',
            8: '-',
            10: '-'
        };
    obj = '';
    for (var i = 0; i < numbers.length; i++) {
        obj += (char[i] || '') + numbers[i];
        if (i == 11) {
            break;
        }
    }
    return obj;
}

CustomerSchema.pre('update', function(next) {

    this._update["$set"].phone.mobile = formatPhone(this._update["$set"].phone.mobile);
    this._update["$set"].phone.work = formatPhone(this._update["$set"].phone.work);
    next();
});

CustomerSchema.pre('save', function(next) {
    this.phone.mobile = formatPhone(this.phone.mobile);
    this.phone.work = formatPhone(this.phone.work);
    next();
});
var Customer = mongoose.model('Customer', CustomerSchema, 'customers');

exports.get = function(req, res) {
    if (!req.params.id) {
        Customer.find(function(err, person) {
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
        Customer.findById(req.params.id, function(err, customer) {
            if (!err) {
                res.send(
                    customer
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
    var customer = new Customer(req.body);
    customer.save(function(err, person) {
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
        Customer.findById(req.params.id, function(err, docs) {

            if (!err) {
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