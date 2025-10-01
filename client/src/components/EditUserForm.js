import React from 'react'
import '../CSS/Forms.css'
import '../CSS/EditUserDetails.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
export default function EditUserForm({editUserData, setEditUserData, currentUser}) {


    const handleInputChange = (event) => {
        // Extract the 'name' and 'value' from the input event
        const { name, value } = event.target;

        if (name.startsWith('fullName.')) {
            // Extract the specific field name ('firstName', 'lastName')
            const [, field] = name.split('.');
            // Update the specific key in the 'fullName' object inside newUserData
            setEditUserData((prevState) => ({
                ...prevState, // Keep the rest of the state unchanged
                fullName: {
                    ...prevState.fullName,// Keep other fullName fields unchanged
                    [field]: value        // Update the targeted fullName field
                }
            }));
        }
        else if (name.startsWith('contactDetails.')) {// Extract the specific field name
            const [, field] = name.split('.');
            setEditUserData((prev) => ({
                ...prev,
                contactDetails: {
                    ...prev.contactDetails,
                    [field]: value
                }
            }))
        }
        else {
            // For non-nested fields (like companyName, username), update directly
            setEditUserData((prev) => ({
                ...prev,
                [name]: value
            }));

        }
    };


    //Function to clear form
    const clearForm = () => {
        const confirmClear = window.confirm("Are you sure you want to clear the form?");
        if (!confirmClear) return;

        setEditUserData({
            username: currentUser?.username || '',
            companyName: currentUser?.companyName || '',
            position: currentUser?.position || '',
            fullName: {
                firstName: currentUser.fullName?.firstName || '',
                lastName: currentUser.fullName?.lastName || ''
            },
            contactDetails: {
                email: currentUser.contactDetails?.email || '',
                contactNumber: currentUser.contactDetails?.contactNumber || ''
            }
        });
    };

  return (
    <form id='editUserForm'>
         
          <Row>
              <Col xs={6} md={4}>
                 <label className='editUserLabel'>
                    <p className='labelText'>USERNAME:</p>
                    <input
                    className='input'
                          placeholder={currentUser?.username || 'USERNAME'}
                          onChange={handleInputChange}
                          name='username'
                          value={editUserData.username}
                          aria-required='false'
                          aria-label='Username input field'
                    />
                    </label>
              </Col>
              <Col xs={6} md={4}>
                  <label className='editUserLabel'>
                      <p className='labelText'>COMPANY NAME:</p>
                      <input
                          className='input'
                          name="companyName"
                          value={editUserData.companyName}
                          placeholder={currentUser?.companyName || 'COMPANY NAME'}
                          onChange={handleInputChange}
                          aria-label='Company name input field'
                          aria-required='false'    
                      />
                  </label>
              </Col>
              <Col xs={6} md={4}>
                  <label htmlFor="position" className='editUserLabel'>
                      <p className='labelText'>POSITION:</p>
                      <select
                          id="positionInput"
                          name="position"
                          // className='input'
                          value={editUserData.position}
                          onChange={handleInputChange}
                          aria-label='Position dropdown'
                          aria-required='false'
                          placeholder={currentUser?.position || 'POSITION'}
                      >
                          <option className='option' value="" disabled>SELECT</option>
                          <option className='option' value="Manager">MANAGER</option>
                          <option className='option' value="Admin">ADMIN</option>
                          <option className='option' value="Employee">CLEARK</option>
                          <option className='option' value="viewer">VIEWER</option>
                      </select>
                  </label>
              </Col>
            </Row>
          <Row>
              <Col xs={12} md={8}>
                  <div id='editUserFullName'>
                      <label className='editUserLabel' htmlFor="editFirstName">
                          <p className='labelText'>FIRST NAME:</p>
                          <input
                              type="text"
                              id="editFirstName"
                              name='fullName.firstName'
                              value={editUserData.fullName.firstName}
                              autoComplete='given-name'
                              className='input'
                              placeholder={currentUser?.fullName?.firstName || 'FIRST NAME'}
                              onChange={handleInputChange}
                              required
                              aria-label='First name input field'
                              aria-required='true'
                          />
                      </label>
                      <label htmlFor="editLastName" className='editUserLabel'>
                          <p className='labelText'>Last Name:</p>
                          <input
                              type="text"
                              className='input'
                              id="editLastName"
                              name='fullName.lastName'
                              value={editUserData.fullName.lastName}
                              placeholder={currentUser?.fullName?.lastName || 'LAST NAME'}
                              onChange={handleInputChange}
                              required
                              autoComplete='family-name'
                              aria-label='Last name input field'
                              aria-required='true'
                          />
                      </label>
                  </div>
              </Col>
              <Col xs={6} md={4}>
                 
              </Col>
          </Row>
          <Row>
              <Col xs={12} md={8}>
                  <div id='editUserContactDetails'>
                      <label className='editUserLabel'>
                          <p className='labelText'>EMAIL:</p>
                          <input
                              type="email"
                              className='input'
                              id="editEmail"
                              name='contactDetails.email'
                              value={editUserData.contactDetails.email}
                              placeholder={currentUser?.contactDetails?.email || 'EMAIL'}
                              onChange={handleInputChange}
                              aria-label='Email input field'
                              aria-required='false'
                          />
                      </label>
                      <label className='editUserLabel '>
                          <p className='labelText'>CONTACT NUMBER:</p>
                          <input
                              type="text"
                              className='input'
                              id="editContactNumber"
                              name='contactDetails.contactNumber'
                              value={editUserData.contactDetails.contactNumber}
                              placeholder={currentUser?.contactDetails?.contactNumber || 'CONTACT NUMBER'}
                              onChange={handleInputChange}
                              aria-label='Contact number input field'
                              aria-required='false'
                          />
                      </label>
                  </div>  
              </Col>
              <Col xs={6} md={4}>
              
              </Col>
          </Row>
          <Row id='editUserFormRow4'>
              <Col>
                  <Stack direction="horizontal" gap={3} id='editUserFormBtnStack'>
                      <div className="p-2"></div>
                      <div className="p-2 ms-auto">
                          <Button
                              variant="danger"
                              type='button'
                              id='cancelEditUserBtn'
                              onClick={clearForm}
                          >CLEAR FORM</Button>
                      </div>
                      <div className="p-2">
                          <Button
                              variant="light"
                              type='submit'
                              id='editUserBtn'
                              aria-label='Submit edit user form Button'
                          >EDIT USER</Button>
                      </div>

                  </Stack>
              </Col>
          </Row>
    </form>
  )
}
