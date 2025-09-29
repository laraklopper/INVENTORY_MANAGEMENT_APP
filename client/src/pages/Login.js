import React, { useCallback } from 'react'
import '../CSS/Login.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MainHeader from '../components/MainHeader';
import LoginForm from '../components/LoginForm';

export default function Login({userData, setUserData, setError, setLoggedIn}) {

  const submitLogin = useCallback( async () => {
    try {
      const token = localStorage.getItem('token')
      const reponse = await fetch(`http://localhost:3001/users/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: userData.username,
          password: userData.password
        })
      })

      if (reponse.ok) {
        const data = await reponse.json();
        localStorage.setItem('username', userData.username)
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('token', data.token);

        setLoggedIn(true)
        setError(null);

      } else {
        throw new Error('Username or password are incorrect');
      }
    } catch (error) {
      setError(`Login Failed: ${error.message}`);// Set error state with error message
      console.log(`Login Failed: ${error.message}`);//Log an error message in the console for debugging purposes
      setLoggedIn(false);// Set the login state to false
      alert('LOGIN FAILED');
    }
  },[setError, setLoggedIn, userData])
  return (
    <>
    <Container id='loginContainer'>
        <MainHeader mainHeading='LOGIN'/>
        <section id='loginSection'>
          <Row id='loginFormRow'>
            <Col></Col>
            <Col xs={6} id='loginFormCol'>
            <LoginForm
             setUserData={setUserData}
             submitLogin={submitLogin}
             userData={userData}
            />
            </Col>
            <Col></Col>
          </Row>

        </section>
    </Container>
    </>
  )
}
