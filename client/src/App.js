import React, { useCallback, useEffect, useState } from 'react'
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedUserRoute from './protectedRoutes.js/ProtectedUserRoute';
import DashBoard from './pages/DashBoard';
import ProtectedAdminRoute from './protectedRoutes.js/ProtectedAdminRoute';
import Stock from './pages/Stock';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Customers from './pages/Customers';


export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [users, setUsers] = useState([])
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

  const navigate = useNavigate()


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');//Get token from localStorage
        if(!token || !loggedIn) return

        const response = await fetch(`http://localhost:3001/users/findUsers`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          console.error('[ERROR: App.js]: Failed to fetch Users');
          throw new Error("Failed to fetch Users");
        }

        const userData = await response.json()
        if (Array.isArray(userData)) {
          setUsers(userData)
          setError(null); // Clear any previous errors
        }
      } catch (error) {
        console.error(`ERROR: App.js: error fetching users`);
        setError(`ERROR: App.js: error fetching users: ${error.message}`);
      }
    }

    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('token');//Get token from localStorage
        if (!token || !loggedIn) return;

        const response = await fetch(`http://localhost:3001/users/me`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          console.error(`[ERROR: App.js]: Failed to fetch user details `);
          throw new Error("Failed to fetch user details");
        }

        const fetchCurrentUser = await response.json()

        setCurrentUser(fetchCurrentUser)
      } catch (error) {
        setError(`Error fetching current user details: ${error.message}`)
        console.error('[ERROR: App.js]: Error fetching current user details');
      }
    }

    if (loggedIn) {
      fetchUsers()
      fetchCurrentUser()
    }
  },[setError, setCurrentUser, loggedIn])

  //===========EVENT LISTENERS==================
  //Function for user logouts
  const logout = useCallback( () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId');
    localStorage.removeItem('contactDetails.email');
    localStorage.removeItem('loggedIn');
    setLoggedIn(false)
    setError('')
    // Reset state
    setLoggedIn(false);
    setError('');
    setUserData({
      companyName: '',
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
      admin: false,
    });
    setCurrentUser(null);
    navigate('/');
    
  },[navigate])
  //==========================================
  return (
    <>
    <Container id='appContainer'>
        <Row id='errorRow'>
          <Col></Col>
          <Col xs={5} id='errorCol'>
            {/* Error message */}
            <div id='stateMsgs'>
              {/* Display error message */}
              {error && <p id='errorMessage'>{error}</p>}
            </div>
          </Col>
          <Col></Col>
        </Row>
        <Routes>
          {loggedIn ? (
            <>
            <Route exact path='/' element={
              <ProtectedUserRoute currentUser={currentUser}>
                <DashBoard
                users={users}
                currentUser={currentUser}
                logout={logout}
                setError={setError}
                />
              </ProtectedUserRoute>
            }/>
            <Route path='/account' element={
              <ProtectedUserRoute currentUser={currentUser}>
                  <Account currentUser={currentUser} logout={logout} setUsers={setUsers} />
              </ProtectedUserRoute>
            }/>
            <Route path='/stock' element={
              <ProtectedAdminRoute currentUser={currentUser}>
                <Stock
                currentUser={currentUser}
                logout={logout}
                />
              </ProtectedAdminRoute>
            }
            />
            <Route path='/customers' element={
              <ProtectedAdminRoute currentUser={currentUser}>
                <Customers
                currentUser={currentUser}
                logout={logout}
                />
              </ProtectedAdminRoute>}/>
            </>
          ):(
            <>
          
            <Route  exact path='/' element={<Login userData={userData} setLoggedIn={setLoggedIn} setUserData={setUserData} setError={setError}/>}/>
            <Route path='/reg' element={<Register setError={setError}/>}/>
            </>
          )}
          <Route path='*' element={<h2 id='pageNotFound'>404: Page Not Found</h2>} />
        </Routes>
    </Container>
    
    </>
  )
}
