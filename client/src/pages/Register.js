import React, { useCallback, useState } from 'react'
import './pageCss/Registration.css'
import MainHeader from '../components/MainHeader';
import RegistrationForm from '../components/RegistrationForm';
import FormHeadings from '../components/FormHeadings';


export default function Register({setError}) {
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

    const addUser = useCallback(async () => {
      try {


        const token = localStorage.getItem('token')
        const response = await fetch (`http://localhost:3001/users/register`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newUserData)
        })

        const data = await response.json();
        // Response handling
        if (!response.ok) {
          throw new Error('Error adding user');
        }

        

        // Reset form fields after successful registration
        setNewUserData({
          username: '',
          fullName: {
            firstName: '',
            lastName: ''
          },
          companyName: '',
          contactDetails: {
            email: '',
            contactNumber: '',
          },
          position: '',
          dateOfBirth: '',
          password: '',
        });

        setError('');//clear any previous errors after a successful submission
        alert('New user successfully registered');//Notify the user of successful registration
        console.log('New user successfully registered');
      } catch (error) {
        console.error('Error adding user:', error.message);
        alert('Error adding user')
        setError(`Error adding new user: ${error.message}`);// Set the error state to display the error in the UI
      }
    },[setError, newUserData])
  return (
    <>
    
        <MainHeader mainHeading='REGISTER'/>
        <section id='regisSection'>
          <div id='register'>
            <FormHeadings formHeading='REGISTER'/>
            <RegistrationForm
              newUserData={newUserData}
              setNewUserData={setNewUserData}
              addUser={addUser}
            />
          </div>
        </section>
    </>
  )
}
