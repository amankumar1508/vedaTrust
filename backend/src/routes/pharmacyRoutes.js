const express = require('express');
const { getPharmacies, getPharmacy, createPharmacy } = require('../controllers/pharmacyController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getPharmacies);
router.get('/:id', getPharmacy);
router.post('/', protect, createPharmacy); // Protected for now as it's an admin/internal action

module.exports = router;
