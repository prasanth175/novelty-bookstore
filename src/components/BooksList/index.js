import {Component} from 'react'
import {AiFillLinkedin, AiFillInstagram} from 'react-icons/ai'
import {Audio} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import BooksCard from '../BooksCard'
import CategoryCard from '../CategoryCard'
import CategoryDropDown from '../CategoryDropDown'

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

const statusCheck = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  no_products: 'NO_PRODUCTS',
}

class BooksList extends Component {
  state = {
    searchInput: '',
    booksList: [],
    categoryId: '',
    status: statusCheck.loading,
  }

  clearFilters = () =>
    this.setState({searchInput: '', categoryId: ''}, this.getBooksDetails)

  onSearch = event =>
    this.setState({searchInput: event.target.value}, this.getBooksDetails)

  getBooksDetails = async () => {
    this.setState({status: statusCheck.loading})
    const {searchInput, categoryId} = this.state
    const getToken = Cookies.get('jwt_token')
    const booksUrl = `http://localhost:3006/books/?search_by=${searchInput}&category=${categoryId}`
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken}`,
      },
      method: 'GET',
      mode: 'cors',
    }
    const response = await fetch(booksUrl, options)
    const data = await response.json()
    if (data.dbRes.length > 0) {
      this.setState({booksList: data.dbRes, status: statusCheck.success})
    } else {
      this.setState({status: statusCheck.failure})
    }
  }

  onOptionItem = event => {
    this.getCategoryId(event.target.value)
  }

  getCategoryId = id => this.setState({categoryId: id}, this.getBooksDetails)

  componentDidMount = () => {
    this.getBooksDetails()
  }

  renderSearch = () => {
    const {searchInput} = this.state
    return (
      <>
        <h1 className="search-heading">SEARCH THE BOOK YOU WANT</h1>
        <div className="search-bar">
          <input
            className="books-search-input"
            type="search"
            value={searchInput}
            onChange={this.onSearch}
            placeholder="Search here..."
          />
          <button
            onClick={this.clearFilters}
            className="clear-filters-btn"
            type="button"
          >
            Clear Filters
          </button>
        </div>
      </>
    )
  }

  renderEmptyView = () => (
    <div className="books-empty-container">
      <img
        src="https://cdn.dribbble.com/users/721524/screenshots/4117132/untitled-1-_1_.png"
        alt="not found"
        className="not-found-books"
      />
      <h1 className="empty-product-heading">No Product Available</h1>
    </div>
  )

  renderLoader = () => (
    <div className="products-loader-container">
      <Audio type="ThreeDots" color="#0b69ff" height="50" width="50" />
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
    const {status} = this.state

    switch (status) {
      case statusCheck.success:
        return this.renderSuccessView()
      case statusCheck.failure:
        return this.renderEmptyView()
      default:
        return this.renderLoader()
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="main-section">
          <div className="books-header">{this.renderSearch()}</div>
          <div className="books-categories-container">
            <div className="category-section">
              <h1 className="books-category-heading">Categories: </h1>
              <ul className="all-books-category">
                {categoriesList.map(each => (
                  <CategoryCard
                    item={each}
                    getCategoryId={this.getCategoryId}
                    key={each.category}
                  />
                ))}
              </ul>
            </div>

            <select className="category-drop-down" onChange={this.onOptionItem}>
              {categoriesList.map(each => (
                <CategoryDropDown
                  item={each}
                  getCategoryId={this.getCategoryId}
                  key={each.category}
                />
              ))}
            </select>
            <div className="all-products-section">{this.renderAllViews()}</div>
          </div>
        </div>
        <div>
          <div className="about-us-main-container">
            <div className="about-us-container">
              <div className="about-us-left">
                <h1>About Us</h1>
                <p>
                  Ever wanted to buy a book but could not because it was too
                  expensive? worry not! because Novelty Bookstore is here! The
                  Novelty Bookstore.
                </p>
                <div className="about-us-icons-container">
                  <AiFillLinkedin className="about-us-icon" />
                  <AiFillInstagram className="about-us-icon" />
                </div>
              </div>
              <div className="about-us-right">
                <h1>My Account</h1>
                <ul>
                  <li className="about-us-link">View Cart</li>
                  <li className="about-us-link">Categories</li>
                  <li className="about-us-link">Products</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer">
            <p className="footer-txt">
              © 2023 All Rights Reserved By Novelty Bookstore
            </p>
          </div>
        </div>
      </>
    )
  }
}

export default BooksList
