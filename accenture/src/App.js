import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Upload from './Components/Upload';
import ConversationDetail from './Components/ConversationsDetail';
import TeamStats from './Components/TeamStats';
import Messages from './Components/Messages';
import Reports from './Components/Reports';
import Settings from './Components/Settings';
// import Login from './Components/Login'; // Removed Login import
import SidebarLayout from './Components/SidebarLayout'; // Make sure this exists
// import { useAuthState } from './firebase'; // No longer needed for direct protection

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes with sidebar */}
        <Route
          path="/*"
          element={<SidebarLayout />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="upload" element={<Upload />} />
          <Route path="conversation" element={<ConversationDetail />} />
          <Route path="team-stats" element={<TeamStats />} />
          <Route path="messages" element={<Messages />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          {/* Redirect root to dashboard */}
          <Route index element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;