import React, { useCallback, useState } from 'react'
import './pageCss/DashBoard.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { dateDisplay } from '../functions/dateFunctions';
import { SquareUserRound, NotebookTabs, DoorOpen, UserLock } from 'lucide-react';

import UserDetails from '../components/UserDetails';
import FormHeadings from '../components/FormHeadings';
import EditPasswordForm from '../components/EditPasswordForm';

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


  //===========EVENT HANDLERS / CALLBACKS =============
  // Toggle functions for forms
  // Toggle account form
  const toggleAccountForm = useCallback(() => {
    setActiveForm(prevForm => (prevForm === 'account' ? null : 'account'));
  }, []);
  // Toggle password form
  const togglePasswordForm = useCallback(() => {
    setActiveForm(prevForm => (prevForm === 'password' ? null : 'password'));
  }, [])
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
                    onClick={toggleAccountForm}
                  >
                    {showAccountForm ? 'EXIT' : 'EDIT ACCOUNT'}<NotebookTabs />
                  </Button>
                </div>
                <div className="p-2" id='editPasswordDiv'>
                  <h6 className='btnText'>CLICK HERE TO:</h6>
                  <Button
                    variant='warning'
                    type='button'
                    id='toggleEditPasswordBtn'
                    onClick={togglePasswordForm}
                    aria-label='Button to toggle Edit Password Form'
                    aria-expanded={showPasswordForm}
                    aria-pressed={showPasswordForm}
                  >
                    {showPasswordForm ? 'EXIT' : 'EDIT PASSWORD'} <UserLock />
                  </Button>
                </div>
                <div className="p-2"></div>
              </Stack>
            </Col>
            <Col></Col>
          </Row>
        </div>
      </section>
      <section id='editUserFormsSection'>
        <div id='editUser'>
          {showAccountForm && (
            <div id='editUserDetails'>
              <FormHeadings formHeading='EDIT DETAILS'/>
            </div>
          ) }
          {showPasswordForm && (
          <div id='editPasswordDetails'>
            <FormHeadings formHeading='EDIT PASSWORD'/>
            <EditPasswordForm/>
          </div>
          )}
        </div>
      </section>
    <Footer logout={logout} currentUser={currentUser}/>
    </>
  )
}
