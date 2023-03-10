import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import OwnProductCard from '../OwnProductCard'

class OwnProducts extends Component {
  state = {booksList: []}

  componentDidMount = async () => {
    const getToken = Cookies.get('jwt_token')
    const bookUrl = 'http://localhost:3006/products'
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken}`,
      },
      method: 'GET',
    }
    console.log('entered')

    const response = await fetch(bookUrl, options)
    const data = await response.json()
    console.log('-------own products=---------------')
    console.log(data.dbResponse)
    const updatedList = data.dbResponse.map(each => ({
      author: each.author,
      category: each.category,
      description: each.description,
      isbn: each.isbn,
      language: each.language,
      printedPrice: each.printed_price,
      publicationYear: each.publication_year,
      sellingPrice: each.selling_price,
      title: each.title,
      userId: each.userId,
      file: each.file,
      bookId: each.bookId,
    }))
    this.setState({booksList: updatedList})
  }

  renderEmptyBooks = () => (
    <div className="empty-container">
      <h1 className="empty-heading">Your products are Empty</h1>
    </div>
  )

  renderBooks = li => (
    <div>
      <h1 className="own-products-heading">Your Products</h1>
      <ul className="own-products-list">
        {li.map(each => (
          <OwnProductCard item={each} key={uuidv4()} />
        ))}
      </ul>
    </div>
  )

  renderAllBooks = () => {
    const {booksList} = this.state
    return booksList.length > 0
      ? this.renderBooks(booksList)
      : this.renderEmptyBooks()
  }

  render() {
    console.log('ownProducts')
    return (
      <>
        <Header />
        <div className="own-products-container">{this.renderAllBooks()}</div>
      </>
    )
  }
}

export default OwnProducts
