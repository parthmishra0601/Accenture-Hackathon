import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, ProgressBar, Table, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';

const TeamStats = () => {
  const [teamData, setTeamData] = useState([
    {
      name: "Software Installation Failure",
      tasksCompleted: 100,
      performance: "Excellent",
      issues: 0,
    },
    {
      name: "Network Connectivity Issue",
      tasksCompleted: 100,
      performance: "Excellent",
      issues: 0,
    },
    {
      name: "Device Compatibility Error",
      tasksCompleted: 100,
      performance: "Excellent",
      issues: 0,
    },
    {
      name: "Account Synchronization Bug",
      tasksCompleted: 100,
      performance: "Excellent",
      issues: 0,
    },
    {
      name: "Payment Gateway Integration Failure",
      tasksCompleted: 100,
      performance: "Excellent",
      issues: 0,
    }
  ]);


  const badgeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };


  return (
    <Container fluid className="py-4" style={{ backgroundColor: '#f8f9fa' }}>
      <motion.h2
        className="fw-bold mb-4 text-primary text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Team Performance Overview
      </motion.h2>

      <Row className="mb-4">
        {teamData.map((team, idx) => (
          <Col md={6} lg={4} key={idx}>
            <motion.Card
              className="mb-4 shadow-sm"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              style={{ borderRadius: '0.5rem', border: 'none' }}
            >
              <Card.Body>
                <Card.Title className="fw-bold" style={{ color: '#343a40' }}>{team.name}</Card.Title>
                <Card.Text className="mb-2">
                  Performance:{' '}
                  <motion.Badge
                    bg={
                      team.performance === 'Excellent'
                        ? 'success'
                        : team.performance === 'Good'
                          ? 'info'
                          : 'warning'
                    }
                    variants={badgeVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {team.performance}
                  </motion.Badge>
                </Card.Text>
                <ProgressBar now={team.tasksCompleted} label={`${team.tasksCompleted}%`} className="mb-3" style={{ height: '10px', borderRadius: '0.5rem' }} />
                <Card.Text className="text-muted">Open Issues: {team.issues}</Card.Text>
              </Card.Body>
            </motion.Card>
          </Col>
        ))}
      </Row>

      <motion.Card
        className="shadow-sm"
        style={{ borderRadius: '0.5rem', border: 'none' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5, delay: teamData.length * 0.1 } }}
      >
        <Card.Body>
          <Card.Title className="mb-3 fw-semibold text-success">Team Task Summary</Card.Title>
          <Table bordered hover responsive style={{ borderCollapse: 'collapse' }}>
            <thead className="table-primary" style={{ backgroundColor: '#007bff', color: 'white' }}>
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
                    <motion.Badge
                      bg={
                        team.performance === 'Excellent'
                          ? 'success'
                          : team.performance === 'Good'
                            ? 'info'
                            : 'warning'
                      }
                      variants={badgeVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {team.performance}
                    </motion.Badge>
                  </td>
                  <td>{team.issues}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </motion.Card>
    </Container>
  );
};

export default TeamStats;
