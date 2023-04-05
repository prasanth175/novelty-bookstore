import './index.css'
import CategoryCard from '../CategoryCard'

const categoriesList = [
  {
    category: 'Competitive',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/8596/8596416.png',
  },
  {
    category: 'Engineering',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/4368/4368389.png',
  },
  {
    category: 'Medical',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/809/809957.png',
  },
  {
    category: 'Pharmacy',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/3140/3140342.png',
  },
  {
    category: 'Science',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/3081/3081476.png',
  },
  {
    category: 'Other',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/2436/2436702.png',
  },
]

const Category = () => (
  <div id="categoryId" className="category-container">
    <h1 className="category-heading">Books Categories</h1>
    <ul className="category-list">
      {categoriesList.map(each => (
        <CategoryCard item={each} key={each.category} />
      ))}
    </ul>
  </div>
)

export default Category
