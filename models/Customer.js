var mongoose = require('mongoose');
var PersonModel = require('./Person').model;
var PhoneModel = {
    mobile: {
        type: String,
        required: true,
    },
    work: {
        type: String,
        required: true
    },

}
var PhoneSchema = mongoose.Schema(PhoneModel);

function merge_options(obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) {
        obj3[attrname] = obj1[attrname];
    }
    for (var attrname in obj2) {
        obj3[attrname] = obj2[attrname];
    }
    return obj3;
}

var CustomerModel = {
    companyName: {
        type: String,
        required: true
    },
    skype: {
        type: String,
        required: true
    },
    phone: PhoneSchema,
};

exports.model = merge_options(CustomerModel, PersonModel);