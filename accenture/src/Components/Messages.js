import React from 'react';
import { motion } from 'framer-motion';

const Messages = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container"
    >
      <h2 className="text-primary mb-4">Messages</h2>
      <p className="lead">Here you can view and respond to team and customer messages.</p>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">No new messages</h5>
          <p className="card-text">You're all caught up for now. New messages will appear here.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Messages;