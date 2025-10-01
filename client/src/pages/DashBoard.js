import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { dateDisplay } from '../functions/dateFunctions';
import { SquareUserRound } from 'lucide-react';
import { DoorOpen } from 'lucide-react';
import UserDetails from '../components/UserDetails';

export default function DashBoard({currentUser, logout}) {
  const [editUserData, setEditUserData] = useState({
    username: currentUser?.username || '',
    companyName: currentUser?.companyName || '',
    position: currentUser.position || '',
    fullName: {
      firstName: currentUser?.fullName?.firstName || '',
      lastName: currentUser?.fullName?.lastName || ''
    },
    contactDetails: {
      email: currentUser?.contactDetails?.email || '',
      contactNumber: currentUser?.contactDetails?.contactNumber || ''
    },
  })
   const [activeForm, setActiveForm] = useState(null)
  
    // State to manage whether the user is in edit mode
    const showAccountForm = activeForm === 'account'
    const showPasswordForm = activeForm === 'password'
  const firstName = currentUser?.fullName?.firstName || 'First name not provided';
  const lastName = currentUser?.fullName?.lastName || 'Last name not provided';
  return (
    <>
    <Header heading='HOME' currentUser={currentUser}/>
      <section id='dashBoardSection1'>
        <Row>
          <Col></Col>
          <Col xs={5} id='welcomeCol'>
            <div id='welcomeDiv'>
              <label id='welcomeLabel'>
                <h5> <DoorOpen size={30} /></h5>
                <h2 id='welcomeHeading'>WELCOME:</h2>
                <h2 id='welcomeUser'>{`${firstName} ${lastName}`}</h2>
              </label>
            </div> 
          </Col>
          <Col></Col>
        </Row>
    </section>
      <section id='userDetailsSection'>
        <div id='user'>
        <Row id='userHeadRow'>
          <Col></Col>
          <Col xs={5} id='detailsHeadCol'>
            <h3 id='detailsIcon'><SquareUserRound size={28} fontWeight={700} /></h3>
            <h3 id='userDetailsHead'>DETAILS:</h3>
          </Col>
          <Col></Col>
        </Row>
         
          <UserDetails currentUser={currentUser}  dateDisplay={dateDisplay}/>    
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
    <Footer logout={logout} currentUser={currentUser}/>
    </>
  )
}
