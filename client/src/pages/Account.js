import React from 'react'
import './pageCss/Account.css'
import '../CSS/DataList.css'
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
// import Stack from 'react-bootstrap/Stack';
import Header from '../components/Header'
import Footer from '../components/Footer'



export default function Account({currentUser ,logout}) {
  

  return (
    <>
    <Header currentUser={currentUser}/>
   
    <section id='accountSection2'>
        
    </section>
    <Footer logout={logout} currentUser={currentUser}/>
    </>
  )
}
