import React, {useEffect, useState} from 'react'
import '../CSS/Header.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card';

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
    <header className='header'>
          <Row>
              <Col>
                  <Stack gap={3}>
                      <div className="p-2"></div>
                      <div className="p-2"></div>
                  </Stack>
              </Col>
          </Row>
          <Row>
              <Col></Col>
              <Col xs={5}>
                  
              </Col>
              <Col></Col>
          </Row>
          <Row>
              <Col xs={6} md={4}></Col>
              <Col xs={6} md={4}>
                  <h1 id='heading'>INVENTORY MANAGER</h1>
              </Col>
              <Col xs={6} md={4}>
                  <Card id='headerTimeCard'>
                      <Card.Body id='timeCardBody'>
                          <h2
                              className="formattedTime"
                              aria-label="Current Time Display"
                              aria-live="polite">
                              {formattedTime}
                          </h2>
                      </Card.Body>
                  </Card>
              </Col>
          </Row>
          <Row>
              <Col></Col>
              <Col xs={5}>
                  <h1 className='mainHeading' aria-label="Page Title" aria-live="polite">
                      {mainHeading}
                  </h1>
              </Col>
              <Col></Col>
          </Row>
          <Row>
              <Col xs={6} md={4}></Col>
              <Col xs={6} md={4}>
                      <nav role="navigation" aria-label="Navigation Bar" className='navigation'>
                          <ul id='navbar'>
                            <li className='refLink'>
                                <Link className='refLink' to='/'>HOME</Link>
                            </li>
                              {/* Link to Login page */}
                              <li className='linkItem'>
                                  <Link className='refLink' to='/login'>
                                      LOGIN
                                  </Link>
                              </li>
                              {/* Link to Registration Page */}
                              <li className='linkItem'>
                                  <Link className='refLink' to='/reg'>
                                      REGISTRATION
                                  </Link>
                              </li>
                          </ul>
                      </nav>
                 
              </Col>
              <Col xs={6} md={4}></Col>
          </Row>
    </header>
  )
}
