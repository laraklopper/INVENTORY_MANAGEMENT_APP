import React, { useEffect, useState } from 'react'
import '../CSS/Header.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

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
          <Row>
              <Col>1 of 3</Col>
              <Col xs={6}>
                  <Card style={{ width: '18rem' }}>
                      <Card.Header>
                          <h1 id='heading' aria-label='application Heading' aria-level={1}>
                              INVENTORY MANAGER
                          </h1>
                      </Card.Header>
                      <ListGroup variant="flush">
                          {currentUser?.username && (
                              <ListGroup.Item variant="warning" id="listItem1">
                                  <i>
                                      <h2 className="headerStatus">
                                          USERNAME: {currentUser.username}
                                      </h2>
                                  </i>
                              </ListGroup.Item>
                          )}
                          
                      </ListGroup>
                  </Card>
              </Col>
              <Col>
                  <Card>
                      <Card.Body>
                          <h1 className='formattedTime' aria-live='polite'>{formattedTime}</h1>
                      </Card.Body>
                  </Card>
              </Col>
          </Row>
          <Row>
              <Col>1 of 3</Col>
              <Col xs={6}>
              <nav>
                <ul>
                          {currentUser && (
                              <li className='linkItem'>
                                  <Link className='refLink' to='/'>HOME</Link>
                              </li>
                          )}
                          {currentUser?.admin && (
                            <li className='linkItem'>
                                <Link className='refLink' to='/stock'>STOCK</Link>
                            </li>
                          )}
                </ul>
              </nav>
                 
              </Col>
              <Col>3 of 3</Col>
          </Row>
    </header>
  )
}
