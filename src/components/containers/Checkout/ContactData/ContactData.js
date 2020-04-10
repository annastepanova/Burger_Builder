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
              value: '',
              validation: {
                required: true
              },
              valid: false,
              touched: false
            },
            street: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Street'
              },
              value: '',
              validation: {
                required: true
              },
              valid: false,
              touched: false
            },
            zipCode: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'ZipCode'
              },
              value: '',
              validation: {
                required: true,
                minLength: 5,
                maxLength: 5
              },
              valid: false,
              touched: false
            },
            country: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Country'
              },
              value: '',
              validation: {
                required: true
              },
              valid: false,
              touched: false
            },
            email: {
              elementType: 'input',
              elementConfig: {
                type: 'email',
                placeholder: 'Your e-mail'
              },
              value: '',
              validation: {
                required: true
              },
              valid: false,
              touched: false
            },
            deliveryMethod: {
              elementType: 'select',
              elementConfig: {
                options: [
                  {value: 'delivery', displayValue: 'Delivery'},
                  {value: 'pickup', displayValue: 'Pickup' },
                ]
              },
              value: 'delivery',
              validation: {},
              valid: true
            }
            },
            formIsValid: false,
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

  checkValidation = (value, rules) => {
    let isValid = true

    if (!rules) {
      return true;
    }
    
    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }
    return isValid
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const formElement = {...updatedOrderForm[inputIdentifier]}
    formElement.value = event.target.value
    formElement.valid = this.checkValidation(formElement.value, formElement.validation)
    formElement.touched = true
    updatedOrderForm[inputIdentifier] = formElement
    let formIsValid = true
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    }
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})

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
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        )      
        )}
        <Button btnType="success" disabled={!this.state.formIsValid}>ORDER</Button>
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
