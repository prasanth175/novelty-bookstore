import {Link} from 'react-router-dom'
import {AiFillLinkedin, AiFillInstagram} from 'react-icons/ai'
import Header from '../Header'

const AboutSection = () => (
  <>
    <Header />
    <div id="aboutId" className="about-container main-section">
      <div className="about">
        <img
          className="about-img"
          src="https://img.freepik.com/free-vector/
          people-outside-bookstore-vector_53876-17179.jpg?w=1060&t=st=1678338331~exp=1678338931~hmac=ae2ad43e75acb2a42725c8ce9d87def838ebd154e1493364c9610b7055329f87"
          alt="book-store"
        />
        <div className="about-content">
          <h1 className="about-heading">About Our Bookstore</h1>
          <p className="about-txt">
            Ever wanted to buy a book but could not possible because it was too
            expensive? or Want to sell book? worry not! because Novelty
            Bookstore is here!. The Novelty Bookstore is committed to bring you
            all kinds of best books at the minimal prices ever seen anywhere.
            Yes, we are literally giving you away a steal.
          </p>
        </div>
      </div>
    </div>

    <div>
      <div className="about-us-main-container">
        <div className="about-us-container">
          <div className="about-us-left">
            <h1 className="about-us-heading">About Us</h1>
            <p className="about-us-txt">
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
            <h1 className="about-us-heading">My Account</h1>
            <ul>
              <Link to="/cart" className="about-us-link-item">
                <li className="about-us-link">View Cart</li>
              </Link>
              <Link to="/books" className="about-us-link-item">
                <li className="about-us-link">Categories</li>
              </Link>
              <Link to="/products" className="about-us-link-item">
                <li className="about-us-link">Products</li>
              </Link>
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
export default AboutSection
