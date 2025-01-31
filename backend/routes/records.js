const express = require('express');
const Record = require('../models/Record');  // Import Record model

const router = express.Router();

// Add a new record
router.post('/', async (req, res) => {
    try {
        const { type, category, amount, date, description } = req.body;

        // Server-side validation
        if (!type || !category || !amount || !date) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        if (type !== 'expense' && type !== 'income') {
            return res.status(400).json({ error: 'Type must be either "expense" or "income"' });
        }
        if (isNaN(amount) || parseFloat(amount) <= 0) {
            return res.status(400).json({ error: 'Please enter a valid amount greater than zero' });
        }

        const newRecord = new Record({ type, category, amount, date, description });
        await newRecord.save();
        res.status(201).json({ message: 'Record saved successfully' });

    } catch (error) {
        console.error('Error saving record:', error);
        res.status(500).json({ error: 'Server error while saving record' });
    }
});

// Get all records
router.get('/', async (req, res) => {
    try {
        const records = await Record.find();
        res.status(200).json(records);
    } catch (err) {
        console.error('Error fetching records:', err);
        res.status(500).json({ message: 'Server error while fetching records' });
    }
});

// Delete a record
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const record = await Record.findByIdAndDelete(id);

        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json({ message: 'Record deleted successfully' });
    } catch (err) {
        console.error('Error deleting record:', err);
        res.status(500).json({ message: 'Server error while deleting record' });
    }
});

module.exports = router;
