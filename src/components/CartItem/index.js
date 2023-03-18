import './index.css'

const CartItem = props => {
  const {item} = props
  const {user, bookId, bidAmount, mobile, title, description, file} = item

  return (
    <li className="cart-item">
      <h1>Cart</h1>
      <div className="cart-item-details">
        <img className="cart-img" src={file} alt={title} />
        <div className="cart-content">
          <h1>{title}</h1>
          <p>Description: {description}</p>
          <div className="cart-bottom">
            <button className="cart-remove-btn" type="button">
              Remove Product
            </button>
            <p>{bidAmount}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CartItem
