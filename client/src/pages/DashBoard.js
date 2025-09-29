import React from 'react'
import Container from 'react-bootstrap/Container';
import Header from '../components/Header';

export default function DashBoard({currentUser}) {
  return (
    <>
    <Container id='homeContainer'>
        <Header heading='HOME' currentUser={currentUser}/>
        <section>
          
        </section>
    </Container>
    </>
  )
}
