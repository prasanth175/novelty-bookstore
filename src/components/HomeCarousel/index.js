import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const HomeCarousel = () => {
  const settings = {
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    infinite: true,
    autoplay: true,
  }

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div className="carousel-item">
          <div className="carousel-content">
            <p className="web-title">The Novelty Bookstore</p>
            <h1 className="carousel-heading">
              Remember, <br /> A Book Is Always A Gift.
            </h1>
            <p className="poet"> - Sheridan Hay</p>
            <button className="read-more-btn" type="button">
              Read More
            </button>
          </div>
          <img
            className="carousel-img"
            src="https://o.remove.bg/downloads/4be523f1-e782-4d16-ad6e-07d33d7f32db/OIP-removebg-preview.png"
          />
        </div>
        <div className="carousel-item">
          <div className="carousel-content">
            <p className="web-title">The Novelty Bookstore</p>
            <h1 className="carousel-heading">
              Remember, <br /> A Book Is Always A Gift.
            </h1>
            <p className="poet">- Sheridan Hay</p>
            <button className="read-more-btn" type="button">
              Read More
            </button>
          </div>
          <img
            className="carousel-img"
            src="https://o.remove.bg/downloads/4be523f1-e782-4d16-ad6e-07d33d7f32db/OIP-removebg-preview.png"
            alt="home-img"
          />
        </div>
      </Slider>
    </div>
  )
}

export default HomeCarousel
