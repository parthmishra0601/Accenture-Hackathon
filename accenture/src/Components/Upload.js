import React from 'react';
import { Container, Card, Button, Form, Row, Col, Alert } from 'react-bootstrap';

const Upload = () => {
  return (
    <Container fluid className="py-4">
      <h2 className="fw-bold mb-4 text-success">Upload Conversation</h2>

      <Row>
        <Col md={8}>
          <Card className="p-4 shadow-sm mb-4">
            <Form>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label className="fw-semibold">Select conversation file (CSV, TXT, or JSON)</Form.Label>
                <Form.Control type="file" />
                <Form.Text className="text-muted">
                  Ensure the file is formatted correctly for processing.
                </Form.Text>
              </Form.Group>

              <Button variant="success" type="submit">
                Upload File
              </Button>
            </Form>
          </Card>

          <Alert variant="info">
            📘 <strong>Tip:</strong> After uploading, the system will automatically extract conversation insights and show them in the Dashboard.
          </Alert>
        </Col>

        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h5 className="mb-3 fw-bold text-secondary">File Format Guidelines</h5>
            <ul className="list-unstyled">
              <li>✅ CSV should include: <code>timestamp, user, message</code></li>
              <li>✅ JSON should be an array of conversation objects</li>
              <li>✅ TXT should be plain text with line breaks separating messages</li>
              <li>🚫 No password-protected files</li>
              <li>🚫 Max file size: <strong>5MB</strong></li>
            </ul>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Upload;
