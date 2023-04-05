import {Component} from 'react'
import {AiFillLinkedin, AiFillInstagram} from 'react-icons/ai'

import {v4 as uuidv4} from 'uuid'
import {Audio} from 'react-loader-spinner'

import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import OwnProductCard from '../OwnProductCard'

const statusCheck = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  no_products: 'NO_PRODUCTS',
}

class OwnProducts extends Component {
  state = {booksList: [], status: statusCheck.loading}

  componentDidMount = async () => {
    this.setState({status: statusCheck.loading})
    const getToken = Cookies.get('jwt_token')
    const bookUrl = 'http://localhost:3006/products'
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(bookUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      if (data.dbResponse.length > 0) {
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
        this.setState({booksList: updatedList, status: statusCheck.success})
      } else {
        this.setState({status: statusCheck.failure})
      }
    } else {
      this.setState({status: statusCheck.no_products})
    }
  }

  renderEmptyView = () => (
    <div className="books-empty-container">
      <img
        src="https://cdn.dribbble.com/users/721524/screenshots/4117132/untitled-1-_1_.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="empty-product-heading">No Product Available</h1>
    </div>
  )

  renderBooks = () => {
    const {booksList} = this.state
    return (
      <div className="own-products-box">
        <h1 className="own-products-heading">Your Products</h1>
        <ul className="own-products-list">
          {booksList.map(each => (
            <OwnProductCard item={each} key={uuidv4()} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Audio type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllBooks = () => {
    const {status} = this.state
    switch (status) {
      case statusCheck.success:
        return this.renderBooks()
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
        <div className="own-products-container main-section">
          {this.renderAllBooks()}
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

export default OwnProducts
