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
        const missing =
          !newUserData.username ||
          !newUserData.companyName ||
          !newUserData.position ||
          !newUserData.fullName.firstName ||
          !newUserData.fullName.lastName ||         
          !newUserData.contactDetails.email ||
          !newUserData.contactDetails.contactNumber ||
          !newUserData.dateOfBirth ||
          !newUserData.password;

          if (missing) {
            setError?.('All fields are required')
            return
          }

        const payload = {
          ...newUserData,
          username: newUserData.username.trim(),
          companyName: newUserData.companyName.trim(),
          position: newUserData.position,
          fullName: {
            firstName: newUserData.fullName.firstName.trim(),
            lastName: newUserData.fullName.lastName.trim(),
          },
          contactDetails: {
            email: newUserData.contactDetails.email.trim(),
            contactNumber: newUserData.contactDetails.contactNumber.trim(),
          },          
        };

        const response = await fetch (`http://localhost:3001/users/register`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: `Bearer ${payload}`
        })

        const data = await response.json();
        // Response handling
        if (!response.ok) {
          throw new Error(data.message || `Error adding user (Status: ${response.status})`);
        }

        // Store token if the backend returns it
        if (data.token) {
          localStorage.setItem('token', data.token);// Parse the response data as JSON
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
            />
          </div>
        </section>
    </>
  )
}
