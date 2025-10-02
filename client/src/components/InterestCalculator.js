import React, { useState } from 'react'
import '../CSS/Forms.css'
// Bootstrap
import Button from 'react-bootstrap/Button'; // Import Bootstrap Button component
import Row from 'react-bootstrap/Row';       // Import Bootstrap Row layout
import Col from 'react-bootstrap/Col';       // Import Bootstrap Column layout
import Stack from 'react-bootstrap/Stack';


export default function InterestCalculator() {
    const [principal, setPrincipal] = useState(0)
    const [interestRate, setInterestRate] = useState(0); // State  used to store the interest rate
    const [timePeriod, setTimePeriod] = useState(0); // State used to store the time period
    const [totalInterest, setTotalInterest] = useState(0); // Stores the calculated total interest

    //=========EVENT LISTENERS==================
    // Event handler for principal input change
    function handlePrincipalChange(event) {
        setPrincipal(event.target.value);
    }

    // Event handler for interest rate input change
    function handleInterestRateChange(event) {
        setInterestRate(event.target.value);
    }

    // Event handler for time period input change
    function handleTimePeriodChange(event) {
        setTimePeriod(event.target.value);
    }

    // Function to calculate the interest
    function calculateInterest() {
        const interest = (principal * interestRate * timePeriod) / 100; // Calculate the interest
        setTotalInterest(interest); // Update the totalInterest state with the calculated interest
    }

  return (
    <div id='calculator'>
          <Stack  id='calculatorDisplayStack'>
              <div >
                <h2 id='calculatorHeading'>INTEREST CALCULATOR</h2></div>
              <div id='amountBlock'>
                  <label className='calculatorLabel' htmlFor='amountInput'>
                      <p className='labelText'>AMOUNT:</p>
                      <div id='amountDiv'>
                          <p className='para2'>R:</p>
                          {/* Principal Amount input field */}
                          <input
                              id='amountInput'
                              type='number'
                              className='input'
                              autoComplete='off'
                              placeholder='0'
                              value={principal}
                              onChange={handlePrincipalChange}
                              step='0.01'
                              aria-label='principal amount input'
                          />
                      </div>
                  
                  </label>
              </div>
              <div id='interestBlock'>
                  <label className='calculatorLabel'>
                    <p className='labelText'>INTEREST:</p>
                    <input
                          type='number'
                          id='interestRateInput'
                          className='input'
                          autoComplete='off'
                          placeholder='0'
                          value={interestRate}
                          onChange={handleInterestRateChange}
                          step='0.01'
                          aria-label='Interest Rate Input'
                    />
                </label>
              </div>
              <div className="p-2" id='timeBlock'>
                <label className='calculatorLabel'>
                    <p className='labelText'>TIME:</p>
                    <div id='timeDiv'>
                          <input
                              type='number'
                              autoComplete='off'
                              className='input'
                              id='timeInput'
                              onChange={handleTimePeriodChange}
                              value={timePeriod}
                              step='0.01'
                              aria-label='Time Input'

                          />
                          <p className='labelText'>Months</p>
                    </div>
                    
                </label>
              </div>
              <div className="p-2">
                <Button
                id='calculateBtn'
                onClick={calculateInterest}
                >
                    CALCULATE INTEREST
                </Button>
              </div>
          </Stack>
          <Stack gap={3}>
              <div className="p-2"></div>
              {/* Output display for calculated interest in Rand*/}
              <div id='interestOutput' >
                  <div id='totalInterest'>
                      <h6 className='interest'>INTEREST:</h6>
                      <h6 className='interest'><strong>R</strong></h6>
                      <h6 className='interest'>{totalInterest}</h6>
                  </div>
              </div>
          </Stack>
    </div>
  )
}
