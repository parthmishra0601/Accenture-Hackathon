import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import io from 'socket.io-client';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.current = io('http://localhost:5000'); // Connect to your SocketIO server

    socket.current.on('connect', () => {
      console.log('Connected to WebSocket for Messages');
    });

    socket.current.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.current.on('disconnect', () => {
      console.log('Disconnected from WebSocket for Messages');
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageObject = {
        text: newMessage,
        sender: 'user', // You might want to identify the user dynamically
      };
      socket.current.emit('send_message', messageObject);
      setMessages((prevMessages) => [...prevMessages, messageObject]);
      setNewMessage('');
    }
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container"
    >
      <h2 className="text-primary mb-4">Messages</h2>
      <div className="message-container mt-3" style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === 'user' ? 'user-message' : 'server-message'} mb-2`}
            style={{
              backgroundColor: msg.sender === 'user' ? '#e0f7fa' : '#f0f0f0',
              padding: '8px',
              borderRadius: '5px',
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '70%',
              marginLeft: msg.sender !== 'user' ? '0' : 'auto',
              marginRight: msg.sender === 'user' ? '0' : 'auto',
              textAlign: msg.sender === 'user' ? 'right' : 'left',
            }}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-group mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your message..."
          value={newMessage}
          onChange={handleInputChange}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Messages;