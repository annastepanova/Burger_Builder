import React, { Component } from 'react'
import Button from '../../../UI/Button/Button'
import Spinner from '../../../UI/Spinner/Spinner'
import styles from './Contact.module.css'
import axios from '../../../../axios_orders'

class ContactData extends Component {

  state = {
            name: '', 
            email: '',
            address: {
              street: '',
              zipcode: ''
            },
            loading: false
  }

  orderHandler = (event) => {
    event.preventDefault()
    this.setState({loading: true})
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Anna Stepanova',
        address: 'Some Street 1',
        city: 'Miami',
        zipcode: '123456'
      },
      email: 'poop@mail.com',
      deliveryMethod: 'delivery'
    }
    axios.post('/orders.json', order)
    .then(response => 
      this.setState({ loading: false }),
      this.props.history.push('/')
      )
    .catch(error => 
      this.setState({ loading: false })
      )

  }


  render () {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your name" />
        <input type="email" name="email" placeholder="Your email" />
        <input type="text" name="street" placeholder="Address" />
        <input type="text" name="zipcode" placeholder="Zipcode" />
        <Button btnType="success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    )
    if (this.state.loading) {
      form = <Spinner/>
    }

    return (
      <div className={styles.contactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>

    )

  }
}

export default ContactData
