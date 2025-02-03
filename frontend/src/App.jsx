import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ExpenseTrackingPage from './pages/ExpenseTrackingPage';
import RecordDisplayPage from './pages/RecordDisplayPage';
import ReportPage from './pages/ReportPage';

const App = () => {
  return (
    <Router>
      <div>
        <NavigationButtons /> {/* 把導航按鈕放在這裡 */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/expense-tracking" element={<ExpenseTrackingPage />} />
          <Route path="/record-display" element={<RecordDisplayPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </div>
    </Router>
  );
};

// 將 `useNavigate()` 放入 Functional Component
const NavigationButtons = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <button onClick={() => navigate("/")}>Go to Login</button>
      <button onClick={() => navigate("/expense-tracking")}>Go to Expense Tracking</button>
      <button onClick={() => navigate("/record-display")}>Go to Records</button>
      <button onClick={() => navigate("/report")}>Go to Report</button>
    </div>
  );
};

export default App;
