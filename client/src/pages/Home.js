import React from 'react'
import Container from 'react-bootstrap/Container';
import MainHeader from '../components/MainHeader';
import Card from 'react-bootstrap/Card';

export default function Home() {
  return (
    <>
  
        <Card id='homePageCard'> 
          <Card.Body>
            <MainHeader mainHeading='HOME' />
          </Card.Body>
        </Card>

        

    </>
  )
}
