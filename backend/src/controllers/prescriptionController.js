const Prescription = require('../models/Prescription');

// @desc    Upload prescription
// @route   POST /api/prescriptions
// @access  Private
exports.uploadPrescription = async (req, res, next) => {
    try {
        // For demonstration, we'll allow both real files and mock calls
        const { patientName, doctorName, dateOfIssue, notes } = req.body;

        // Ensure file was uploaded
        if (!req.file) {
            return res.status(400).json({ success: false, error: "Prescription file is required. Please attach a valid image or PDF." });
        }

        const prescription = await Prescription.create({
            user: req.user.id,
            patientName,
            doctorName,
            imageUrl: req.file.path,
            status: 'Pending',
            dateOfIssue: dateOfIssue || new Date(),
            notes: notes || ""
        });

        // Simulate background validation after a short delay
        setTimeout(async () => {
            try {
                await Prescription.findByIdAndUpdate(prescription._id, { status: 'Verified' });
            } catch (err) {
                console.error("Delayed verification failed:", err);
            }
        }, 8000);

        res.status(201).json({ success: true, data: prescription });
    } catch (error) {
        next(error);
    }
};

exports.getMyPrescriptions = async (req, res, next) => {
    try {
        let prescriptions = await Prescription.find({ user: req.user.id }).sort({ uploadedAt: -1 });

        // If empty, return some mocks for the VedaTrust vibe
        if (prescriptions.length === 0) {
            prescriptions = [
                {
                    _id: "mockp1",
                    patientName: "Jane Doe",
                    doctorName: "Dr. Alistair Vance",
                    status: "Verified",
                    uploadedAt: new Date(Date.now() - 86400000),
                    imageUrl: "https://example.com/rx1.jpg"
                },
                {
                    _id: "mockp2",
                    patientName: "Jane Doe",
                    doctorName: "Clinical Health Center",
                    status: "Pending",
                    uploadedAt: new Date(),
                    imageUrl: "https://example.com/rx2.jpg"
                }
            ];
        }

        res.status(200).json({ success: true, count: prescriptions.length, data: prescriptions });
    } catch (error) {
        next(error);
    }
};
