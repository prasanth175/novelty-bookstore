import {Component} from 'react'
import {AiFillLinkedin, AiFillInstagram} from 'react-icons/ai'

import './index.css'
import Header from '../Header'

const categoryList = [
  {
    optionId: 'Competitive',
    displayTxt: 'Competitive',
  },
  {
    optionId: 'Engineering',
    displayTxt: 'Engineering',
  },
  {
    optionId: 'Medical',
    displayTxt: 'Medical',
  },
  {
    optionId: 'Pharmacy',
    displayTxt: 'Pharmacy',
  },
  {
    optionId: 'Science',
    displayTxt: 'Science',
  },
  {
    optionId: 'Other',
    displayTxt: 'Other',
  },
]

const languagesList = [
  {
    languageId: 'English',
    languageTxt: 'English',
  },
  {
    languageId: 'Telugu',
    languageTxt: 'Telugu',
  },
  {
    languageId: 'Hindi',
    languageTxt: 'Hindi',
  },
  {
    languageId: 'Other',
    languageTxt: 'Other',
  },
]

class SellBookUpdation extends Component {
  state = {
    categoryActiveId: categoryList[0].optionId,
    languageActiveId: languagesList[0].languageId,
    title: '',
    author: '',
    description: '',
    publication: '',
    isbn: '',
    printedPrice: '',
    sellingPrice: '',
    file: null,
    fieldsErrorStatus: false,
    fieldsErrorTxt: '',
    showMsgStatus: false,
    showMsgTxt: '',
    isSuccess: false,
    bookId: '',
  }

  onCategory = event => {
    this.setState({categoryActiveId: event.target.value})
  }

  onTitle = event => this.setState({title: event.target.value})

  onAuthor = event => this.setState({author: event.target.value})

  onDescription = event => this.setState({description: event.target.value})

  onPublication = event => this.setState({publication: event.target.value})

  onLanguage = event => this.setState({languageActiveId: event.target.value})

  onIsbn = event => this.setState({isbn: event.target.value})

  onPrintedPrice = event => this.setState({printedPrice: event.target.value})

  onSellingPrice = event => this.setState({sellingPrice: event.target.value})

  onFile = event => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
      this.setState({file: reader.result})
    }

    reader.readAsDataURL(file)
  }

  componentDidMount = () => {
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
    this.setState({
      categoryActiveId: updatedData.category,
      languageActiveId: updatedData.language,
      title: updatedData.title,
      author: updatedData.author,
      description: updatedData.description,
      publication: updatedData.publicationYear,
      isbn: updatedData.isbn,
      printedPrice: updatedData.printedPrice,
      sellingPrice: updatedData.sellingPrice,
      file: data.dbRes.file,
      user: updatedData.userId,
      bookId: updatedData.bookId,
    })
  }

  submitSellForm = event => {
    event.preventDefault()
    const {
      title,
      author,
      description,
      publication,
      isbn,
      printedPrice,
      sellingPrice,
      file,
    } = this.state
    if (
      title === '' ||
      author === '' ||
      description === '' ||
      publication === '' ||
      isbn === '' ||
      printedPrice === '' ||
      sellingPrice === '' ||
      file === ''
    ) {
      this.setState({
        fieldsErrorStatus: true,
        fieldsErrorTxt: 'All fields are Required*',
      })
    } else {
      this.setState({fieldsErrorStatus: false}, this.updateSellBookDetails)
    }
  }

  updateSellBookDetails = async () => {
    const {
      categoryActiveId,
      languageActiveId,
      title,
      author,
      description,
      publication,
      isbn,
      printedPrice,
      sellingPrice,
      file,
      user,
      bookId,
    } = this.state
    const sellDetails = {
      category: categoryActiveId,
      language: languageActiveId,
      title,
      author,
      description,
      publication_year: publication,
      isbn,
      printed_price: printedPrice,
      selling_price: sellingPrice,
      file,
      bookId,
      userId: user,
    }
    const sellUrl = 'http://localhost:3006/update-sell/'
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(sellDetails),
    }
    const response = await fetch(sellUrl, options)
    const data = await response.json()
    if (data.status === 200) {
      this.setState({
        showMsgStatus: true,
        showMsgTxt: data.message,
        isSuccess: true,
      })
    } else {
      this.setState({
        showMsgStatus: true,
        showMsgTxt: data.message,
        isSuccess: false,
      })
    }
  }

  render() {
    const {
      categoryActiveId,
      languageActiveId,
      title,
      author,
      description,
      publication,
      isbn,
      printedPrice,
      sellingPrice,
      fieldsErrorStatus,
      fieldsErrorTxt,
      showMsgStatus,
      showMsgTxt,
      isSuccess,
    } = this.state

    return (
      <>
        <Header />
        <div className="sell-book-container main-section">
          <div className="sell-book-inner-container">
            <h1 className="add-book-heading">Add a Book</h1>
            <form className="sell-book-form" onSubmit={this.submitSellForm}>
              <label htmlFor="categoryId" className="sell-label">
                Category: <span className="sell-star-txt">*</span>
              </label>
              <select
                value={categoryActiveId}
                id="categoryId"
                className="sell-input"
                onChange={this.onCategory}
              >
                {categoryList.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayTxt}
                  </option>
                ))}
              </select>
              <label htmlFor="titleInput" className="sell-label">
                Title: <span className="sell-star-txt">*</span>
              </label>
              <input
                value={title}
                type="text"
                id="authorInput"
                className="sell-input"
                onChange={this.onTitle}
              />
              <label htmlFor="titleInput" className="sell-label">
                Author: <span className="sell-star-txt">*</span>
              </label>
              <input
                value={author}
                type="text"
                id="authorInput"
                className="sell-input"
                onChange={this.onAuthor}
              />
              <label htmlFor="descInput" className="sell-label">
                Description: <span className="sell-star-txt">*</span>
              </label>
              <textarea
                value={description}
                type="text"
                id="descInput"
                className="sell-input"
                onChange={this.onDescription}
              />
              <label
                htmlFor="publicationInput"
                className="sell-label"
                cols="100"
              >
                Publication year: <span className="sell-star-txt">*</span>
              </label>
              <input
                value={publication}
                type="text"
                id="publicationInput"
                className="sell-input"
                onChange={this.onPublication}
              />
              <label htmlFor="languageId" className="sell-label">
                Language: <span className="sell-star-txt">*</span>
              </label>
              <select
                value={languageActiveId}
                id="languageId"
                className="sell-input"
                onChange={this.onLanguage}
              >
                {languagesList.map(each => (
                  <option key={each.languageId} value={each.languageId}>
                    {each.languageTxt}
                  </option>
                ))}
              </select>
              <label htmlFor="isbnInput" className="sell-label">
                ISBN: <span className="sell-star-txt">*</span>
              </label>
              <input
                value={isbn}
                type="text"
                id="isbnInput"
                className="sell-input"
                onChange={this.onIsbn}
              />
              <label htmlFor="printedInput" className="sell-label">
                Printed price: <span className="sell-star-txt">*</span>
              </label>
              <input
                value={printedPrice}
                type="text"
                id="printedInput"
                className="sell-input"
                onChange={this.onPrintedPrice}
              />
              <label htmlFor="sellingInput" className="sell-label">
                Selling price: <span className="sell-star-txt">*</span>
              </label>
              <input
                value={sellingPrice}
                type="text"
                id="sellingInput"
                className="sell-input"
                onChange={this.onSellingPrice}
              />

              <label htmlFor="fileInput" className="sell-label">
                Product Image
              </label>
              <input id="fileInput" type="file" onChange={this.onFile} />
              <div className="sell-btn-container">
                <button type="submit" className="sell-submit-btn">
                  Update
                </button>
                <button type="button" className="sell-clear-btn">
                  Clear
                </button>
              </div>
              {fieldsErrorStatus && (
                <p className="sell-error-txt">{fieldsErrorTxt}</p>
              )}
              {showMsgStatus && (
                <div className={isSuccess ? 'success-txt' : 'failure-txt'}>
                  <p className="msg-txt">{showMsgTxt}</p>
                </div>
              )}
            </form>
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

export default SellBookUpdation
