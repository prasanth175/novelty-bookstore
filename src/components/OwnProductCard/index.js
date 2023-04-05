import {Link} from 'react-router-dom'
import './index.css'

const OwnProductCard = props => {
  const {item} = props
  const {description, sellingPrice, title, bookId, file} = item
  return (
    <li className="own-book-list-item">
      <div className="own-book-item">
        <img className="own-book-image" src={file} alt="own-book" />
        <div className="own-book-content">
          <h1 className="own-product-title">{title}</h1>
          <p className="own-product-desc">{description}</p>
          <div className="view-btn-price">
            <Link to={`/products/${bookId}`}>
              <button type="button" className="view-btn">
                View Product
              </button>
            </Link>
            <p className="own-product-selling-price">{sellingPrice}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default OwnProductCard
