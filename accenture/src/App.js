import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Upload from './Components/Upload';
import ConversationDetail from './Components/ConversationsDetail';
import TeamStats from './Components/TeamStats';
import Messages from './Components/Messages';
import Reports from './Components/Reports';
import Settings from './Components/Settings';
import Login from './Components/Login';
import SidebarLayout from './Components/SidebarLayout'; // Make sure this exists
import { useAuthState } from './firebase'; // Adjust the import path as needed

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login page (no sidebar) */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes with sidebar */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SidebarLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="upload" element={<Upload />} />
          <Route path="conversation" element={<ConversationDetail />} />
          <Route path="team-stats" element={<TeamStats />} />
          <Route path="messages" element={<Messages />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
