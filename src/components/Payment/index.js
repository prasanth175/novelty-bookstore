import {Component} from 'react'

import './index.css'

class Payment extends Component {
  createOrder = async () => {
    console.log('hi')
    const orderUrl = 'http://localhost:3006/create-order'
    const response = await fetch(orderUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 1000, // the amount to be paid, in paisa
        currency: 'INR', // the currency in which the payment is to be made
      }),
    })

    const order = await response.json()

    return order
  }

  handlePayment = async () => {
    const order = await this.createOrder()

    const options = {
      key: 'rzp_test_SUCPQkxTXgHfQb',
      amount: order.amount,
      currency: order.currency,
      name: 'Prasanth Kumar Kodamanchili',
      description: 'Your payment description',
      order_id: order.id,
      handler: response => {
        // handle successful payment
        console.log(response)
      },
      prefill: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#F37254',
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  render() {
    return (
      <div className="payment-container">
        <div className="pay-box">
          <button
            className="payment-btn"
            type="button"
            onClick={this.handlePayment}
          >
            Pay Now
          </button>
        </div>
      </div>
    )
  }
}

export default Payment
