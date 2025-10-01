import React, { useState } from 'react'
import './pageCss/Account.css'
import '../CSS/DataList.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { dateDisplay } from '../functions/dateFunctions';
import { SquareUserRound, Phone, Mail, ShieldUser, Calendar, User, Building2, Smile, BriefcaseBusiness } from 'lucide-react';


export default function Account({currentUser ,logout}) {
  const [editUserForm, setEditUserForm] = useState({
    username: currentUser?.username || '',
    companyName: currentUser?.companyName || '',
    position: currentUser.position || '',
    fullName: {
      firstName: currentUser?.fullName?.firstName || '',
      lastName: currentUser?.fullName?.lastName || ''
    },
    contactDetails: {
      email: currentUser?.contactDetails?.email || '',
      contactNumber: currentUser?.contactDetails?.contactNumber || ''
    },
  })
  const [activeForm, setActiveForm] = useState(null)

  // State to manage whether the user is in edit mode
  const showAccountForm = activeForm === 'account'
  const showPasswordForm = activeForm === 'password'

  //User details variables
  const username = currentUser?.username || 'Username Not provided'
  const firstName = currentUser?.fullName?.firstName || 'First name not provided';
  const lastName = currentUser?.fullName?.lastName || 'Last name not provided';
  const email = currentUser?.contactDetails?.email || 'No email provided';
  const contactNumber = currentUser?.contactDetails?.contactNumber || 'No Contact number provided';
  const position = currentUser?.position || '';
  const companyName = currentUser?.companyName || 'No Company name provided';
  const dateOfBirth = currentUser?.dateOfBirth || 'No date provided';
  const isAdmin = currentUser?.admin ? 'Yes' : 'No';
  return (
    <>
    <Header currentUser={currentUser}/>
   
    <section id='accountSection2'>
        
    </section>
    <Footer logout={logout} currentUser={currentUser}/>
    </>
  )
}
