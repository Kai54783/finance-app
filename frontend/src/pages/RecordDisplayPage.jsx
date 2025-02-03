// src/pages/RecordDisplayPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecordDisplayPage.css';

const RecordDisplayPage = () => {
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch records when the component loads
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/records`)
      .then((response) => {
        console.log(response.data);  // Log data for debugging
        setRecords(response.data); // Set records to state
      })
      .catch((error) => {
        console.error('Error fetching records:', error);
        setMessage('Unable to load records');
      });
  }, []);
  

  const handleDelete = (id) => {
    // Send delete request to backend API
    axios.delete(`${import.meta.env.VITE_API_BASE_URL}/records/${id}`)
      .then(() => {
        // Remove the deleted record from local state
        setRecords(records.filter((record) => record._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting record:', error);
        setMessage('Unable to delete record');
      });
  };

  // Calculate total income, total expenses, and balance
  const totalIncome = records
    .filter((record) => record.type === 'income')
    .reduce((sum, record) => sum + record.amount, 0);

  const totalExpense = records
    .filter((record) => record.type === 'expense')
    .reduce((sum, record) => sum + record.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div>
      <h1>Record Display</h1>

      {/* Display error message */}
      {message && <p style={{ color: 'red' }}>{message}</p>}

      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record._id}> {/* Use _id as a unique identifier */}
              <td>{record.type === 'expense' ? 'Expense' : 'Income'}</td>
              <td>{record.category}</td>
              <td>{record.amount}</td>
              <td>{record.date}</td>
              <td>{record.description}</td>
              <td>
                <button onClick={() => handleDelete(record._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <p>Total Income: {totalIncome}</p>
        <p>Total Expense: {totalExpense}</p>
        <p>Balance: {balance}</p>
      </div>
    </div>
  );
};

export default RecordDisplayPage;
