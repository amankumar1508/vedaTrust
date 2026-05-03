const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    patientName: {
        type: String,
        required: [true, 'Please add the patient name']
    },
    doctorName: {
        type: String,
        required: [true, 'Please add the doctor name']
    },
    imageUrl: {
        type: String,
        required: [true, 'Please upload a prescription image']
    },
    status: {
        type: String,
        enum: ['Pending', 'Verified', 'Rejected'],
        default: 'Pending'
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
