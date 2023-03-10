import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import {BsPersonFill, BsFillTelephoneFill} from 'react-icons/bs'
import {IoIosMail} from 'react-icons/io'
import {HiLockClosed, HiKey} from 'react-icons/hi'
import './index.css'

class RegisterForm extends Component {
  state = {
    username: '',
    email: '',
    mobile: '',
    password: '',
    isError: false,
    errorMsg: '',
  }

  onInput = event => this.setState({username: event.target.value})

  onMail = event => this.setState({email: event.target.value})

  onMobile = event => this.setState({mobile: event.target.value})

  onPassword = event => this.setState({password: event.target.value})

  submitForm = event => {
    event.preventDefault()
    this.getRegisterDetails()
  }

  getRegisterDetails = async () => {
    const {history} = this.props
    const {username, email, mobile, password} = this.state
    const registerDetails = {username, email, mobile, password}
    const url = 'http://localhost:3006/register/'
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(registerDetails),
    }
    const response = await fetch(url, options)

    const data = await response.json()
    console.log(data.error_txt)
    if (data.status_code === 200) {
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_txt, isError: true})
    }
  }

  render() {
    const getToken = Cookies.get('jwt_token')
    if (getToken !== undefined) {
      return <Redirect to="/login" />
    }
    const {username, email, mobile, password, isError, errorMsg} = this.state
    return (
      <div className="register">
        <div className="register-container">
          <h1 className="register-top-heading">Register With Us</h1>
          <img
            className="register-image"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
            alt="register-img"
          />
          <div className="register-form-field">
            <h1 className="register-heading">Register With Us</h1>
            <form className="register-form" onSubmit={this.submitForm}>
              <div className="register-input-field">
                <BsPersonFill className="register-icon" />
                <input
                  placeholder="Username"
                  className="register-input"
                  onChange={this.onInput}
                  value={username}
                />
              </div>

              <div className="register-input-field">
                <IoIosMail className="register-icon" />
                <input
                  placeholder="Email"
                  className="register-input"
                  onChange={this.onMail}
                  value={email}
                />
              </div>

              <div className="register-input-field">
                <BsFillTelephoneFill className="register-icon" />
                <input
                  placeholder="Mobile Number"
                  className="register-input"
                  onChange={this.onMobile}
                  value={mobile}
                />
              </div>

              <div className="register-input-field">
                <HiLockClosed className="register-icon" />
                <input placeholder="Password" className="register-input" />
              </div>

              <div className="register-input-field">
                <HiKey className="register-icon" />
                <input
                  placeholder="Repeat Password"
                  className="register-input"
                  onChange={this.onPassword}
                  value={password}
                />
              </div>

              <button
                onClick={this.registerSubmitBtn}
                type="submit"
                className="register-btn"
              >
                Register
              </button>
              {isError && <p className="register-error-msg">{errorMsg}</p>}
            </form>
            <p>
              Have already an account?{' '}
              <Link to="/login">
                <span>Login here</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterForm
