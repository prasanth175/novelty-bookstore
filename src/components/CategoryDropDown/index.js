import './index.css'

const CategoryDropDown = props => {
  const {item} = props
  const {category} = item
  return (
    <option className="option-item" value={category}>
      {category}
    </option>
  )
}

export default CategoryDropDown
