import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'

class BookDetails extends Component {
  state = {bookDetails: {}, bidAmount: '', mobileNumber: '', isSubmitted: false}

  onMobileNumber = event => this.setState({mobileNumber: event.target.value})

  onBidAmount = event => this.setState({bidAmount: event.target.value})

  componentDidMount = async () => {
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
    this.setState({bookDetails: updatedData})
  }

  editBidForm = () => this.setState({isSubmitted: false})

  submitBidForm = async event => {
    event.preventDefault()
    const getToken = Cookies.get('jwt_token')
    const {bidAmount, mobileNumber, bookDetails} = this.state
    const {bookId} = bookDetails

    const bidDetails = {
      bookId,
      bidAmount,
      mobile: mobileNumber,
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

    const response = await fetch(bidUrl, options)
    const data = await response.json()
    console.log(data)
    console.log(response)
    this.setState({isSubmitted: true})
  }

  renderBidForm = () => {
    const {bidAmount, mobileNumber} = this.state

    return (
      <form className="details-bidding-form" onSubmit={this.submitBidForm}>
        <label className="details-bidding-label" htmlFor="bidAmount">
          Enter Bid Amount:
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
        <h1>Amount Submitted by you</h1>
        <h1>{bidAmount}</h1>
        <button
          className="edit-bid-btn"
          type="button"
          onClick={this.editBidForm}
        >
          Edit Bid Value
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
      isbn,
      language,
      printedPrice,
      publicationYear,
      sellingPrice,
      title,
      userId,
      file,
      bookId,
    } = bookDetails

    return (
      <div className="book-details-container">
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
            <h1 className="details-bidding-heading">Bidding Price</h1>
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
      </>
    )
  }
}

export default BookDetails
