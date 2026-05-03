const express = require('express');
const { verifyMedicine, getScanHistory } = require('../controllers/verificationController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, verifyMedicine);
router.get('/history', protect, getScanHistory);

module.exports = router;
