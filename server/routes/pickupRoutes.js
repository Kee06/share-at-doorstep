const express = require('express');
const router = express.Router();
const Pickup = require('../models/Pickup');

router.post('/', async (req, res) => {
  try {
    const { service, items } = req.body;

    // 1. Get base price from the service (default to 0 if not provided)
    let basePrice = service && service.price ? service.price : 0;

    // 2. Calculate extra cost based on the items array and quantities
    let itemsTotal = 0;
    if (items && Array.isArray(items)) {
      items.forEach(item => {
        const qty = item.qty || 1;
        const pricePerUnit = item.price || 5; // Example rate: $5 per item unit
        itemsTotal += qty * pricePerUnit;
      });
    }

    // 3. Combine them to get the final computed price
    const calculatedFinalPrice = basePrice + itemsTotal;

    // 4. Create the pickup document with the dynamically computed price
    const pickup = new Pickup({
      ...req.body,
      finalPrice: calculatedFinalPrice
    });

    await pickup.save();
    res.json({
      message: "Pickup created successfully with dynamic pricing!",
      pickup
    });
    
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