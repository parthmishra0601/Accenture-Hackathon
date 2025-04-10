import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [conversationCount, setConversationCount] = useState(0);
  const [uploadCount, setUploadCount] = useState(0);
  const [teamPerformanceSummary, setTeamPerformanceSummary] = useState('');

  useEffect(() => {
    // Example: Hardcoded data for the dashboard based on the CSV content.  REPLACE THIS with a real API call in a real app!

    //In a real application, data like the conversation count and team performance would be obtained from an API
    setConversationCount(16); // Total number of tickets in the CSV
    setUploadCount(1); // Assuming you upload the CSV file only once

    // Based on the CSV file where most issues are resolved and performance is excellent.
    setTeamPerformanceSummary('Excellent - All issue categories performing well with 100% resolution rate');

  }, []);

  return (
    <Container fluid className="py-4">
      <h2 className="fw-bold mb-4 text-primary">Dashboard</h2>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Conversations</Card.Title>
              <Card.Text>Track and manage recent support conversations.</Card.Text>
              <Card.Text><strong>{conversationCount}</strong> recent conversations</Card.Text>
              <Link to="/conversation" className="btn btn-outline-primary btn-sm">
                View Conversations
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Upload Logs</Card.Title>
              <Card.Text>Upload conversation logs for analysis.</Card.Text>
              <Card.Text><strong>{uploadCount}</strong> uploads in last day</Card.Text>
              <Link to="/upload" className="btn btn-outline-success btn-sm">
                Upload Now
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Team Performance</Card.Title>
              <Card.Text>Check team statistics and insights.</Card.Text>
              <Card.Text><strong>{teamPerformanceSummary}</strong></Card.Text>
              <Link to="/team-stats" className="btn btn-outline-info btn-sm">
                View Stats
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="p-4 bg-light border-0 shadow-sm">
        <h5 className="mb-2 fw-semibold">Quick Tips</h5>
        <ul className="mb-0 ps-3">
          <li>Upload logs frequently for accurate reporting.</li>
          <li>Use filters in conversations for better insights.</li>
          <li>Monitor team stats weekly to improve performance.</li>
        </ul>
      </Card>
    </Container>
  );
};

export default Dashboard;
