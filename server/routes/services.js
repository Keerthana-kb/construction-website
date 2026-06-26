const router = require('express').Router();
const auth = require('../middleware/auth');
const Service = require('../models/Service');

// Public: Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ available: true });
    res.json(services);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Admin: Add service
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') 
      return res.status(403).json({ msg: 'Forbidden' });
    const service = await Service.create(req.body);
    res.json(service);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Admin: Update service
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') 
      return res.status(403).json({ msg: 'Forbidden' });
    const service = await Service.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    res.json(service);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Admin: Delete service
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') 
      return res.status(403).json({ msg: 'Forbidden' });
    await Service.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;