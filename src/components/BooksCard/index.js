import {Link} from 'react-router-dom'
import './index.css'

const BooksCard = props => {
  const {item} = props
  const {file, title, sellingPrice, bookId} = item

  return (
    <Link className="book-item-link" to={`/books/${bookId}`}>
      <li className="books-item">
        <img className="books-img" src={file} alt={title} />
        <h1 className="books-title">{title}</h1>
        <p className="books-price">{sellingPrice}</p>
      </li>
    </Link>
  )
}

export default BooksCard
