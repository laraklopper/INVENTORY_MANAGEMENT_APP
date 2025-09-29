import React, { useState } from 'react';
import '../CSS/Forms.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

export default function RegistrationForm({newUserData, setNewUserData}) {
    const [viewPassword, setViewPassword] = useState(false)
    const [showPasswordMsg, setShowPasswordMsg] = useState(false)

    const handleInputChange = (event) => {
        const {name, value} = event.target;

        if (name.startsWith('fullName.')) {
            const [, field] = name.split('.');
            setNewUserData((prev) => ({
                ...prev,
                fullName: {
                    ...prev.fullName,
                    [field]: value
                }
            }))
        } else if (name.startsWith('contactDetails.')) {
            const [, field] = name.split('.');
            setNewUserData((prev) => ({
                ...prev,
                contactDetails: {
                    ...prev.contactDetails,
                    [field]: value
                }
            }))
        } else {
            // For non-nested fields (like dateOfBirth, password), update directly
            setNewUserData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    }
    //Function to clearForm
    const clearForm = () => {
        const confirmClear = window.confirm("Are you sure you want to clear the form?");
        if (!confirmClear) return;
        setNewUserData({
            username: '',
            companyName: '',
            position: '',
            fullName: {
                firstName: '',
                lastName: '',
            },
            contactDetails: {
                email: '',
                contactNumber: '',
            },
            dateOfBirth: '',
            password: '',
            admin: false
        });
        setViewPassword(false); // Reset password visibility
    };

//===============JSX RENDERING========================
  return (
    <form id='registrationForm' aria-label='registrationForm'>
          <Row id='regisRow1'>
              <Col xs={6} md={4} id='regisCol1'>
                  <label className='regisLabel'>
                    <p className='labelText'>USERNAME:</p>
                    <input
                    className='input'
                    type='text'
                    name='username'
                    value={newUserData}
                    aria-label='New Username Input'
                    aria-required='true'
                    onChange={handleInputChange}
                    id='usernameInput'
                    />
                  </label>
              </Col>
              <Col xs={6} md={4} id='regisCol2'>
                  <label className='regisLabel'>
                      <p className='labelText'>COMPANY NAME:</p>
                      <input 
                      className='input'
                      type='text'
                      onChange={handleInputChange}
                      name='companyName'
                      value={newUserData.companyName}
                      placeholder='COMPANY NAME'
                      id='companyNameInput'
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
                          value={newUserData.input}
                          required
                          onChange={handleInputChange}
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
                            type='text'
                            onChange={handleInputChange}
                            placeholder='FIRST NAME'
                            required
                            autoComplete='givin name'
                            name='fullName.firstName'
                            value={newUserData.fullName.firstName}
                            aria-required='true'
                            aria-label='New First Name Input'
                            />
                        </label>
                        <label className='regisLabel'>
                            <p className='labelText'>LAST NAME:</p>
                            <input
                                  type='text'
                                  name='fullName.lastName'
                                  value={newUserData.fullName.lastName}
                                  onChange={handleInputChange}
                                  required
                                  placeholder='LAST NAME'
                                  autoComplete='family name'
                                  className='input'
                                  aria-required='true'
                                  aria-label="Last name input"
                                  id='lastNameInput'
                            />
                        </label>
                      </div>
                  </Stack>
              </Col>
              <Col xs={6} md={4}></Col>
          </Row>
          <Row id='regisRow3'>
              <Col xs={12} md={8}>
                  <Stack gap={3}>
                      <div  id='contactDetails'>
                        <label className='regisLabel'>
                            <p className='labelText'>EMAIL:</p>
                            <input 
                                  type='email'
                                  name='contactDetails.email'
                                  value={newUserData.contactDetails.email}
                                  id='emailInput'
                                  onChange={handleInputChange}
                                  required
                                  autoComplete='email'
                                  className='input'
                                  placeholder='EMAIL'
                                  aria-required='true'
                                  aria-label='Email Input'
                            />
                        </label>
                          <label className='regisLabel'>
                              <p className='labelText'>CONTACT NUMBER:</p>
                              <input
                                  type='text'
                                  name='contactDetails.contactNumber'
                                  value={newUserData.contactDetails.contactNumber}
                                  className='input'
                                  autoComplete='tel'
                                  onChange={handleInputChange}
                                  placeholder='CONTACT NUMBER'
                                  required
                                  aria-required='true'
                                  aria-label='New Contact Number Input'
                                  id='newContactNumberInput'
                              />
                          </label>
                      </div>
                  </Stack>
              </Col>
              <Col xs={6} md={4}>
                  <label htmlFor='dateOfBirthInput' className='regisLabel'>
                      <p className='labelText'>DATE OF BIRTH:</p>
                      <input
                          type='date'
                          name='dateOfBirth'
                          value={newUserData.dateOfBirth}
                          aria-label='New Date of Birth Input'
                          onChange={handleInputChange}
                          placeholder='dd/mm/yyyy'
                          autoComplete='bday'
                          required
                          aria-required='true'
                          className='input'
                          id='dateOfBirthInput'
                      />
                  </label>
              </Col>
          </Row>
          <Row id='regisRow4'>
              <Col xs={12} md={8}>
                  <label className='regisLabel'>
                    <p className='labelText'>PASSWORD:</p>
                    <input 
                          type={viewPassword ? 'text' : 'password'}//Toggle input type
                          name='password'
                          value={newUserData.password}
                          onChange={handleInputChange}
                          placeholder='PASSWORD'
                          className='input'
                          autoComplete='new-password'
                          id='passwordInput'
                          required
                          aria-label='Password Input'
                          aria-required='true'
                          onFocus={() => setShowPasswordMsg(true)}
                         onBlur={() => setShowPasswordMsg(false)}
                    />
                    <div id='showPassword'>
                        <Button 
                        variant='warning'
                        type='button'
                        id='newPasswordDisplayBtn'
                              aria-label='Display Password Button'
                              aria-pressed={viewPassword}
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
          <Row>
              <Col>
                  <Stack direction="horizontal" gap={3}>
                      <div className="p-2"></div>
                      <div className="p-2 ms-auto">
                        <Button
                        type='button'
                        variant='danger'
                        role='button'
                        onClick={clearForm}
                              aria-label='CLEAR REGISTRATION FORM Button'
                              id='clearRegisBtn'
                        >
                            CLEAR FORM
                        </Button>
                      </div>
                      <div className="p-2">
                        <Button 
                        type='submit'
                        variant='light'
                              aria-label='Submit Registration Form Button'
                              role='button'
                              id='registrationBtn'
                        >
                            REGISTER
                        </Button>
                      </div>
                  </Stack>
              </Col>
          </Row>
    </form>
  )
}
