import React from 'react'

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Stock({currentUser, logout}) {
  return (
    <>
  
        <Header currentUser={currentUser}/>
  <section></section>
  <Footer currentUser={currentUser} logout={logout}/>
    </>
  )
}
