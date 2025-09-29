import React from 'react'
import '../CSS/Forms.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function FormHeadings({formHeading}) {
    //========JSX RENDERING=============
  return (
      <Row id='formHeadingRow'>
          <Col></Col>
          <Col xs={5} id='formHeadingCol'>
           
                <h3 className='formHeading' aria-level={3}>{formHeading}</h3>
             
          </Col>
          <Col></Col>
      </Row>
  )
}
