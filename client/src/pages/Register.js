import React, { useState } from 'react'
import './pageCss/Registration.css'
import MainHeader from '../components/MainHeader';
import RegistrationForm from '../components/RegistrationForm';
import FormHeadings from '../components/FormHeadings';


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
    
        <MainHeader mainHeading='REGISTER'/>
        <section id='regisSection'>
          <div id='register'>
            <FormHeadings formHeading='REGISTER'/>
            <RegistrationForm
              newUserData={newUserData}
              setNewUserData={setNewUserData}
            />
          </div>
        </section>
    </>
  )
}
