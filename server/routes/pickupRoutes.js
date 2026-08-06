const express = require('express');
const router = express.Router();
const Pickup = require('../models/Pickup');

router.post('/', async (req, res) => {
  try {
    const pickup = new Pickup(req.body);
    await pickup.save();
    res.json(pickup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const pickups = await Pickup.find();
    res.json(pickups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;