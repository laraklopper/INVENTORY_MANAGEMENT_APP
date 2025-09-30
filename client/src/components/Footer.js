import React, { useEffect, useState } from 'react'
import '../CSS/Footer.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { dateDisplay, timeDisplay } from '../functions/dateFunctions';
import { Lock } from 'lucide-react';
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
        
          <Row id='footerRow'>
              <Col id='footerStatusCol'>
                  <Card id='userStatusCard'>
                      <ListGroup id='userStatusList'>
                          <ListGroup.Item
                          id='adminStatus'
                          >
                              <h5 id='status'>Logged in as:</h5><h5 className='adminStatus'>{currentUser.admin ? 'Admin' : 'User'}</h5>
                          </ListGroup.Item>
                          <ListGroup.Item
                          id='company'
                          > <h5 className='status'>Company: </h5><h5 className='company'>{currentUser.companyName}</h5></ListGroup.Item>
                          <ListGroup.Item
                          id='position'
                          >
                            <h5 className='status'>Position:</h5><h5 className='position'> {currentUser.position}</h5>
                        </ListGroup.Item>
                      </ListGroup>
                  </Card>
                
              </Col>
              <Col xs={6}>
                
              </Col>
              <Col >
                  <Card id='footerTimeCard'>
                      <Card.Body>
                          <ListGroup variant="flush">
                              <ListGroup.Item id='footerListItem1'>
                                  <h5 className='timeStamp'>{dateDisplay(date)}</h5>
                              </ListGroup.Item>
                              <ListGroup.Item id='footerListItem2'>
                                  <h5 className='timeStamp'>{timeDisplay(date)}</h5>
                              </ListGroup.Item>

                              <ListGroup.Item id='footerListItem3'>
                                  <Button
                                      variant="warning"
                                      type='button'
                                      onClick={logout}
                                      id='logoutBtn'

                                  >
                                      <Lock />
                                    LOGOUT</Button>
                              </ListGroup.Item>
                          </ListGroup>


                      </Card.Body>
                  </Card>
              </Col>
          </Row>


    </footer>
  )
}
