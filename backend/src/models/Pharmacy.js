const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a pharmacy name'],
        unique: true
    },
    licenseNo: {
        type: String,
        required: [true, 'Please add a license number'],
        unique: true
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    },
    isVerified: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Pharmacy', pharmacySchema);
