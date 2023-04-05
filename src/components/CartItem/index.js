import {Link} from 'react-router-dom'
import './index.css'

const CartItem = props => {
  const {item} = props
  const {bookId, title, description, file} = item

  const removeCartItem = async () => {
    const url = `http://localhost:3006/cart-details/${bookId}`
    const options = {
      method: 'DELETE',
    }
    await fetch(url, options)
  }

  return (
    <li className="own-book-list-item">
      <div className="own-book-item">
        <img className="own-book-image" src={file} alt={title} />
        <div className="own-book-content">
          <h1 className="own-product-title">{title}</h1>
          <p className="own-product-desc">Description: {description}</p>
          <div className="view-btn-price">
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
