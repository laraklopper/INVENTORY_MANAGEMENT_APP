import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function DashBoard({currentUser, logout}) {
  return (
    <>
    <Header heading='HOME' currentUser={currentUser}/>
    <section></section>
    <Footer logout={logout} currentUser={currentUser}/>
    </>
  )
}
