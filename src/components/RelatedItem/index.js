import {Link} from 'react-router-dom'
import './index.css'

const RelatedItem = props => {
  const {item} = props
  const {title, sellingPrice, file, bookId} = item

  return (
    <Link to={`/books/${bookId}`}>
      <li className="related-item">
        <img src={file} alt={title} className="related-img" />
        <div className="related-content">
          <p>{title}</p>
          <p>{sellingPrice}</p>
        </div>
      </li>
    </Link>
  )
}

export default RelatedItem
