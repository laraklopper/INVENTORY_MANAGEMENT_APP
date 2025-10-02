import React from 'react'
import '../CSS/Forms.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
export default function AddCustomerForm() {
  return (
    <form id='addCustomerForm' >
          <Row id='newCustomerRow1'>
              <Col xs={6} md={4}>
                  <label className='newCustomerLabel'>
                    <p className='labelText'>CUSTOMER CODE:</p>
                    <input
                    className='input'
                    type='text'
                    placeholder='CUSTOMER CODE'
                    />
                  </label>
              </Col>
              <Col xs={12} md={8}>
                  <div id='newCustomerName'>
                      <label className='newCustomerLabel'>
                          <p className='labelText'>FIRST NAME:</p>
                          <input
                              className='input'
                              type='text'
                              placeholder='FIRST NAME'
                          />
                      </label>
                      <label className='newCustomerLabel'>
                          <p className='labelText'>LAST NAME:</p>
                          <input
                              className='input'
                              type='text'
                              placeholder='LAST NAME'
                          />
                      </label>
                  </div>
                 
              </Col>
              
          </Row>
          <Row id='newCustomerRow2'>
              <Col xs={12} md={8}>
                  <div id='newCustomerContactDetails'>
                      <label className='newCustomerLabel'>
                          <p className='labelText'>EMAIL:</p>
                          <input
                              className='input'
                              type='email'
                          />
                      </label>
                      <label className='newCustomerLabel'>
                          <p className='labelText'>CONTACT NUMBER:</p>
                          <input
                              className='input'
                              type='text'
                          />
                      </label>
                  </div>
              </Col>
              <Col xs={6} md={4}>
                      <label className='newCustomerLabel' htmlFor='paymentDetailsInput'>
                          <p className='labelText'>PAYMENT DETAILS:</p>
                          <textarea
                          name='paymentDetails'
                          placeholder='paymentDetails'
                          id='paymentDetailsInput'
                          />
                      </label>
              </Col>
          </Row>
          <div id='customerShippingAddress'>
              <Row id='addressRow1'>
                  <Col></Col>
                  <Col xs={5} id='addressHeadingCol'>
                  <h3 id='customerAddressHeading'>SHIPPING ADDRESS</h3>
                  </Col>
                  <Col></Col>
              </Row>
              <Row id='addressRow2'>
                  <Col>

                  </Col>
                  <Col xs={12} md={8} id='addressCol'>
                      <Stack gap={3} id='addressStack'>
                          <div className="p-2" id='addressBlock1'>
                                  <label className='newCustomerLabel'>
                                      <p className='labelText'>STREET ADDRESS</p>
                                      <textarea
                                      id='streetAddressInput'
                                          placeholder='STREET ADDRESS'
                                      />
                                  </label>
                                
                                 
                              
                          </div>
                          <div className="p-2">
                              <label className='newCustomerLabel'>
                                  <p className='labelText'>CITY/TOWN:</p>
                                  <input
                                      className='input'
                                  />
                              </label>
                              <label className='newCustomerLabel'>
                                  <p className='labelText'>POSTAL CODE:</p>
                                  <input
                                      className='input'
                                  />
                              </label>

                          </div>
                          <div className="p-2" id='addressBlock3'>
                              <label className='newCustomerLabel'>
                                <p className='labelText'>
                                    PROVINCE
                                  </p><input />
                              </label>
                              <label className='newCustomerLabel'>
                                <p className='labelText'>COUNTRY</p>
                                <select 
                                className='input'
                                >
                                    <option>SELECT</option>
                                      <option>SOUTH AFRICA</option>
                                      <option> NAMIBIA</option>
                                </select>
                              </label>
                          </div>
                      </Stack></Col>
                  <Col  >

                  </Col>
              </Row>
          </div>
        
          <Row id='newCustomerRow3'>
            <Col>
                  <Stack direction="horizontal" gap={3}>
                      <div className="p-2"></div>
                      <div className="p-2 ms-auto">
                        <Button 
                        variant='danger' 
                        type='button'
                        id='clearFormBtn'
                        >
                            CLEAR FORM
                        </Button>
                      </div>
                      <div className="p-2">
                        <Button variant='primary' type='submit' id='addCustomerBtn'>
                            ADD CUSTOMER
                        </Button>
                      </div>
                  </Stack>
            </Col>
          </Row>

    </form>
  )
}
