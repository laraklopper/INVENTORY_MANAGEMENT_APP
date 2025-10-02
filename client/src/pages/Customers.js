import React from 'react'
import './pageCss/Customers.css'
import Button from 'react-bootstrap/Button';
import Header from '../components/Header'
import Footer from '../components/Footer'
import FormHeadings from '../components/FormHeadings'
import AddCustomerForm from '../components/AddCustomerForm';

export default function Customers({currentUser, logout}) {
  return (
    <>
    <Header heading='CUSTOMERS' currentUser={currentUser}/> 
    <section>
      <div>
        <p>CLICK HERE TO</p><Button>ADD CUSTOMER</Button>
      </div>
      <div>
        <FormHeadings/>
        <AddCustomerForm/>
      </div>
    </section>
    <Footer currentUser={currentUser} logout={logout}/>
    </>
  )
}
