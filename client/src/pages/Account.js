import React, { useState } from 'react'
import './pageCss/Account.css'
import '../CSS/DataList.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Header from '../components/Header'
import Footer from '../components/Footer'



export default function Account({currentUser ,logout}) {
  const [principal, setPrincipal] = useState(0)
  const [interestRate, setInterestRate] = useState(0)
  const [timePeriod, setTimePeriod] = useState(0)
  const [totalInterest, setTotalInsterest] = useState(0)
  const [openCalculator, setOpenCalculator] = useState(false)

  //===============EVENT LISTENERS=====================
  function handlePrincipalInterest(e) {
    setPrincipal(e.target.value)
  }

  function handleInterestRateChange(e) {
    setInterestRate(e.target.value)
  }

  function handleTimePeriod(e) {
    setTimePeriod(e.target.value)
  }

  function calculateInterest() {
    const interest = (principal * interestRate * timePeriod)
    setTotalInsterest(interest)
  }

  const toggleCalculator = () => {
    setOpenCalculator(prev => !prev)
  }

  //===============JSX RENDERING=======================
  return (
    <>
    <Header currentUser={currentUser}/>
   
    <section id='accountSection1'>
        <Row>
          <Col></Col>
          <Col xs={5}>
          
          </Col>
          <Col></Col>
        </Row>
        <Row id='calculatorRow'>
          <Col></Col>
          <Col xs={5} id='calculatorCol'>
         
          <div>
              <Stack gap={3}>
                <div className="p-2">
                  <h2 id='calculatorHeading'>INTEREST CALCULATOR</h2>
                </div>
                <div className="p-2">
                  <Button
                    variant="primary"
                    type='button'
                    onClick={toggleCalculator}
                    aria-label='Toggle calculator display button'
                    aria-pressed={openCalculator}

                  >
                    {openCalculator ? 'CLOSE CALCULATOR' : 'OPEN INTEREST CALCULATOR'}
                  </Button>
                </div>
                <div className="p-2">Second item</div>
                <div className="p-2">Third item</div>
              </Stack>
             
              <Stack gap={3}>
               
                <div className="p-2">

                  <label>
                    <p className='labelText'>AMOUNT:</p>
                    <p></p>
                    <input
                      id='amountInput'
                      className='input'
                      type='number'
                    />
                  </label>
                </div>
                <div className="p-2">                
                  <label>
                  <p className='labelText'>INTEREST:</p>

                  <input
                    id='amountInput'
                    className='input'
                    type='number'
                  />
                </label>
                </div>
                <div className="p-2">
                  <p className='labelText'>TIME:</p>
                  {/* Time Period Input */}

                  <input
                    id='amountInput'
                    className='input'
                    type='number'
                  />
                </div>
                <div className="p-2">
                  <Button>
                    CALCULATE INTEREST
                  </Button>
                </div>
              </Stack>
              <Stack gap={3}>
                <div className="p-2"></div>
                <div className="p-2">
                  <span>
                    <h6 className='interest'>INTEREST</h6>
                    <h6 className='interest'><strong>R</strong></h6>
                    <h6 className='interest'>
                      {/* totalInterest */}
                    </h6>
                  </span>
                </div>
                <div className="p-2"></div>
              </Stack>
          </div>       
          </Col>
          <Col></Col>
        </Row>
    </section>
    <Footer logout={logout} currentUser={currentUser}/>
    </>
  )
}
