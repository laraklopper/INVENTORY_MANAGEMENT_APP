import React from 'react'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card';

export default function MainHeader() {
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
                  <Card>
                      <Card.Body></Card.Body>
                  </Card>
              </Col>
          </Row>
          <Row>
              <Col xs={6} md={4}></Col>
              <Col xs={6} md={4}>
                  <div className="p-2">
                      <nav role="navigation" aria-label="Navigation Bar" className='navigation'>
                          <ul id='navbar'>
                              {/* Link to Login page */}
                              <li className='linkItem'>
                                  <Link className='refLink' to='/'>
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
                  </div>
              </Col>
              <Col xs={6} md={4}>
                  xs=6 md=4
              </Col>
          </Row>

    </header>
  )
}
