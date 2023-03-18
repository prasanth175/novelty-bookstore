// Write your JS code here
import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {activeUsername: '', cartItemCount: 0}

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  getUserName = async () => {
    const getToken = Cookies.get('jwt_token')
    console.log(getToken)
    const detailsUrl = 'http://localhost:3006/details/'
    const options = {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(detailsUrl, options)
    const data = await response.json()
    this.setState({activeUsername: data.name})
  }

  getCartCount = async () => {
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
    console.log(data.response)
    this.setState({cartItemCount: data.response.length})
  }

  componentDidMount = () => {
    this.getUserName()
    this.getCartCount()
  }

  renderProducts = event => {
    const {history} = this.props
    if (event.target.value === 'products') {
      history.replace('products')
    } else if (event.target.value === 'Change Password') {
      history.replace('/change-password')
    }
  }

  render() {
    const {activeUsername, cartItemCount} = this.state

    return (
      <nav className="nav-container">
        <h1 className="website-title-heading">
          <span className="title-pre-heading">The </span>Novelty Bookstore
        </h1>
        <ul className="nav-items-list">
          <Link className="nav-link" to="/">
            <li className="nav-item">Home</li>
          </Link>
          <Link className="nav-link" to="/books">
            <li className="nav-item">Books</li>
          </Link>
          <Link className="nav-link" to="/sell">
            <li className="nav-item">Sell Book</li>
          </Link>
          <Link className="nav-link" to="/">
            <li className="nav-item">About</li>
          </Link>
        </ul>

        <div className="login-register-list">
          <select
            className="user-data"
            value={activeUsername}
            onChange={this.renderProducts}
          >
            <option>Hi, {activeUsername}</option>
            <option value="products">Your Products</option>
            <option value="Change Password">Change Password</option>
            <option>Contact Us</option>
            <option>About</option>
          </select>
          <Link to="/cart" className="nav-link">
            <p className="nav-cart">
              <span className="cart-item-count">{cartItemCount}</span>Cart
            </p>
          </Link>
          <button type="button" className="logout-btn" onClick={this.onLogout}>
            Logout
          </button>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
