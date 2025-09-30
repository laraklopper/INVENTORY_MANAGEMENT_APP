import React from 'react'
import './pageCss/Account.css'
import '../CSS/DataList.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { dateDisplay } from '../functions/dateFunctions';
import { SquareUserRound, Phone, Mail, ShieldUser, Calendar, User, Building2, Smile, BriefcaseBusiness } from 'lucide-react';


export default function Account({currentUser ,logout}) {
  

  //User details variables
  const username = currentUser?.username || 'Username Not provided'
  const firstName = currentUser?.fullName?.firstName || 'First name not provided';
  const lastName = currentUser?.fullName?.lastName || 'Last name not provided';
  const email = currentUser?.contactDetails?.email || 'No email provided';
  const contactNumber = currentUser?.contactDetails?.contactNumber || 'No Contact number provided';
  const position = currentUser?.position || '';
  const companyName = currentUser?.companyName || 'No Company name provided';
  const dateOfBirth = currentUser?.dateOfBirth || 'No date provided';
  const isAdmin = currentUser?.admin ? 'Yes' : 'No';
  return (
    <>
    <Header currentUser={currentUser}/>
    <section id='accountSection1'>
      <div id='user'>
          <Row id='userHeadRow'>
            <Col></Col>
            <Col xs={5} id='detailsHeadCol'>
              <h3 id='detailsIcon'><SquareUserRound size={28} fontWeight={700}/></h3>
              <h3 id='userDetailsHead'>DETAILS:</h3>
              </Col>
            <Col></Col>
          </Row>
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
          <Row>
            <Col></Col>
            <Col xs={5}>
              <Stack gap={3} id='editAccountStack'>
                <div className="p-2" id='editAccountDiv'>
                  <h6 className='btnText'>CLICK HERE TO:</h6>
                  <Button
                  variant='warning'
                  type='button'
                  id='toggleEditUserBtn'
                  >
                   EDIT ACCOUNT
                  </Button>
                </div>
                <div className="p-2" id='editPasswordDiv'>
                  <h6 className='btnText'>CLICK HERE TO:</h6>
                  <Button
                  variant='warning'
                  type='button'
                  id='toggleEditPasswordBtn'
                  >
                    EDIT PASSWORD
                  </Button>
                </div>
                <div className="p-2"></div>
              </Stack>
            </Col>
            <Col></Col>
          </Row>
      </div>
       
    </section>
    <section id='accountSection2'>
        
    </section>
    <Footer logout={logout} currentUser={currentUser}/>
    </>
  )
}
