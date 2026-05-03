const Pharmacy = require('../models/Pharmacy');

// @desc    Get all pharmacies
// @route   GET /api/pharmacies
// @access  Public
exports.getPharmacies = async (req, res, next) => {
    try {
        let pharmacies = await Pharmacy.find();

        // If no pharmacies, return detailed mock data for demonstration
        if (pharmacies.length === 0) {
            pharmacies = [
                {
                    _id: "mock1",
                    name: "City Health Pharmacy",
                    address: "123 Healthcare Ave, Basel, CH",
                    licenseNo: "LIC-CH-001",
                    rating: 4.8,
                    isVerified: true,
                    phone: "+41 61 123 4567",
                    operatingHours: "08:00 AM - 10:00 PM",
                    distance: "0.8 km",
                    status: "Open Now",
                    vettedStatus: "Platinum",
                    inventoryPreview: ["Amoxicillin", "Paracetamol", "Insulin"]
                },
                {
                    _id: "mock2",
                    name: "Global Wellness Apothecary",
                    address: "45 Wellness Blvd, Berlin, DE",
                    licenseNo: "LIC-GW-002",
                    rating: 4.5,
                    isVerified: true,
                    phone: "+49 30 765 4321",
                    operatingHours: "09:00 AM - 09:00 PM",
                    distance: "2.4 km",
                    status: "Open Now",
                    vettedStatus: "Gold",
                    inventoryPreview: ["Metformin", "Atorvastatin", "Aspirin"]
                },
                {
                    _id: "mock3",
                    name: "St. Mary's Medical Repository",
                    address: "89 Chapel St, New York, NY",
                    licenseNo: "LIC-SM-003",
                    rating: 4.2,
                    isVerified: true,
                    phone: "+1 212 555 0199",
                    operatingHours: "24 Hours",
                    distance: "3.1 km",
                    status: "Open Now",
                    vettedStatus: "Silver",
                    inventoryPreview: ["Epinephrine", "Gabapentin", "Lisinopril"]
                }
            ];
        } else {
            // Map real data to include extra fields if needed
            pharmacies = pharmacies.map(p => ({
                ...p._doc,
                phone: "+91 98765 43210",
                operatingHours: "10:00 AM - 08:00 PM",
                distance: "1.5 km",
                status: "Open Now",
                vettedStatus: "Platinum",
                inventoryPreview: ["Medicine A", "Medicine B"]
            }));
        }

        res.status(200).json({ success: true, count: pharmacies.length, data: pharmacies });
    } catch (error) {
        next(error);
    }
};

exports.getPharmacy = async (req, res, next) => {
    try {
        const pharmacy = await Pharmacy.findById(req.params.id);
        if (!pharmacy) {
            return res.status(404).json({ success: false, error: 'Pharmacy not found' });
        }
        res.status(200).json({
            success: true, data: {
                ...pharmacy._doc,
                phone: "+91 98765 43210",
                operatingHours: "10:00 AM - 08:00 PM",
                distance: "1.5 km",
                status: "Open Now",
                vettedStatus: "Platinum",
                inventoryPreview: ["Medicine A", "Medicine B"]
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.createPharmacy = async (req, res, next) => {
    try {
        const pharmacy = await Pharmacy.create(req.body);
        res.status(201).json({ success: true, data: pharmacy });
    } catch (error) {
        next(error);
    }
};
