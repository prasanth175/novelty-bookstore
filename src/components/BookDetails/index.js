import {Component} from 'react'
import {AiFillLinkedin, AiFillInstagram} from 'react-icons/ai'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'

class BookDetails extends Component {
  state = {
    bookDetails: {},
    bidAmount: '',
    mobileNumber: '',
    isSubmitted: false,
  }

  onMobileNumber = event => this.setState({mobileNumber: event.target.value})

  onBidAmount = event => this.setState({bidAmount: event.target.value})

  getBookDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const bookDetailsUrl = `http://localhost:3006/books/${id}`
    const response = await fetch(bookDetailsUrl)
    const data = await response.json()
    const updatedData = {
      author: data.dbRes.author,
      category: data.dbRes.category,
      description: data.dbRes.description,
      isbn: data.dbRes.isbn,
      language: data.dbRes.language,
      printedPrice: data.dbRes.printed_price,
      publicationYear: data.dbRes.publication_year,
      sellingPrice: data.dbRes.selling_price,
      title: data.dbRes.title,
      userId: data.dbRes.userId,
      file: data.dbRes.file,
      bookId: data.dbRes.bookId,
    }
    this.setState({bookDetails: updatedData}, this.getBiddingDetails)
  }

  getBiddingDetails = async () => {
    const {bookDetails} = this.state
    const {bookId} = bookDetails
    const getToken = Cookies.get('jwt_token')

    const url = 'http://localhost:3006/book-bid-details'
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken}`,
      },
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({bookId}),
    }
    const resp = await fetch(url, options)
    const data = await resp.json()
    if (data.response !== undefined) {
      this.setState({bidAmount: data.response.bidAmount, isSubmitted: true})
    }
  }

  componentDidMount = async () => {
    this.getBookDetails()
  }

  editBidForm = () => this.setState({isSubmitted: false})

  submitBidForm = async event => {
    event.preventDefault()
    const getToken = Cookies.get('jwt_token')
    const {bidAmount, mobileNumber, bookDetails} = this.state
    const {bookId, file, description, title} = bookDetails
    const bidDetails = {
      bookId,
      bidAmount,
      mobile: mobileNumber,
      file,
      description,
      title,
    }
    const bidUrl = 'http://localhost:3006/biddetails'
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken}`,
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(bidDetails),
    }

    await fetch(bidUrl, options)
    this.setState({isSubmitted: true})
  }

  renderBidForm = () => {
    const {bidAmount, mobileNumber} = this.state

    return (
      <form className="details-bidding-form" onSubmit={this.submitBidForm}>
        <label className="details-bidding-label" htmlFor="bidAmount">
          Enter Bargain Amount:
        </label>
        <input
          className="details-bidding-input"
          id="bidAmount"
          type="text"
          onChange={this.onBidAmount}
          value={bidAmount}
        />
        <label className="details-bidding-label" htmlFor="mobileNumber">
          Mobile Number:
        </label>
        <input
          className="details-bidding-input"
          id="mobileNumber"
          type="text"
          onChange={this.onMobileNumber}
          value={mobileNumber}
        />

        <div className="sell-btn-container">
          <button type="submit" className="sell-submit-btn">
            Submit
          </button>
          <button type="button" className="sell-clear-btn">
            Clear
          </button>
        </div>
      </form>
    )
  }

  bidSubmissionMsg = () => {
    const {bidAmount} = this.state
    return (
      <div className="submitted-bid-form">
        <h1 className="bid-msg-txt">Amount Submitted by you</h1>
        <h1>{bidAmount}</h1>
        <button
          className="edit-bid-btn"
          type="button"
          onClick={this.editBidForm}
        >
          Edit Bargain Value
        </button>
      </div>
    )
  }

  renderBookDetails = () => {
    const {bookDetails, isSubmitted} = this.state
    const {
      author,
      category,
      description,
      language,
      printedPrice,
      publicationYear,
      sellingPrice,
      title,
      userId,
      file,
    } = bookDetails

    return (
      <div className="book-details-container main-section">
        <img src={file} alt={title} className="book-details-image" />
        <div className="book-details-content">
          <div>
            <h1 className="book-details-heading">{title}</h1>
            <ul className="book-details-list">
              <li className="book-details-item">
                <p className="details-text">
                  Description:
                  <span className="details-value">{description}</span>
                </p>
              </li>
              <li className="book-details-item">
                <p className="details-text">
                  Author: <span className="details-value">{author}</span>
                </p>
              </li>
              <li className="book-details-item">
                <p className="details-text">
                  Publisher: <span className="details-value">NPA</span>
                </p>
              </li>
              <li className="book-details-item">
                <p className="details-text">
                  Publication Year:{' '}
                  <span className="details-value">{publicationYear}</span>
                </p>
              </li>

              <li className="book-details-item">
                <p className="details-text">
                  Language: <span className="details-value">{language}</span>
                </p>
              </li>
              <li className="book-details-item">
                <p className="details-text">
                  Category: <span className="details-value">{category}</span>
                </p>
              </li>
              <li className="book-details-item">
                <p className="details-text">
                  Seller: <span className="details-value">{userId}</span>
                </p>
              </li>
            </ul>
            <h1>
              Rs. {sellingPrice}
              <span className="details-printed-price">{printedPrice}</span>
            </h1>
          </div>

          <div className="details-bidding-container">
            <h1 className="details-bidding-heading">Bargain Price</h1>
            {isSubmitted ? this.bidSubmissionMsg() : this.renderBidForm()}
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="book-details">{this.renderBookDetails()}</div>
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

export default BookDetails
