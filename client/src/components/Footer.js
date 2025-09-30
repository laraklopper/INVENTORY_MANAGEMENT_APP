import React, { useEffect, useState } from 'react'
import '../CSS/Footer.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
export default function Footer({currentUser, logout}) {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date())
        }, 1000)
        return () => clearInterval(timer);
    },[])
  return (
    <footer id='footer'>
        <Row>
            <Col>
                  <Stack direction="horizontal" gap={3}>
                      <div className="p-2">
                          <Card>
                              <Card.Header>Featured</Card.Header>
                              <ListGroup variant="flush">
                                  <ListGroup.Item>
                                      <h5 id='status'>Logged in as: {currentUser.admin ? 'Admin' : 'User'}</h5>
                                  </ListGroup.Item>
                                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                              </ListGroup>
                          </Card>
                         

                      </div>
                      <div className="p-2 ms-auto"></div>
                      <div className="p-2"></div>
                  </Stack>

            </Col>
        </Row>
        <Row id='logoutRow'>
              <Stack direction="horizontal" gap={3}>
                  <div className="p-2"></div>
                  <div className="p-2 ms-auto"></div>
                  <div className="p-2">
                      <Button 
                      variant="warning"
                      type='button'
                      onClick={logout}
                      id='logoutBtn'
                      
                      >LOGOUT</Button>
                  </div>
              </Stack>

        </Row>


    </footer>
  )
}
