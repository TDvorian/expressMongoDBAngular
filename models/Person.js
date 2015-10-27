var mongoose = require('mongoose');

var PersonNameModel = {
    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },

};

var PersonNameSchema = mongoose.Schema(PersonNameModel);

var PersonModel = {
    name: PersonNameSchema,
    dateOfBirth: {
        type: Date,
        equired: true
    }
};

exports.model = PersonModel;