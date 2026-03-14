const express = require('express');
const router = express.Router();
const impactController = require('../controllers/impactController');

router.get('/', impactController.getImpactReports);
router.get('/summary', impactController.getImpactSummary);

module.exports = router;
