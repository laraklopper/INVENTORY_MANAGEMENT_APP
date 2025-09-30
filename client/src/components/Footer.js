import React from 'react'
import '../CSS/Footer.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
export default function Footer({currentUser, logout}) {
  return (
    <footer>
        <Row>
            <Col>
                  <Stack direction="horizontal" gap={3}>
                      <div className="p-2">
                          <h5 id='status'>Logged in as: {currentUser.admin ? 'Admin' : 'User'}</h5>

                      </div>
                      <div className="p-2 ms-auto">Second item</div>
                      <div className="p-2">Third item</div>
                  </Stack>

            </Col>
        </Row>
        <Row id='logoutRow'>
              <Stack direction="horizontal" gap={3}>
                  <div className="p-2"></div>
                  <div className="p-2 ms-auto"></div>
                  <div className="p-2">
                      <Button 
                      variant="warning"
                      type='button'
                      onClick={logout}
                      
                      >LOGOUT</Button>
                  </div>
              </Stack>

        </Row>


    </footer>
  )
}
