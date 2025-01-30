import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ExpenseTrackingPage from './pages/ExpenseTrackingPage';
import RecordDisplayPage from './pages/RecordDisplayPage';
import ReportPage from './pages/ReportPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/expense-tracking" element={<ExpenseTrackingPage />} />
        <Route path="/record-display" element={<RecordDisplayPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </Router>
  );
};

export default App;
