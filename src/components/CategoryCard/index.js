import './index.css'

const CategoryCard = props => {
  const {item} = props
  const {category, imageUrl} = item

  return (
    <li className="category-item">
      <div className="img-container">
        <img className="category-img" src={imageUrl} alt={category} />
      </div>
      <p className="category-txt">{category}</p>
    </li>
  )
}

export default CategoryCard
