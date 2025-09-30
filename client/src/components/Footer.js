import React, { useEffect, useState } from 'react'
import '../CSS/Footer.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { dateDisplay, timeDisplay } from '../functions/dateFunctions';

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
                  <Stack direction="horizontal" gap={3} id='footerStatusStack'>
                      
                          <div className="p-2">
                            <ul className='userStatusList'>
                                <li className='footerListItem'>
                                      <h5 id='status'>Logged in as:</h5><h5 className='adminStatus'>{currentUser.admin ? 'Admin' : 'User'}</h5>
                                </li>
                                <li className='footerListItem'>
                                      <h5 className='status'>Company: </h5><h5 className='company'>{currentUser.companyName}</h5>
                                </li>
                                  <li className='footerListItem'>
                                      <h5 className='status'>Position:</h5><h5 className='position'> {currentUser.position}</h5>
                                </li>
                            </ul>
                          </div>
                    
                       
                         

                      
                      <div className="p-2 ms-auto"></div>
                      <div className="p-2">
                          <Card>
                              <Card.Body>
                                  <ListGroup variant="flush">
                                      <ListGroup.Item>
                                          <h5 className='timeStamp'>{dateDisplay(date)}</h5>
                                      </ListGroup.Item>
                                      <ListGroup.Item>
                                        <h5 className='timeStamp'>{timeDisplay(date)}</h5>
                                      </ListGroup.Item>
                                     
                                      <ListGroup.Item>
                                          <Button
                                              variant="warning"
                                              type='button'
                                              onClick={logout}
                                              id='logoutBtn'

                                          >LOGOUT</Button>
                                      </ListGroup.Item>
                                  </ListGroup>

                                  
                              </Card.Body>
                          </Card>
                      </div>
                  </Stack>

            </Col>
        </Row>
        <Row id='logoutRow'>
              <Stack direction="horizontal" gap={3}>
                  <div className="p-2"></div>
                  <div className="p-2 ms-auto"></div>
                  <div className="p-2">
                      
                  </div>
              </Stack>

        </Row>


    </footer>
  )
}
