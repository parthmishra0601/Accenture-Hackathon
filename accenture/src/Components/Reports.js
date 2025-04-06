import React from 'react';
import { motion } from 'framer-motion';

const Reports = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container"
    >
      <h2 className="text-success mb-4">Reports</h2>
      <p className="lead">Generate and view detailed team reports and analytics.</p>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">Monthly Performance</h5>
          <p className="card-text">Download the monthly report to analyze team performance.</p>
          <button className="btn btn-success">Download Report</button>
        </div>
      </div>
    </motion.div>
  );
};

export default Reports;