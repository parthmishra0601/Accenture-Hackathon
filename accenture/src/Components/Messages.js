import React, { useState, useRef, useEffect } from 'react';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

const AnimatedBackground = () => {
  const { scrollYProgress } = useViewportScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ['#f8f9fa', '#e9ecef']
  );
  const opacity1 = useTransform(scrollYProgress, [0, 0.5], [0.1, 0.5]);
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.8], [0.5, 0.1]);
  const y1 = useTransform(scrollYProgress, [0, 1], ['0vh', '15vh']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['-5vh', '5vh']);
  const scale1 = useTransform(scrollYProgress, [0, 0.7], [1, 1.1]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], ['0deg', '30deg']);

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full z-[-1]"
      style={{ backgroundColor }}
    >
      <motion.div
        className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-primary blur-lg"
        style={{ y: y1, opacity: opacity1, scale: scale1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-info blur-md"
        style={{ y: y2, opacity: opacity2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-warning blur-xl"
        style={{ opacity: useTransform(scrollYProgress, [0.2, 0.9], [0.3, 0]) }}
      />
    </motion.div>
  );
};

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      text: newMessage,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch('http://localhost:5000/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: newMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Expected JSON but received: ${contentType}`);
      }

      const data = await response.json();

      if (data && data.match) {
        const { match } = data;
        const relevantData = `
          Category: ${match.category}\n
          Sentiment: ${match.sentiment} | Priority: ${match.priority}\n
          Solution: ${match.solution}\n
          Conversation:\n${match.conversation.map((line) => `  ${line}`).join('\n')}\n
        `;

        const serverReply = {
          text: relevantData,
          sender: 'server',
        };
        setMessages((prev) => [...prev, serverReply]);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: 'No matching support data found.', sender: 'server' },
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { text: 'Error contacting server.', sender: 'server' },
      ]);
    }

    setNewMessage('');
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="position-relative bg-light vh-100">
      <AnimatedBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mt-5 p-4 rounded shadow-lg bg-white bg-opacity-90"
        style={{ maxWidth: '600px' }}
      >
        <h2 className="text-primary mb-4">Chat with Support</h2>
        <div
          className="message-container mt-3 p-3 rounded overflow-y-auto bg-light shadow-sm"
          style={{ height: '400px', border: '1px solid #ddd' }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded ${
                msg.sender === 'user'
                  ? 'bg-info text-white align-self-end'
                  : 'bg-secondary text-white align-self-start'
              } d-flex flex-column`}
              style={{
                maxWidth: '70%',
                fontSize: '1.1rem',
                alignSelf:
                  msg.sender === 'user' ? 'flex-end' : 'flex-start',
                whiteSpace: 'pre-line',
              }}
            >
              <small
                className={`text-${
                  msg.sender === 'user' ? 'light' : 'light'
                } font-italic`}
              >
                {msg.sender === 'user' ? 'You' : 'Support'}
              </small>
              <span>{msg.text}</span>
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Messages;
