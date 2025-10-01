import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Customers({currentUser, logout}) {
  return (
    <>
    <Header heading='CUSTOMERS' currentUser={currentUser}/> 
    <section>

    </section>
    <Footer currentUser={currentUser} logout={logout}/>
    </>
  )
}
