import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Account({currentUser ,logout}) {
  return (
    <>
    <Header currentUser={currentUser}/>
    <section></section>
    <Footer logout={logout} currentUser={currentUser}/>
    </>
  )
}
