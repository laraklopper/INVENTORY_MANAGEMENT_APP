import React from 'react'
import '../CSS/DataList.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Stack from 'react-bootstrap/Stack';
import {  Phone, Mail, ShieldUser, Calendar, User, Building2, Smile, BriefcaseBusiness } from 'lucide-react';

export default function UserDetails({currentUser, dateDisplay}) {     
      const username = currentUser?.username || 'Username Not provided'
      const firstName = currentUser?.fullName?.firstName || 'First name not provided';
      const lastName = currentUser?.fullName?.lastName || 'Last name not provided';
      const email = currentUser?.contactDetails?.email || 'No email provided';
      const contactNumber = currentUser?.contactDetails?.contactNumber || 'No Contact number provided';
      const position = currentUser?.position || '';
      const companyName = currentUser?.companyName || 'No Company name provided';
      const dateOfBirth = currentUser?.dateOfBirth || 'No date provided';
      const isAdmin = currentUser?.admin ? 'Yes' : 'No';

      //================================================
  return (
    <div id='userDetailsDiv'>
          <Row id='userDetailsRow'>
              <Col xs={6} md={4}>
                  <Stack gap={3} id='userStack1'>
                      <div className="p-2" id='usernameBlock'>
                          {/* Username */}
                          <span className='userDetailsLabel'>
                              <h5><User /></h5>
                              <h5 className='dataTextHead'>USERNAME:</h5>
                              <h5 className='dataText'>{username}</h5>
                          </span>
                      </div>
                      <div className="p-2" id='userNameBlock'>
                          {/* User Full Name */}
                          <span className='userDetailsLabel'>
                              <h5><Smile /></h5>
                              <h5 className='dataTextHead'> NAME:</h5>
                              <h5 className='dataText'>{`${firstName} ${lastName}`} </h5>
                          </span>
                      </div>
                      <div className="p-2" id='userDOBBlock'>
                          {/* User Date of Birth */}
                          <span className='userDetailsLabel'>
                              <h5><Calendar /></h5>
                              <h5 className='dataTextHead'>DATE OF BIRTH: </h5>
                              <h5 className='dataText'>{dateDisplay(dateOfBirth)}</h5>
                          </span>
                      </div>
                  </Stack>
              </Col>
              <Col xs={6} md={4} id='userDetailsStack3Col'>
                  <Stack gap={3} id='userDetailsStack3'>
                      <div className="p-2" id='userCompanyBlock'>
                          {/* User Company */}
                          <span className='userDetailsLabel'>
                              <h5><Building2 /></h5>
                              <h5 className='dataTextHead'>COMPANY: </h5>
                              <h5 className='dataText'>{companyName}</h5>
                          </span>
                      </div>
                      <div className="p-2" id='userEmailBlock'>
                          {/* User Email */}
                          <span className='userDetailsLabel'>
                              <h5> <Mail /></h5>
                              <h5 className='dataTextHead'>EMAIL: </h5>
                              <h5 className='dataText'>{email}</h5>
                          </span>
                      </div>
                      <div className="p-2" id='userAdminBlock'>
                          {/* User admin status*/}
                          <span className='userDetailsLabel'>
                              <h5><ShieldUser /></h5>
                              <h5 className='dataTextHead'> ADMIN: </h5>
                              <h5 className='dataText'>{isAdmin}</h5>
                          </span>
                      </div>

                  </Stack>

              </Col>
              <Col xs={6} md={4}>
                  <Stack gap={3}>
                      <div className="p-2">
                          <span className='userDetailsLabel' >
                              <h5><BriefcaseBusiness /></h5>
                              <h5 className='dataTextHead'> POSITION:</h5>
                              <h5 className='dataText'>{position}</h5>
                          </span>
                      </div>
                      <div className="p-2" id='userContactBlock'>
                          {/* User Contact number */}
                          <span className='userDetailsLabel'>
                              <h5><Phone /></h5>
                              <h5 className='dataTextHead'>CONTACT NUMBER: </h5>
                              <h5 className='dataText'>{contactNumber}</h5>
                          </span>
                      </div>
                      <div className="p-2">
                      </div>
                  </Stack>

              </Col>
          </Row>
    </div>
  )
}
