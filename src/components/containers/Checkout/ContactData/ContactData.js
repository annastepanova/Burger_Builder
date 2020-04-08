import React, { Component } from 'react'
import Button from '../../../UI/Button/Button'
import Spinner from '../../../UI/Spinner/Spinner'
import Input from '../../../../components/UI/Input/Input.js'
import styles from './Contact.module.css'
import axios from '../../../../axios_orders'

class ContactData extends Component {

  state = {
        orderForm: {
            name: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Your name'
              },
              value: ''
            },
            street: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Street'
              },
              value: ''
            },
            zipCode: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'ZipCode'
              },
              value: ''
            },
            country: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Country'
              },
              value: ''
            },
            email: {
              elementType: 'input',
              elementConfig: {
                type: 'email',
                placeholder: 'Your e-mail'
              },
              value: ''
            },
            deliveryMethod: {
              elementType: 'select',
              elementConfig: {
                options: [
                  {value: 'delivery', displayValue: 'Delivery'},
                  {value: 'pickup', displayValue: 'Pickup' },
                ]
              },
              value: ''
            }
            },
            loading: false
  }

  orderHandler = (event) => {
    event.preventDefault()
    this.setState({loading: true})
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
        <Input elementType="..." elementConfig="..." value="..." />
        <Input inputtype="input" type="email" name="email" placeholder="Your email" />
        <Input inputtype="input" type="text" name="street" placeholder="Address" />
        <Input inputtype="input" type="text" name="zipcode" placeholder="Zipcode" />
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
