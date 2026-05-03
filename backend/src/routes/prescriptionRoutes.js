const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const { uploadPrescription, getMyPrescriptions } = require('../controllers/prescriptionController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, upload.single('prescription'), uploadPrescription);
router.get('/', protect, getMyPrescriptions);

module.exports = router;
