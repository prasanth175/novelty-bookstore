import {Link} from 'react-router-dom'
import {AiFillCheckCircle} from 'react-icons/ai'

import './index.css'

const PaymentSuccess = () => (
  <div className="success-container">
    <div className="success-box">
      <AiFillCheckCircle className="success-img" />
      <h1 className="success-heading">Payment Done</h1>
      <p className="thank-you-txt">
        Thank you for completing your secure online payment
      </p>
      <p className="greeting-txt">Have a great day!</p>
      <Link to="/books">
        <button className="success-btn" type="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  </div>
)

export default PaymentSuccess
