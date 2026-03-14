const express = require('express');
const router = express.Router();
const b2bController = require('../controllers/b2bController');

router.post('/', b2bController.createB2BProposal);
router.get('/', b2bController.getB2BProposals);

module.exports = router;
