import React, {useEffect, useState} from 'react'
import '../CSS/Header.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import { Clock } from 'lucide-react';
import { LogIn } from 'lucide-react';
import { ChartBarBig } from 'lucide-react';
export default function MainHeader({mainHeading}) {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date(), 1000)
            return () => clearInterval(timer)
        }, []);
    }, [])

    const formattedTime = time.toLocaleTimeString()
  return (
    <header className='header' >
          <Row id='headerRow'>
              <Col></Col>
              <Col xs={6}>
                  <Stack gap={3} id='headerStack'>
                      <div className="p-2">
                          <h1 id='heading'>INVENTORY MANAGER</h1>
                          
                      </div>
                      <div className="p-2">
                          <h1 className='mainHeading' aria-label="Page Title" aria-live="polite">
                              {mainHeading}
                          </h1>
                      </div>
                      <div className="p-2" id='navBlock'>
                          <nav role="navigation" aria-label="Navigation Bar" className='navigation'>
                              <ul id='navbar'>
                              
                                  {/* Link to Login page */}
                                  <li className='linkItem'>
                                      <Link className='refLink' to='/'>
                                          <p className='linkIcon'>   <LogIn /></p>
                                         <p className='linkText'>LOGIN</p> 
                                      </Link>
                                  </li>
                                  {/* Link to Registration Page */}
                                  <li className='linkItem'>
                                      <Link className='refLink' to='/reg'>
                                          <p className='linkIcon'><ChartBarBig /></p>
                                          <p className='linkText'>REGISTER</p>
                                      </Link>
                                  </li>
                              </ul>
                          </nav>
                      </div>
                  </Stack>            
              </Col>
              <Col id='headerTimeCol'>
                  <Card id='headerTimeCard'>
                      <Card.Body id='timeCardBody'>
                        <span id='headingClock'>
                              <h2 className='formattedTime'><Clock /></h2> 
                              <h2
                                  className="formattedTime"
                                  aria-label="Current Time Display"
                                  aria-live="polite">
                                  {formattedTime}
                              </h2>
                        </span>
                          
                          
                      </Card.Body>
                  </Card>
              </Col>
          </Row>
          <Row>
              <Col xs={6} md={4}></Col>
              <Col xs={6} md={4}>
                      
                 
              </Col>
              <Col xs={6} md={4}></Col>
          </Row>
    </header>
  )
}
