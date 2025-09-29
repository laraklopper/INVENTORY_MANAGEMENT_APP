import React from 'react'
import Header from '../components/Header'

export default function DashBoard({currentUser, logout}) {
  return (
    <>
    <Header heading='HOME' currentUser={currentUser}/>
    </>
  )
}
