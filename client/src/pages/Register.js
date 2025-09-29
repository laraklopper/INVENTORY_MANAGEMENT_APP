import React, { useState } from 'react'
import './pageCss/Registration.css'
import Container from 'react-bootstrap/Container';
import MainHeader from '../components/MainHeader';
import RegistrationForm from '../components/RegistrationForm';


export default function Register() {
    const [newUserData, setNewUserData] = useState({
      username: '',
      companyName: '',
      position: '',//'manager', 'admin', 'clerk', 'viewer'
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
    })
  return (
    <>
    <Container>
        <MainHeader mainHeading='REGISTER'/>
        <section>
          <RegistrationForm
          newUserData={newUserData}
          setNewUserData={setNewUserData}
          />
     

        </section>
    </Container>
    </>
  )
}
