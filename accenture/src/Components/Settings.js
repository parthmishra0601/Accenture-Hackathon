import React from 'react';
import { motion } from 'framer-motion';

const Settings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container"
    >
      <h2 className="text-warning mb-4">Settings</h2>
      <p className="lead">Update your preferences and account settings.</p>
      <div className="card mt-3">
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label className="form-label">Email Notifications</label>
              <select className="form-select">
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Theme</label>
              <select className="form-select">
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>
            <button type="submit" className="btn btn-warning">Save Settings</button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
