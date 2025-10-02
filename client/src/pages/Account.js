import React, { useState } from 'react'
import './pageCss/Account.css'
import '../CSS/DataList.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Header from '../components/Header'
import Footer from '../components/Footer'
import InterestCalculator from '../components/InterestCalculator';
import {  Calculator } from 'lucide-react';


export default function Account({currentUser ,logout}) {

  const [openCalculator, setOpenCalculator] = useState(false)

  //===============EVENT LISTENERS=====================
 

  const toggleCalculator = () => {
    setOpenCalculator(prev => !prev)
  }

  //===============JSX RENDERING=======================
  return (
    <>
    <Header currentUser={currentUser}/>
   
    <section id='accountSection1'>
        <Row id='calculatorRow'>
            <Col xs={12} md={8}>
              
            </Col>
            <Col xs={6} md={4} id='calculatorCol'>
            <div id='calculatorDiv'>
            <Stack  id='toggleCalculatorStack' >
              <Button
                variant="primary"
                type='button'
                onClick={toggleCalculator}
                aria-label='Toggle calculator display button'
                aria-pressed={openCalculator}
                id='toggleCalculatorBtn'
              >
                 <Calculator />
                {openCalculator ? 'CLOSE CALCULATOR' : 'OPEN INTEREST CALCULATOR'}
              </Button>
            </Stack>
             
              
                {openCalculator && <InterestCalculator/>}
              </div>  
            </Col>
          </Row>
         
    </section>
    <Footer logout={logout} currentUser={currentUser}/>
    </>
  )
}
