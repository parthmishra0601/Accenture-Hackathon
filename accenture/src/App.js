import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Upload from './Components/Upload';
import ConversationDetail from './Components/ConversationsDetail';
import TeamStats from './Components/TeamStats';
import Messages from './Components/Messages';
import Reports from './Components/Reports';
import Settings from './Components/Settings';
import SidebarLayout from './Components/SidebarLayout';
import Login from './Components/Login';
import SignUp from './Components/SignUp';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes WITHOUT Sidebar */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Routes WITH Sidebar */}
        <Route element={<SidebarLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/conversation" element={<ConversationDetail />} />
          <Route path="/team-stats" element={<TeamStats />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
