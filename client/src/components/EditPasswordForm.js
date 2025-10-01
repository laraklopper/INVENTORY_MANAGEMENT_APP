import React, { useCallback, useState } from 'react'
import '../CSS/Forms.css'
import '../CSS/EditUserDetails.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { EyeOff, Eye } from 'lucide-react';
export default function EditPasswordForm({setError}) {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordDisplay, setPasswordDisplay] = useState(false)

    const resetForm = () => {
        setCurrentPassword('');
        setNewPassword('');
    };


    const isStrongPassword = (pwd) =>
        /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(pwd);


    const editPassword = useCallback(async () => {
    
        setError?.(null)
        try {
            if (!newPassword || !currentPassword) {
                alert('Both current and new passwords are required.');
                throw new Error("Both current and new passwords are required.");
            }

            if (newPassword === currentPassword) {
                alert('New password must be different from the current password.');
                throw new Error("New password must be different from the current password.");
            }
            if (!isStrongPassword(newPassword)) {
                alert('New password must be at least 8 characters long and include at least one special character.');
                throw new Error("New password must be at least 8 characters long and include at least one special character.");
            }
            const token = localStorage.getItem('token');
            if (!token) {
                alert('User is not authenticated. Please log in again.');
                throw new Error("User is not authenticated. Please log in again.");
            }
            const response = await fetch('http://localhost:3001/users/editPassword', {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword
                }),
            });
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                const errorMessage = data.message || 'Failed to change password.';
                alert(errorMessage);
                throw new Error(errorMessage);
            }

            resetForm();
            console.log('[SUCCESS: EditPasswordForm.js] Password successfully changed');
            setLoading(false);
            setError?.(null)
            alert('Password changed successfully.');
        } catch (error) {
            setError?.(error.message || 'An error occurred while changing the password.');
            console.error('[ERROR: EditPasswordForm.js, editPassword] ', error.message);
            alert(`Error changing password`);
        }finally{
            setLoading(false)
        }
    },[currentPassword, newPassword, setError])

    // Wrap the confirm dialog around the async call
    const handleSubmit = (e) => {
        e.preventDefault();
        const confirmed = window.confirm('Are you sure you want to change the password?');
        if (confirmed) {
            // Call the async handler (no event needed since it already prevents default here)
            void editPassword();
        }
    };

    const togglePassword = () => setPasswordDisplay((prev) => !prev);
    //====================JSX RENDERING=====================
  return (
    <form id='editPasswordForm' onSubmit={handleSubmit} aria-label='Edit password form'>
          <Row>
              <Col>
                  <Card id='newPasswordInstructCard'>
                      <ListGroup variant="flush" id='newPasswordRulesList'>
                          <ListGroup.Item id='passwordRule1'><p className='passwordRule'>PASSWORDS MUST BE AT LEAST 8 CHARACTERS AND AT LEAST ONE SPECIAL CHARACTER</p></ListGroup.Item>
                          <ListGroup.Item id='passwordRule2'><p className='passwordRule'>NEW PASSWORD MUST BE DIFFERENT TO THE CURRENT PASSWORD</p></ListGroup.Item>
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
                                  type={passwordDisplay ? 'text' : 'password'}
                                  
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
                                  type={passwordDisplay ? 'text' : 'password'}
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
                          <div  id='togglePasswordBlock'>
                          <Button
                          type='button'
                          onClick={togglePassword}
                          variant='warning'
                          role='button'
                          aria-pressed={passwordDisplay}
                          aria-label='toggle new password button'
                          id='toggleNewPasswordBtn'
                          >
                              {passwordDisplay ? (
                                  <>
                                      Hide Password <EyeOff style={{ marginLeft: 6 }} />
                                  </>
                              ) : (
                                  <>
                                      Show Password <Eye style={{ marginLeft: 6 }} />
                                  </>
                              )}
                          </Button>
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
