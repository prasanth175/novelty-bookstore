import {Component} from 'react'
import Header from '../Header'

import './index.css'

class Payment extends Component {
  state = {
    imageUrl: '',
    price: '',
    total: '',
    username: '',
    mail: '',
    paymentDetails: {},
  }

  componentDidMount = async () => {
    console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const paymentUrl = `http://localhost:3006/payments/${id}`
    const response = await fetch(paymentUrl)
    const data = await response.json()
    console.log(response)
    console.log(data)
    this.setState(
      {
        imageUrl: data.dbRes.file,
        price: data.dbRes.selling_price,
        total: parseInt(data.dbRes.selling_price) + 10,
        username: data.dbRes.userId,
      },
      this.getUserMail,
    )
  }

  getUserMail = async () => {
    const {username} = this.state
    const mailUrl = 'http://localhost:3006/mail-details'
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({username}),
    }
    const response = await fetch(mailUrl, options)
    const data = await response.json()
    console.log(data)
    this.setState({email: data.dbRes.email})
  }

  createOrder = async () => {
    const {total} = this.state
    const orderUrl = 'http://localhost:3006/create-order'
    const response = await fetch(orderUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: total * 100,
        // the amount to be paid, in paisa
        currency: 'INR',
        // the currency in which the payment is to be made
      }),
    })
    const order = await response.json()
    return order
  }

  handlePayment = async () => {
    const {username, email} = this.state
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
        // const updatedObj = {
        //   orderId: response.razorpay_order_id,
        //   paymentId: response.razorpay_payment_id,
        //   signature: response.razorpay_signature,
        // }
        // console.log(response)
        // this.setState({paymentDetails: updatedObj})
        console.log(response)
        const {history} = this.props
        history.replace('/payment-success')
      },
      prefill: {
        name: username,
        email,
        contact: '9999999999',
      },
      theme: {
        color: '#F37254',
      },
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  //   getExtraDetails = async () => {
  //     try {
  //       const {paymentDetails} = this.state
  //       const {paymentId} = paymentDetails

  //       const requestOptions = {
  //         method: 'POST',
  //         headers: {'Content-Type': 'application/json'},
  //         body: JSON.stringify({
  //           url: `https://api.razorpay.com/v1/payments/${paymentId}`,
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: 'Bearer rzp_test_SUCPQkxTXgHfQb',
  //           },
  //         }),
  //       }

  //       const proxyUrl = 'http://localhost:3006/proxy/razorpay'
  //       const response = await fetch(proxyUrl, requestOptions)
  //       console.log(response)
  //       const data = await response.json()
  //       console.log(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  render() {
    const {imageUrl, price, total} = this.state

    return (
      <>
        <Header />
        <div className="payment-container">
          <div className="pay-box">
            <div>
              <img className="payment-book-image" src={imageUrl} alt="book" />
            </div>
            <div className="pay-details">
              <p className="order-txt">Order Summary</p>
              <hr className="pay-line" />
              <div className="payment-content">
                <p className="left-content">Cost</p>
                <p className="right-content">Rs {price}</p>
              </div>
              <div className="payment-content">
                <p className="left-content">Tax</p>
                <p className="right-content">Rs 10</p>
              </div>
              <div className="payment-content">
                <p className="left-content">Total</p>
                <p className="right-content">Rs {total}</p>
              </div>
              <button
                className="payment-btn"
                type="button"
                onClick={this.handlePayment}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Payment
