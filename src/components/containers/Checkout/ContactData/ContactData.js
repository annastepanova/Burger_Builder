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
    const formData = {}
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
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

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const formElement = {...updatedOrderForm[inputIdentifier]}
    formElement.value = event.target.value
    updatedOrderForm[inputIdentifier] = formElement
    this.setState({orderForm: updatedOrderForm})

  }


  render () {
    const formElementsArray = []
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
          key={formElement.id} 
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        )      
        )}
        <Button btnType="success">ORDER</Button>
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
