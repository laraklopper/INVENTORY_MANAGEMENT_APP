import React, { useState } from 'react'
import '../CSS/Forms.css';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

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
                              onClick={() => setShowPassword(!showPassword)}
                              aria-label={showPassword ? 'Hide Password' : 'Show Password'}
                              aria-pressed={showPassword}
                            >
                                {showPassword ? 'HIDE PASSWORD' : 'SHOW PASSWORD'}
                            </Button>
                        </div>
                    </label>
                  </div>
                  {passwordMsg && (
                      <div className="p-2" id='messageBlock'>
                         <i> <h6 className='msgText'>
                              <strong>We will never share <br /> your password</strong>
                          </h6>
                      </i>
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
