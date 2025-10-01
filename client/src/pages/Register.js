import React, { useCallback, useState } from 'react'
import './pageCss/Registration.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
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
          !newUserData.fullName.firstName ||
          !newUserData.fullName.lastName ||
          !newUserData.companyName ||
          !newUserData.contactDetails.email ||
          !newUserData.contactDetails.contactNumber ||
          !newUserData.position ||
          !newUserData.dateOfBirth ||
          !newUserData.password;

        if (missing) {
          setError?.('All fields are required');
          return;
        }

        // Build payload
        const payload = {
          ...newUserData,
          username: newUserData.username.trim(),
          companyName: newUserData.companyName.trim(),
          fullName: {
            firstName: newUserData.fullName.firstName.trim(),
            lastName: newUserData.fullName.lastName.trim(),
          },
          contactDetails: {
            email: newUserData.contactDetails.email.trim(),
            contactNumber: newUserData.contactDetails.contactNumber.trim(),
          },
          position: newUserData.position,
        };

        // const token = localStorage.getItem('token')
        const response = await fetch (`http://localhost:3001/users/register`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        })

        const data = await response.json().catch(() => ({}));        // Response handling
        if (!response.ok) {
          // Bubble up server details when available
          const msg = data?.message || `Error adding user (HTTP ${response.status})`;
          // You can also inspect data.missingFields or data.conflictField if present
          throw new Error(msg);
        }
        

        // Reset form fields after successful registration
        setNewUserData({
          username: '',
          companyName: '',
          position: '',
          fullName: {
            firstName: '',
            lastName: ''
          },
          contactDetails: {
            email: '',
            contactNumber: '',
          },
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
      <section id='regisSection2'>
        <Row id='regisRulesRow'>
          <Col xs={6} md={6} id='rulesCol'>
            <Card id='regisRulesCard'>
              <Card.Header id='regisRulesHeader'>
                <h3 id='regisRequire'>REGISTRATION REQUIREMENTS:</h3>
                </Card.Header>
              <ListGroup id='rulesList' variant="flush">
                <ListGroup.Item id='ruleItem1'>
                  <p className='rule'>PASSWORDS MUST BE AT LEAST 8 CHARACTERS AND AT LEAST ONE SPECIAL CHARACTER</p>
                </ListGroup.Item>
                <ListGroup.Item id='ruleItem2'>
                  <p className='rule'> USERS MUST BE 18 OR OLDER</p>
              
                </ListGroup.Item>
                <ListGroup.Item id='ruleItem3'>
                  <p className='rule'>ONLY MANAGERS AND ADMIN POSITION HAVE ADMIN PRIVILEGES</p>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          
          </Col>
          <Col xs={6} md={6}>
          </Col>
        </Row>
      </section>
    </>
  )
}
