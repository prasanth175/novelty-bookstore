// Write your JS code here
import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {FiMenu} from 'react-icons/fi'
import {MdCancel} from 'react-icons/md'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {
    activeUsername: '',
    cartItemCount: 0,
    isOpen: 'custom-dropdown close-drop',
  }

  openDrop = () => this.setState({isOpen: 'custom-dropdown'})

  closeDrop = () => this.setState({isOpen: 'custom-dropdown close-drop'})

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  getUserName = async () => {
    const getToken = Cookies.get('jwt_token')
    const detailsUrl = 'http://localhost:3006/details/'
    const options = {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(detailsUrl, options)
    const data = await response.json()
    this.setState({activeUsername: data.name}, this.getCartCount)
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
    this.setState({cartItemCount: data.response.length})
  }

  componentDidMount = () => {
    this.getUserName()
  }

  renderProducts = event => {
    const {history} = this.props
    if (event.target.value === 'products') {
      history.replace('products')
    } else if (event.target.value === 'Change Password') {
      history.replace('/change-password')
    } else if (event.target.value === 'About') {
      history.replace('/about')
    }
  }

  handleClick = url => {
    const {history} = this.props
    history.replace(url)
  }

  render() {
    const {activeUsername, cartItemCount, isOpen} = this.state

    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="nav-container"
      >
        <Navbar.Brand href="#home" className="website-title-heading">
          <span className="title-pre-heading">The </span>Novelty Bookstore
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="nav-items-list">
          <div className="nav-items-list nav-toggle-items">
            <Nav.Link
              onClick={() => this.handleClick('/')}
              className="nav-link"
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => this.handleClick('/books')}
              className="nav-link"
            >
              Books
            </Nav.Link>
            <Nav.Link
              onClick={() => this.handleClick('/sell')}
              className="nav-link"
            >
              Sell Book
            </Nav.Link>
            <Nav.Link
              onClick={() => this.handleClick('/about')}
              className="nav-link"
            >
              About
            </Nav.Link>
            <Nav.Link className="nav-link">
              <select
                className="user-data"
                value={activeUsername}
                onChange={this.renderProducts}
              >
                <option>Hi, {activeUsername}</option>
                <option value="products">Your Products</option>
                <option value="Change Password">Change Password</option>
                <option>About</option>
              </select>
            </Nav.Link>
          </div>
          <NavDropdown
            className="drop-down-menu"
            title={
              <button type="button" onClick={this.openDrop}>
                <FiMenu className="menu-btn" />
              </button>
            }
            id="collasible-nav-dropdown"
          >
            <div className={isOpen}>
              <NavDropdown.Item className="drop-cancel-btn">
                <button
                  type="button"
                  className="drop-cancel-btn"
                  onClick={this.closeDrop}
                >
                  <MdCancel className="drop-cancel-icon" />
                </button>
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => this.handleClick('/')}
                className="nav-drop-item"
              >
                Home
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => this.handleClick('/books')}
                className="nav-drop-item"
              >
                Books
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => this.handleClick('/sell')}
                className="nav-drop-item"
              >
                Sell Book
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => this.handleClick('/about')}
                className="nav-drop-item"
              >
                About
              </NavDropdown.Item>
              <NavDropdown.Item>
                <select
                  className="user-data"
                  value={activeUsername}
                  onChange={this.renderProducts}
                >
                  <option>Hi, {activeUsername}</option>
                  <option value="products">Your Products</option>
                  <option value="Change Password">Change Password</option>
                  <option>About</option>
                </select>
              </NavDropdown.Item>

              <NavDropdown.Item onClick={() => this.handleClick('/cart')}>
                <p className="nav-cart">
                  <span className="cart-item-count">{cartItemCount}</span>
                  Cart
                </p>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <button
                  type="button"
                  className="logout-btn"
                  onClick={this.onLogout}
                >
                  Logout
                </button>
              </NavDropdown.Item>
            </div>
          </NavDropdown>

          <Nav className="login-register-list nav-toggle-items">
            <Nav.Link
              className="cart-nav"
              onClick={() => this.handleClick('/cart')}
            >
              <p className="nav-cart">
                <span className="cart-item-count">{cartItemCount}</span>Cart
              </p>
            </Nav.Link>
            <Nav.Link href="">
              <button
                type="button"
                className="logout-btn"
                onClick={this.onLogout}
              >
                Logout
              </button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default withRouter(Header)
