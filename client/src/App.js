import React, { useState } from 'react'
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [users, setUser] = useState([])
  const [userData, setUserData] = useState({
    username: '',
    companyName: '',
    position: '',
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
  })
  const [loggedIn, setLoggedIn] = useState(false)
  const [error, setError] =useState(null)

  //==========================================
  return (
    <>
    <Container>
        <Row>
          <Col></Col>
          <Col xs={5}>
            {/* Error message */}
            {error && <p id='errorMessage'>{error}</p>}
          </Col>
          <Col></Col>
        </Row>
        <Routes>
          
        </Routes>

    </Container>
    
    </>
  )
}
