import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import BooksCard from '../BooksCard'

class BooksList extends Component {
  state = {searchInput: '', booksList: []}

  componentDidMount = async () => {
    const getToken = Cookies.get('jwt_token')
    console.log(getToken)
    const booksUrl = 'http://localhost:3006/books'
    const options = {
      header: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken}`,
      },
      method: 'GET',
      mode: 'cors',
    }

    const response = await fetch(booksUrl, options)
    const data = await response.json()
    this.setState({booksList: data.dbRes})
    console.log(data.dbRes)
  }

  onSearch = event => this.setState({searchInput: event.target.value})

  renderSearch = () => {
    const {searchInput} = this.state
    return (
      <>
        <h1 className="search-heading">SEARCH THE BOOK YOU WANT</h1>
        <input
          className="books-search-input"
          type="search"
          value={searchInput}
          onChange={this.onSearch}
        />
      </>
    )
  }

  renderEmptyView = () => (
    <div className="books-empty-container">
      <h1 className="books-empty-heading">No Books are available</h1>
    </div>
  )

  renderSuccessView = () => {
    const {booksList} = this.state

    return (
      <div>
        <ul className="books-list">
          {booksList.map(each => (
            <BooksCard item={each} key={each.bookId} />
          ))}
        </ul>
      </div>
    )
  }

  renderAllViews = () => {
    const {booksList} = this.state

    return booksList.length > 0
      ? this.renderSuccessView()
      : this.renderEmptyView()
  }

  render() {
    return (
      <>
        <Header />
        <div>
          <div className="books-header">{this.renderSearch()}</div>
          <div>{this.renderAllViews()}</div>
        </div>
      </>
    )
  }
}

export default BooksList
