import React from 'react'

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
