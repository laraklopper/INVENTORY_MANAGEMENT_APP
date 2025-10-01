import React, { useCallback, useState } from 'react'
import '../CSS/Forms.css'
import '../CSS/EditUserDetails.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function EditPasswordForm({setError}) {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setCurrentPassword('');
        setNewPassword('');
    };

    const editPassword = useCallback(async (e) => {
        e.preventDefault()
    })
  return (
    <form id='editPasswordForm'>
          <Row>
              <Col>
                  <Card id='newPasswordInstructCard'>
                      <ListGroup variant="flush" id='newPasswordRulesList'>
                          <ListGroup.Item id='passwordRule1'><p>PASSWORDS MUST BE AT LEAST 8 CHARACTERS AND AT LEAST ONE SPECIAL CHARACTER</p></ListGroup.Item>
                          <ListGroup.Item id='passwordRule2'><p>NEW PASSWORD MUST BE DIFFERENT TO THE CURRENT PASSWORD</p></ListGroup.Item>
                      </ListGroup>
                  </Card>
                 
              </Col>
              <Col xs={5} id='editPasswordCol'>
                  <Stack gap={3} id='newPasswordInputStack'>
                      <div className="p-2" id='currentPasswordBlock'>
                        <label className='newPasswordLabel' htmlFor='currentPasswordInput'>
                            <p className='labelText'>CURRENT PASSWORD:</p>
                            <input
                                  className='input'
                                  autoComplete="current-password"
                                  value={currentPassword}
                                  onChange={(e) => setCurrentPassword(e.target.value)}
                                  required
                                  minLength={8}
                                    id='currentPasswordInput'
                                  placeholder='CURRENT PASSWORD'
                                  aria-required='true'
                                  aria-label="Current password"
                            />
                        </label>
                      </div>
                      <div className="p-2">
                          <label className='newPasswordLabel'>
                              <p className='labelText'>NEW PASSWORD:</p>
                              <input
                                  type="password"
                                  className="input"
                                  autoComplete="new-password"
                                  placeholder='NEW PASSWORD'
                                  value={newPassword}
                                  onChange={(e) => setNewPassword(e.target.value)}
                                  required
                                  minLength={8}
                                  disabled={loading}
                                  aria-label="New password Input"
                                  aria-required='true'
                              />
                          </label>
                      </div>
                      <div className="p-2" id='editPasswordBtnsBlock'>
                          <Button
                              variant="danger"
                              type='button'
                              id='cancelPasswordChangeBtn'
                              onClick={resetForm}
                              aria-label='Button to reset new password form'
                          >
                              CANCEL
                          </Button>
                          <Button
                              variant="danger"
                              type='submit'
                              id='newPasswordBtn'
                              aria-label='button to submit new password form'
                          >
                              {loading ? 'Saving…' : 'Save changes'}
                          </Button>
                      </div>
                  </Stack>
              </Col>
              <Col></Col>
          </Row>
        
    </form>
  )
}
