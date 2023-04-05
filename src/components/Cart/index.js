import {Component} from 'react'
import {AiFillLinkedin, AiFillInstagram} from 'react-icons/ai'

import Cookies from 'js-cookie'
import {Audio} from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import CartItem from '../CartItem'

const statusCheck = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  no_products: 'NO_PRODUCTS',
}

class Cart extends Component {
  state = {cartList: [], status: statusCheck.loading}

  componentDidMount = async () => {
    this.setState({status: statusCheck.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'http://localhost:3006/cart-details'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      if (data.response.length > 0) {
        this.setState({cartList: data.response, status: statusCheck.success})
      } else {
        this.setState({status: statusCheck.failure})
      }
    } else {
      this.setState({status: statusCheck.no_products})
    }
  }

  renderSuccessView = () => {
    const {cartList} = this.state
    return (
      <>
        <div className="own-products-box">
          <h1 className="cart-heading">Shopping Cart</h1>
          <ul className="own-products-list">
            {cartList.map(each => (
              <CartItem item={each} key={each.bookId} />
            ))}
          </ul>
        </div>
      </>
    )
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

  renderLoader = () => (
    <div className="products-loader-container">
      <Audio type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllDetails = () => {
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
        {this.renderAllDetails()}
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

export default Cart
