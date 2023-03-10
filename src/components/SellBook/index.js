import {Component} from 'react'
import Cookies from 'js-cookie'
import {v4 as uuidv4} from 'uuid'
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
    languageId: uuidv4(),
    languageTxt: 'English',
  },
  {
    languageId: uuidv4(),
    languageTxt: 'Telugu',
  },
  {
    languageId: uuidv4(),
    languageTxt: 'Hindi',
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
    file: null,
  }

  onCategory = event => {
    console.log(event.target.value.textContent)
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

  submitSellForm = event => {
    event.preventDefault()
    this.sendSellBookDetails()
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
      file,
    } = this.state

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
      file,
    }
    const sellUrl = 'http://localhost:3006/sell/'
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken}`,
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(sellDetails),
    }
    const response = await fetch(sellUrl, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
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
      file,
    } = this.state

    return (
      <>
        <Header />
        <div className="sell-book-container">
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

              <label htmlFor="fileInput">Product Image</label>
              <input id="fileInput" type="file" onChange={this.onFile} />
              <div className="sell-btn-container">
                <button type="submit" className="sell-submit-btn">
                  Submit
                </button>
                <button type="button" className="sell-clear-btn">
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default SellBook
