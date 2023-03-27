import {Link} from 'react-router-dom'
import './index.css'

const CartItem = props => {
  const {item} = props
  const {user, bookId, bidAmount, mobile, title, description, file} = item

  const removeCartItem = async () => {
    const url = `http://localhost:3006/cart-details/${bookId}`
    const options = {
      method: 'DELETE',
    }
    const response = await fetch(url, options)
    const data = await response.json()
  }

  return (
    <li className="cart-item">
      <h1>Cart</h1>
      <div className="cart-item-details">
        <img className="cart-img" src={file} alt={title} />
        <div className="cart-content">
          <h1>{title}</h1>
          <p>Description: {description}</p>
          <div className="cart-bottom">
            <button
              onClick={removeCartItem}
              className="cart-remove-btn"
              type="button"
            >
              Remove Product
            </button>
            <Link to={`/payments/${bookId}`}>
              <button className="pay-btn" type="button">
                Pay
              </button>
            </Link>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CartItem
