import React, { useState } from 'react'
import '../CSS/Forms.css';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { EyeOff } from 'lucide-react';
import { Eye } from 'lucide-react';
export default function LoginForm({setUserData, submitLogin, userData}) {
    const [showPassword, setShowPassword] = useState(false)
    const [passwordMsg, setPasswordMsg] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        submitLogin()
    }
    const handleLoginInput = (event) =>{
        const {name, value} = event.target
        setUserData((prev) => ({
            ...prev,
            [name] :value
        }))
    }
    const togglePassword = () => setShowPassword((prev) => !prev);

  return (
        <form aria-label='LoginForm' id='loginForm' onSubmit={handleLogin}>
              <Stack gap={3} id='loginDetails'>
                  <div className="p-2" id='usernameBlock'>
                    <label className='loginLabel'>
                        <p className='labelText'>USERNAME:</p>
                        <input
                        className='input'
                        name='username'
                        value={userData.username}
                        placeholder='USERNAME'
                        required
                        autoComplete='off'
                        onChange={handleLoginInput}
                        aria-label='loginInput'
                        aria-required='true'
                        />
                    </label>
                  </div>
                  <div className="p-2" id='loginPasswordBlock'>
                    <label className='loginLabel'>
                        <p className='labelText'>PASSWORD</p>
                        <input
                              className='input'
                              type={showPassword ? 'text' : 'password'}
                              name='password'
                              value={userData.password}
                              onChange={handleLoginInput}
                              autoComplete='current-password'
                              required
                              placeholder='PASSWORD'
                              aria-required='true'
                              onFocus={() => setPasswordMsg(true)}
                              onBlur={() => setPasswordMsg(false)}
                        />
                        <div id='showPassword'>
                            <Button 
                              variant='warning'
                              type='button'
                              id='passwordDisplayBtn'
                              onClick={togglePassword}
                              aria-label={showPassword ? 'Hide Password ' : 'Show Password' }
                              aria-pressed={showPassword}
                              aria-controls="password" // connects the toggle to the input
                            >
                              {showPassword ? (
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
                    </label>
                  </div>
              {passwordMsg && (
                  <div className="p-2" id="messageBlock" aria-live="polite">
                      <p className="msgText">
                          <em>
                              <strong>We will never share your password.</strong>
                          </em>
                      </p>
                  </div>
              )}
                  <div className="p-2" id='loginBtnBlock'>
                    <Button
                    variant='light'
                    type='submit'
                    id='loginBtn'
                    aria-label='Submit Login Form Button'
                    >
                        LOGIN
                    </Button>
                  </div>
              </Stack>
        </form>
  )
}
