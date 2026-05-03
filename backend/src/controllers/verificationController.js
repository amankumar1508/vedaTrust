const ScanHistory = require('../models/ScanHistory');

// @desc    Verify a medicine
// @route   POST /api/verify
// @access  Private
exports.verifyMedicine = async (req, res, next) => {
    try {
        const { medicineName, batchId, manufacturer, expiryDate } = req.body;

        // Make mock data slightly more dynamic based on batchId prefix
        let mockMedName = medicineName || "Amoxicillin 500mg";
        let mockManufacturer = manufacturer || "Global Pharma Industries";
        
        if (batchId.startsWith('AZ')) {
            mockMedName = "Aspirin 100mg";
            mockManufacturer = "AstraZeneca Labs";
        } else if (batchId.startsWith('PF')) {
            mockMedName = "Paracetamol 650mg";
            mockManufacturer = "Pfizer Health";
        }

        // Mock verification logic: if batchId contains 'X' or 'FAKE', it's counterfeit
        let status = 'Authentic';
        if (batchId.toUpperCase().includes('X') || batchId.toUpperCase().includes('FAKE')) {
            status = 'Counterfeit';
        }

        const scan = await ScanHistory.create({
            user: req.user.id,
            medicineName: mockMedName,
            batchId,
            manufacturer: mockManufacturer,
            expiryDate: expiryDate || new Date(Date.now() + 31536000000),
            status
        });

        // Add additional mock data for the high-fidelity UI
        const detailedData = {
            ...scan._doc,
            safetyScore: status === 'Authentic' ? 95 : 12,
            manufacturerDetails: {
                location: "Basel, Switzerland",
                licenseNo: "MFG-22049-GP",
                manufactureDate: "Oct 2023"
            },
            journey: [
                { location: "Basel, Switzerland", type: "Manufacture", date: "Oct 24, 2023" },
                { location: "Frankfurt, DE", type: "Distribution", date: "Nov 02, 2023" },
                { location: "New York, USA", type: "Pharmacy", date: "Dec 15, 2023" }
            ],
            auditTrail: [
                { event: "Verified by User", details: "Scanned via VedaTrust App", date: "Today, 04:30 PM EST", status: "completed" },
                { event: "Received at Pharmacy", details: "City Health Pharmacy, NY", date: "15 Oct 2023, 10:15 AM EST", status: "completed" },
                { event: "National Distributor Clearance", details: "PharmaLogistics US Hub, NJ", date: "22 Oct 2023, 11:45 AM EST", status: "completed" },
                { event: "Customs Cleared (Import)", details: "JFK International Airport, NY", date: "18 Oct 2023, 08:30 AM EST", status: "completed" },
                { event: "Manufactured & Packaged", details: "Global Pharma Industries, Basel Facility (CH)", date: "05 Oct 2023, 03:00 AM CET", status: "completed" }
            ]
        };

        res.status(201).json({
            success: true,
            data: detailedData
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Get all scans for current user
// @route   GET /api/verify/history
// @access  Private
exports.getScanHistory = async (req, res, next) => {
    try {
        const history = await ScanHistory.find({ user: req.user.id }).sort('-scanDate');

        res.status(200).json({
            success: true,
            count: history.length,
            data: history
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
