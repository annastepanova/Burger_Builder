import React, { Component } from 'react'
import Button from '../../../UI/Button/Button'
import styles from './Contact.module.css'

class ContactData extends Component {

  state = {
            name: '', 
            email: '',
            address: {
              street: '',
              zipcode: ''
            }
  }


  render () {

    return (
      <div className={styles.contactData}>
        <h4>Enter your contact data</h4>
        <form>
          <input type="text" name="name" placeholder="Your name"/>
          <input type="email" name="email" placeholder="Your email" />
          <input type="text" name="street" placeholder="Address" />
          <input type="text" name="zipcode" placeholder="Zipcode" />
          <Button btnType="success">ORDER</Button>
        </form>
      </div>

    )

  }
}

export default ContactData
