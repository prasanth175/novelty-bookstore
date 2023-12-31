import {Component} from 'react'
import Cookies from 'js-cookie'
import {v4 as uuidv4} from 'uuid'
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

class SellBook extends Component {
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
    image: null,
    fieldsErrorStatus: false,
    fieldsErrorTxt: '',
    showMsgStatus: false,
    showMsgTxt: '',
    isSuccess: false,
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

  //   onFile = event => {
  //     const file = event.target.files[0]
  //     const reader = new FileReader()
  //     reader.onload = () => {
  //       this.setState({file: reader.result})
  //     }
  //     reader.readAsDataURL(file)
  //   }

  onFile = e => {
    this.setState({image: e.target.files[0]})
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
      image,
    } = this.state
    if (
      title === '' ||
      author === '' ||
      description === '' ||
      publication === '' ||
      isbn === '' ||
      printedPrice === '' ||
      sellingPrice === '' ||
      image === ''
    ) {
      this.setState({
        fieldsErrorStatus: true,
        fieldsErrorTxt: 'All fields are Required*',
      })
    } else {
      this.setState({fieldsErrorStatus: false}, this.sendSellBookDetails)
    }
    // this.setState({fieldsErrorStatus: false}, this.sendSellBookDetails)
  }

  sendSellBookDetails = async () => {
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
      image,
    } = this.state
    const formData = new FormData()
    formData.append('image', image)
    console.log(image)
    console.log(formData)
    const bookId = uuidv4()
    const getToken = Cookies.get('jwt_token')
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
      image,
      bookId,
    }
    formData.append('sellDetails', JSON.stringify(sellDetails))
    const sellUrl = 'http://localhost:3006/sell/'
    const options = {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getToken}`,
      },
      method: 'POST',
      mode: 'cors',
      body: formData,
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
                  Submit
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

export default SellBook
