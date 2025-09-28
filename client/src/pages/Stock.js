import React from 'react'
import Container from 'react-bootstrap/Container';
import Header from '../components/Header';

export default function Stock({currentUser}) {
  return (
    <>
    <Container>
        <Header currentUser={currentUser}/>
    </Container>
    </>
  )
}
