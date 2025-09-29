import React, { useState } from 'react';
import '../CSS/Forms.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

export default function RegistrationForm({newUserData, setNewUserData}) {
    const [viewPassword, setViewPassword] = useState(false)
    const [showPasswordMsg, setShowPasswordMsg] = useState(false)
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
              <Col xs={12} md={8}>
                  <Stack gap={3}>
                      <div  id='fullName'>
                        <label className='regisLabel'>
                            <p className='labelText'>FIRST NAME:</p>
                            <input
                            className='input'
                            />
                        </label>
                        <label className='regisLabel'>
                            <p className='labelText'>LAST NAME:</p>
                            <input
                            className='input'
                            />
                        </label>
                      </div>
                  </Stack>
              </Col>
              <Col xs={6} md={4}>
              
              </Col>
          </Row>
          <Row id='regisRow3'>
              <Col xs={12} md={8}>
                  <Stack gap={3}>
                      <div  id='contactDetails'>
                        <label className='regisLabel'>
                            <p className='labelText'>EMAIL:</p>
                            <input className='input'/>
                        </label>
                          <label className='regisLabel'>
                              <p className='labelText'>CONTACT NUMBER:</p>
                              <input className='input' />
                          </label>
                      </div>
                  </Stack>
              </Col>
              <Col xs={6} md={4}>
                  <label className='regisLabel'>
                      <p className='labelText'>DATE OF BIRTH:</p>
                      <input
                      className='input'
                      type='date'
                      name='dateOfBirth'
                      />
                  </label>
              </Col>
          </Row>
          <Row id='regisRow4'>
              <Col xs={12} md={8}>
                  <label className='regisLabel'>
                    <p className='labelText'>PASSWORD:</p>
                    <input 
                    className='input'
                          type={viewPassword ? 'text' : 'password'}//Toggle input type

                    onFocus={() => setShowPasswordMsg(true)}
                    onBlur={() => setShowPasswordMsg(false)}
                    />
                    <div id='showPassword'>
                        <Button 
                        variant='warning'
                        type='button'
                        id='newPasswordDisplayBtn'
                              onClick={() => setViewPassword((s) => !s)}
                        >
                              {/* Button text based on viewPassword state*/}
                              {viewPassword ? 'HIDE PASSWORD' : 'SHOW PASSWORD'}
                        </Button>

                    </div>
                  </label>
              </Col>
              {showPasswordMsg && (
                  <Col xs={6} md={4}>
                      <h6 id='passwordMsg'>We will never share your password</h6>
                  </Col>
              )}
           
          </Row>
    </form>
  )
}
