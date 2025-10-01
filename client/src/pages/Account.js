import React from 'react'
import './pageCss/Account.css'
import '../CSS/DataList.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Header from '../components/Header'
import Footer from '../components/Footer'



export default function Account({currentUser ,logout}) {

  return (
    <>
    <Header currentUser={currentUser}/>
   
    <section id='accountSection1'>
        <Row>
          <Col>1 of 3</Col>
          <Col xs={5}>
            <Stack gap={3}>
              <div className="p-2">
                <h2 id='calculatorHeading'>INTEREST CALCULATOR</h2>
              </div>
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
              <div className="p-2">                <label>
                <p className='labelText'>INTEREST:</p>
                
                <input
                  id='amountInput'
                  className='input'
                  type='number'
                />
              </label></div>
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
          </Col>
          <Col></Col>
        </Row>
    </section>
    <Footer logout={logout} currentUser={currentUser}/>
    </>
  )
}
