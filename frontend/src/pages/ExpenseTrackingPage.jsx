import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is imported

const ExpenseTrackingPage = () => {
  const [type, setType] = useState('expense'); // Expense/Income
  const [category, setCategory] = useState('food'); // Category
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState(''); // Success or error message

  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side validation
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setMessage('Please enter a valid amount');
      return;
    }
    if (!date) {
      setMessage('Please select a date');
      return;
    }

    // Send POST request to the backend
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/records`, {
      type,
      category,
      amount,
      date,
      description,
    })
      .then(response => {
        setMessage('Record saved successfully');
        clearForm(); // Clear form fields
      })
      .catch(error => {
        setMessage(error.response?.data?.error || 'Error saving record');
      });
  };

  // Clear form fields
  const clearForm = () => {
    setType('expense');
    setCategory('food');
    setAmount('');
    setDate('');
    setDescription('');
  };

  return (
    <div className="expense-tracking-container">
      <h1>Expense Tracking</h1>
      <form onSubmit={handleSubmit}>
        {/* Expense/Income Type */}
        <div>
          <label>
            Type:
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </label>
        </div>

        {/* Category */}
        <div>
          <label>
            Category:
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="entertainment">Entertainment</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        {/* Amount */}
        <div>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </label>
        </div>

        {/* Date */}
        <div>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
        </div>

        {/* Description */}
        <div>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional, enter a note"
            />
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit">Save Record</button>
      </form>

      {/* Display Success/Error Message */}
      {message && <p style={{ color: message === 'Record saved successfully' ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
};

export default ExpenseTrackingPage;
