import React from 'react'
import Container from 'react-bootstrap/Container';
import Header from '../components/Header';

export default function Home({currentUser}) {
  return (
    <>
    <Container>
        <Header heading='HOME' currentUser={currentUser}/>
    </Container>
    </>
  )
}
