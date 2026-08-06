const express = require('express');
const router = express.Router();
const NGO = require('../models/NGO');

router.post('/', async (req, res) => {
  try {
    const ngo = new NGO(req.body);
    await ngo.save();
    res.json(ngo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const ngos = await NGO.find();
    res.json(ngos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;