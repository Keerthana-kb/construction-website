const router = require('express').Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');

// Customer: Create booking
router.post('/', auth, async (req, res) => {
  try {
    const booking = await Booking.create({ 
      ...req.body, 
      customer: req.user.id 
    });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Customer: Get my bookings
router.get('/my', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user.id })
      .populate('service');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Admin: Get all bookings
router.get('/all', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') 
      return res.status(403).json({ msg: 'Forbidden' });
    const bookings = await Booking.find()
      .populate('service')
      .populate('customer', 'name email');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Admin: Update booking status
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') 
      return res.status(403).json({ msg: 'Forbidden' });
    const booking = await Booking.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;