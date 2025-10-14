import React, { useState } from 'react'
import './pageCss/Customers.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header'
import Footer from '../components/Footer'
import FormHeadings from '../components/FormHeadings'
import AddCustomerForm from '../components/AddCustomerForm';


export default function Customers({currentUser, logout}) {
  const [newCustomerData, setNewCustomerData] = useState({
    code: '',
    fullName: {
      firstName: '',
      lastName: '',
    },
    contactDetails:{
      email: '',
      contactNumber: '',
    },
    shippingAddress: {
      street: '',
      city: '',
      postalCode: '',
      province:'',
      country: '',
    },
    paymentDetails: {
      paid: false,
      notes: '',
    },
    isActive: false,
  })

  //======================================
  
  return (
    <>
    <Header heading='CUSTOMERS' currentUser={currentUser}/> 
    <section id='customersSection'>
      <h2>Customers</h2>
    </section>
    <section id='addCustomerSection'>
        <Row>
          <Col></Col>
          <Col xs={5} id='addCustomerCol'>
            <h6 className='btnText'>CLICK HERE TO:</h6>
            <Button>ADD CUSTOMER</Button>
          </Col>
          <Col></Col>
        </Row>
      <div>
        <FormHeadings formHeading='ADD CUSTOMER'/>
        <AddCustomerForm/>
      </div>
    </section>
    <Footer currentUser={currentUser} logout={logout}/>
    </>
  )
}
