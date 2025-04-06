import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <Container fluid className="py-4">
      <h2 className="fw-bold mb-4 text-primary">Dashboard</h2>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Conversations</Card.Title>
              <Card.Text>Track and manage recent support conversations.</Card.Text>
              <a href="/conversation/1" className="btn btn-outline-primary btn-sm">View Conversations</a>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Upload Logs</Card.Title>
              <Card.Text>Upload conversation logs for analysis.</Card.Text>
              <a href="/upload" className="btn btn-outline-success btn-sm">Upload Now</a>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Team Performance</Card.Title>
              <Card.Text>Check team statistics and insights.</Card.Text>
              <a href="/team-stats" className="btn btn-outline-info btn-sm">View Stats</a>
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
