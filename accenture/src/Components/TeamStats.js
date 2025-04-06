import React from 'react';
import { Container, Card, Row, Col, ProgressBar, Table, Badge } from 'react-bootstrap';

const TeamStats = () => {
  const teamData = [
    { name: 'Team Alpha', tasksCompleted: 75, performance: 'Excellent', issues: 2 },
    { name: 'Team Beta', tasksCompleted: 58, performance: 'Good', issues: 5 },
    { name: 'Team Gamma', tasksCompleted: 42, performance: 'Average', issues: 9 },
  ];

  return (
    <Container fluid className="py-4">
      <h2 className="fw-bold mb-4 text-primary">Team Performance Overview</h2>

      <Row className="mb-4">
        {teamData.map((team, idx) => (
          <Col md={4} key={idx}>
            <Card className="p-3 mb-3 shadow-sm">
              <h5 className="fw-bold">{team.name}</h5>
              <p className="mb-2">Performance: <Badge bg={team.performance === 'Excellent' ? 'success' : team.performance === 'Good' ? 'info' : 'warning'}>{team.performance}</Badge></p>
              <ProgressBar now={team.tasksCompleted} label={`${team.tasksCompleted}%`} className="mb-2" />
              <p className="text-muted">Issues Reported: {team.issues}</p>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="shadow-sm p-4">
        <h5 className="mb-3 fw-semibold">Team Task Summary</h5>
        <Table bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>Team</th>
              <th>Tasks Completed (%)</th>
              <th>Performance</th>
              <th>Open Issues</th>
            </tr>
          </thead>
          <tbody>
            {teamData.map((team, index) => (
              <tr key={index}>
                <td>{team.name}</td>
                <td>{team.tasksCompleted}%</td>
                <td>
                  <Badge bg={
                    team.performance === 'Excellent' ? 'success' :
                    team.performance === 'Good' ? 'info' : 'warning'
                  }>
                    {team.performance}
                  </Badge>
                </td>
                <td>{team.issues}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default TeamStats;
