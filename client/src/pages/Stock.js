import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Stock({currentUser, logout}) {
  return (
    <>
  
        <Header heading='STOCK' currentUser={currentUser}/>
  <section id='stockPageSection1'>
        <Row>
          <Col xs={6} md={4}></Col>
          <Col xs={6} md={4}></Col>
          <Col xs={6} md={4}></Col>
        </Row>

  </section>
  <Footer currentUser={currentUser} logout={logout}/>
    </>
  )
}
