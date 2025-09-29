import React, { useState } from 'react';
import '../CSS/Forms.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
// import Button from 'react-bootstrap/Button';

export default function RegistrationForm() {
    const [viewPassword, setViewPassword] = useState(false)
  return (
    <form id='registrationForm'>
          <Row id='regisRow1'>
              <Col xs={6} md={4} id='regisCol1'>
                  <label className='regisLabel'>
                    <p className='labelText'>USERNAME:</p>
                    <input
                    className='input'
                    type='text'
                    />
                  </label>
              </Col>
              <Col xs={6} md={4} id='regisCol2'>
                  <label className='regisLabel'>
                      <p className='labelText'>COMPANY NAME:</p>
                      <input 
                      className='input'
                      type='text'
                      />
                  </label>
              </Col>
              <Col xs={6} md={4} id='regisCol3'>
                  <label className="regisLabel" htmlFor="positionSelect">
                      <p className='labelText'>POSITION:</p>
                      <select
                          className="input"
                          id="positionSelect"
                          name="position"
                          required
                          aria-label="Select position"
                          aria-required="true"
                      >
                          <option className="option" value="">SELECT</option>
                          <option className="option" value="manager">MANAGER</option>
                          <option className="option" value="admin">ADMIN</option>
                          <option className="option" value="clerk">CLERK</option>
                          <option className="option" value="viewer">VIEWER</option>
                      </select>
                  </label>
              </Col>
          </Row>
          <Row id='regisRow2'>
              <Col>
                  <Stack gap={3}>
                      <div className="p-2">First item</div>
                  </Stack>
              </Col>
              
          </Row>
          <Row>
              <Col>
                  <Stack gap={3}>
                      <div className="p-2">First item</div>
                  </Stack>
              </Col>
          </Row>
          <Row>
              <Col xs={12} md={8}>
                  xs=12 md=8
              </Col>
              <Col xs={6} md={4}>
                  xs=6 md=4
              </Col>
          </Row>
    </form>
  )
}
