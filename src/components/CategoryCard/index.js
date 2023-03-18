import {Link} from 'react-router-dom'
import './index.css'

const CategoryCard = props => {
  const {item, getCategoryId} = props
  const {category, imageUrl} = item

  const onCategoryItem = () => {
    getCategoryId(category)
  }

  return (
    <Link to="/books" className="category-link">
      <li className="category-item" onClick={onCategoryItem}>
        <div className="img-container">
          <img className="category-img" src={imageUrl} alt={category} />
        </div>
        <p className="category-txt">{category}</p>
      </li>
    </Link>
  )
}

export default CategoryCard
