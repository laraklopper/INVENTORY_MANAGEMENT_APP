import React, { useState } from 'react'
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Route } from 'react-router-dom';
import ProtectedUserRoute from './protectedRoutes.js/ProtectedUserRoute';
import Home from './pages/Home';
import ProtectedAdminRoute from './protectedRoutes.js/ProtectedAdminRoute';
import Stock from './pages/Stock';
import Login from './pages/Login';
import Register from './pages/Register';
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
          {loggedIn ? (
            <>
            <Route exact path='/' element={
              <ProtectedUserRoute currentUser={currentUser}>
                <Home/>
              </ProtectedUserRoute>
            }/>
            <Route path='/stock' element={
              <ProtectedAdminRoute>
                <Stock/>
              </ProtectedAdminRoute>
            }
            />
            </>
          ):(
            <>
            <Route exact path='/' element={<Login/>}/>
            <Route path='/reg' element={<Register/>}/>
            </>
          )}
        </Routes>

    </Container>
    
    </>
  )
}
