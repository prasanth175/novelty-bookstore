import {Link} from 'react-router-dom'
import './index.css'

const OwnProductCard = props => {
  const {item} = props
  const {
    author,
    category,
    description,
    isbn,
    language,
    printedPrice,
    publicationYear,
    sellingPrice,
    title,
    userId,
    bookId,
    file,
  } = item

  console.log('own product card-----------------')
  console.log(file)

  return (
    <li className="own-book-item">
      <img className="own-book-image" src={file} alt="own-book" />
      <div className="own-book-content">
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="view-btn-price">
          <Link to={`/products/${bookId}`}>
            <button type="button" className="view-btn">
              View Product
            </button>
          </Link>
          <p>{sellingPrice}</p>
        </div>
      </div>
    </li>
  )
}

export default OwnProductCard
