import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { DoorOpen } from 'lucide-react';

export default function DashBoard({currentUser, logout}) {
  const firstName = currentUser?.fullName?.firstName || 'First name not provided';
  const lastName = currentUser?.fullName?.lastName || 'Last name not provided';

  return (
    <>
    <Header heading='HOME' currentUser={currentUser}/>
    <section>
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
    <Footer logout={logout} currentUser={currentUser}/>
    </>
  )
}
