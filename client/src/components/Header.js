import React, { useEffect, useState } from 'react'
import '../CSS/Header.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { ClipboardList } from 'lucide-react';
import { User } from 'lucide-react';
import { House } from 'lucide-react';
import { BookUser } from 'lucide-react';
import { Clock } from 'lucide-react';
export default function Header({currentUser, heading}) {
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date(), 1000)
            return () => clearInterval(timer)
        }, []);
    },[])


    const formattedTime = currentTime.toLocaleTimeString()
  return (
    <header className='header'>
          <Row id='headerRow'>
              <Col></Col>
              <Col xs={6}>
                  <Card id='headerCard'>
                      <Card.Header id='cardHeader'>
                          <h1 id='heading' aria-label='application Heading' aria-level={1}>
                              INVENTORY MANAGER
                          </h1>
                      </Card.Header>
                      <ListGroup variant="flush">
                        <ListGroup.Item id='listItem2'>
                        <i><h1 className='heading'>{heading}</h1></i>
                          </ListGroup.Item>                
                          {currentUser?.username && (
                              <ListGroup.Item variant="warning" id="listItem1">
                                  <i>
                                      <h2 className="headerStatus">
                                          <User color='black'/>     {currentUser.username}
                                      </h2>
                                  </i>
                              </ListGroup.Item>
                          )}            
                     
                      <ListGroup.Item variant='warning' id='listItem2'>
                              <h3 className='headerStatus' aria-level={3}>   <BookUser color='black' /> {currentUser.position}</h3>
                      </ListGroup.Item>
                      </ListGroup>
                  </Card>
              </Col>
              <Col id='timeCol'>
                  <Card id='timeCard'>
                      <Card.Body id='headerTimeBody'>
                          
                          <h2 className='formattedTime' aria-live='polite'><Clock id='clock' /> {formattedTime}</h2>
                      </Card.Body>
                  </Card>
              </Col>
          </Row>
          <Row>
              <Col></Col>
              <Col xs={6} id='navCol'>
              <nav className='navigation'>
                <ul id='navbar'>
                          {currentUser && (
                              <li className='linkItem'>
                                  <Link className='refLink' to='/'>
                                      <p className='linkIcon'><House /></p>
                                      <p className='linkText'>HOME</p>
                                </Link>
                              </li>
                          )}
                          {currentUser && (
                            <li className='linkItem'>
                                  <Link className='refLink' to='/account'> 
                                      <p className='linkIcon'><User /></p>
                                      <p className='linkText'>ACCOUNT</p>
                                   </Link>
                            </li>
                          )}
                          {currentUser?.admin && (
                            <li className='linkItem'>                                  
                                  <Link className='refLink' to='/stock'>
                                    <p className='linkIcon'><ClipboardList /></p>
                                  <p className='linkText'>STOCK</p></Link>
                            </li>
                          )}
                </ul>
              </nav>
              </Col>
              <Col></Col>
          </Row>
    </header>
  )
}
