const mongoose = require('mongoose');

const scanHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    medicineName: {
        type: String,
        required: [true, 'Please add a medicine name']
    },
    batchId: {
        type: String,
        required: [true, 'Please add a batch ID']
    },
    status: {
        type: String,
        enum: ['Authentic', 'Counterfeit', 'Warning'],
        default: 'Authentic'
    },
    manufacturer: {
        type: String,
        required: [true, 'Please add a manufacturer']
    },
    expiryDate: {
        type: Date,
        required: [true, 'Please add an expiry date']
    },
    scanDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ScanHistory', scanHistorySchema);
