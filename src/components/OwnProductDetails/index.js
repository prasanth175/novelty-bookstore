import {Component} from 'react'
import './index.css'
import Header from '../Header'
import BidList from '../BidList'

class OwnProductDetails extends Component {
  state = {ownBookDetails: {}, bidList: []}

  componentDidMount = async () => {
    this.getOwnBookDetails()
  }

  getOwnBookDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const bookDetailsUrl = `http://localhost:3006/products/${id}`
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
    this.setState({ownBookDetails: updatedData}, this.getBidDetails)
  }

  getBidDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const bidDetails = {
      bookId: id,
    }

    const bidDetailsUrl = 'http://localhost:3006/biddata'
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(bidDetails),
    }

    const bidResponse = await fetch(bidDetailsUrl, options)
    const bidData = await bidResponse.json()
    this.setState({bidList: bidData.dbRes})
  }

  renderOwnBookDetails = () => {
    const {ownBookDetails, bidList} = this.state
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
    } = ownBookDetails

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

          <div className="own-product-buttons">
            <button className="edit-own-product-details-btn" type="button">
              Edit Product Details
            </button>
            <button className="delete-own-product-btn" type="button">
              Delete Product
            </button>
          </div>

          <div className="bidding-list-container">
            <h1 className="bidding-list-heading">Bidding List</h1>
            <table>
              <thead className="bidding-headings">
                <tr className="bidding-head-row">
                  <th className="bidding-top-txt">#</th>
                  <th className="bidding-top-txt">User</th>
                  <th className="bidding-top-txt">Amount</th>
                  <th className="bidding-top-txt">Accept/Decline</th>
                </tr>
              </thead>
              {bidList.length === 0 ? (
                <p className="no-bidding-list-txt">No Records Found</p>
              ) : (
                <tbody className="bidding-values-container">
                  {bidList.map(each => (
                    <BidList item={each} key={each.user} />
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="book-details">{this.renderOwnBookDetails()}</div>
      </>
    )
  }
}

export default OwnProductDetails
