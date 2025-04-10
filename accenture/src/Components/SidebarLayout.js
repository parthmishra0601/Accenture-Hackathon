import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home, UploadCloud, Users, Menu, X,
  MessageCircle, FileText, Settings, LifeBuoy, LogOut
} from 'lucide-react';
import { Image } from 'react-bootstrap';

const SidebarLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null); // State to store logged-in user info

  useEffect(() => {
    // 1. Retrieve user info from localStorage
    const storedUser = localStorage.getItem('user'); // Or whatever key you used

    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }

    // 2. (Optional) Redirect to login if no user is found
    if (!storedUser) {
      navigate('/login'); // Ensure user is logged in
    }
  }, [navigate]);  // Add navigate as a dependency to useEffect

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={18} /> },
    { name: 'Upload Conversation', path: '/upload', icon: <UploadCloud size={18} /> },
    { name: 'Conversation Details', path: '/conversation', icon: <MessageCircle size={18} /> },
    { name: 'Team Stats', path: '/team-stats', icon: <Users size={18} /> },
    { name: 'Messages', path: '/messages', icon: <MessageCircle size={18} /> },
    { name: 'Reports', path: '/reports', icon: <FileText size={18} /> },
  ];

  const secondaryItems = [
    { name: 'Settings', path: '/settings', icon: <Settings size={18} /> },
    { name: 'Logout', path: '/logout', icon: <LogOut size={18} /> },
  ];

  const handleSecondaryClick = (item) => {
    if (item.name === 'Logout') {
      localStorage.removeItem('user'); // Clear user data on logout
      navigate('/login');
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -150 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.4 }}
        className="bg-dark text-white shadow-lg position-relative"
        style={{ width: isOpen ? '250px' : '0', overflow: 'hidden' }}
      >
        {/* Collapse Button */}
        <button
          className="btn btn-outline-light position-absolute top-0 end-0 m-2"
          onClick={toggleSidebar}
        >
          <X size={20} />
        </button>

        {/* Branding */}
        <div className="text-center py-4 border-bottom border-secondary">
          <h3 className="fw-bold mb-0">
            <span className="text-primary">Support</span>Bot
          </h3>
        </div>

        {/* User Profile */}
        <div className="d-flex flex-column align-items-center py-4">
          <Image
            src="https://images.unsplash.com/photo-1557862921-378a7b7841c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=60"
            roundedCircle
            className="mb-2"
            alt="User Avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/80/cccccc/808080?Text=Fallback";
            }}
          />
          <p className="mb-0">
            Hello, <strong>{loggedInUser ? loggedInUser.username : 'User'}</strong>
          </p>
        </div>

        {/* Main Nav */}
        <nav className="nav flex-column px-3 gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link d-flex align-items-center gap-2 rounded px-3 py-2 position-relative ${
                location.pathname === item.path ? 'bg-primary text-white' : 'text-light'
              }`}
              style={{ transition: '0.3s' }}
            >
              {location.pathname === item.path && (
                <motion.div
                  layoutId="activeIndicator"
                  className="position-absolute start-0 top-0 bottom-0 bg-white"
                  style={{ width: '5px', borderRadius: '0 3px 3px 0' }}
                />
              )}
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <hr className="border-secondary mx-3 my-3" />

        {/* Secondary Nav */}
        <nav className="nav flex-column px-3 gap-2">
          {secondaryItems.map((item) => (
            <div
              key={item.path}
              onClick={() => handleSecondaryClick(item)}
              className={`nav-link d-flex align-items-center gap-2 rounded px-3 py-2 position-relative ${
                location.pathname === item.path ? 'bg-primary text-white' : 'text-light'
              }`}
              style={{ transition: '0.3s', cursor: 'pointer' }}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
      </motion.div>

      {/* Sidebar Toggle */}
      {!isOpen && (
        <button
          className="btn btn-dark position-absolute m-2"
          onClick={toggleSidebar}
          style={{ zIndex: 1000 }}
        >
          <Menu size={20} />
        </button>
      )}

      {/* Main Content */}
      <main className="flex-grow-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;