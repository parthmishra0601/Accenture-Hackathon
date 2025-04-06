import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, ListGroup, Spinner, Alert, Row, Col, Image } from 'react-bootstrap';

const ConversationDetail = () => {
  const { id } = useParams();
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const mockTranscript = [
    { speaker: 'User', message: 'Hi, I need help with my order.' },
    { speaker: 'Support', message: 'Sure, can you provide your order ID?' },
    { speaker: 'User', message: 'It’s #12345.' },
    { speaker: 'Support', message: 'Thanks! Let me check the status for you.' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/api/conversations');
        const data = await res.json();
        const convo = data.find(item => item.conversation_id === id);
        if (convo) {
          setConversation(convo);
        } else {
          setError('Conversation not found.');
        }
      } catch (err) {
        setError('Failed to fetch conversation data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container"
    >
      <h2 className="mb-4 text-info">Conversation Detail - ID: {id}</h2>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {conversation && (
        <>
          {/* 🎤 Transcript */}
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-primary text-white">Conversation Transcript</Card.Header>
            <ListGroup variant="flush">
              {mockTranscript.map((msg, index) => (
                <ListGroup.Item key={index}>
                  <Row className="align-items-center">
                    <Col xs="auto">
                      <Image
                        src="/default-avatar.png"
                        alt={msg.speaker}
                        roundedCircle
                        width="40"
                        height="40"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/default-avatar.png'; // Fallback in case image fails
                        }}
                      />
                    </Col>
                    <Col>
                      <strong>{msg.speaker}:</strong> {msg.message}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>

          {/* 🧠 Issue Analysis */}
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-warning text-dark">Issue Analysis</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Issue Category:</strong> {conversation.issue_category}</ListGroup.Item>
              <ListGroup.Item><strong>Recommended Solution:</strong> {conversation.recommended_solution}</ListGroup.Item>
              <ListGroup.Item><strong>Assigned Team:</strong> {conversation.assigned_team}</ListGroup.Item>
            </ListGroup>
          </Card>

          {/* ✅ Tips */}
          <Card className="shadow-sm">
            <Card.Header className="bg-success text-white">Recommended Improvements</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>✅ Confirm order status clearly and promptly.</ListGroup.Item>
              <ListGroup.Item>✅ Always ask for user credentials early.</ListGroup.Item>
              <ListGroup.Item>✅ Avoid jargon or complex language in replies.</ListGroup.Item>
            </ListGroup>
          </Card>
        </>
      )}
    </motion.div>
  );
};

export default ConversationDetail;
