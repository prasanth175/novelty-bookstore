import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import {BsPersonFill} from 'react-icons/bs'
import {IoIosMail} from 'react-icons/io'
import {HiLockClosed, HiKey} from 'react-icons/hi'
import './index.css'

class RegisterForm extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    isError: false,
    errorMsg: '',
    isSend: false,
    otp: '',
    otpStatus: false,
    otpVerificationStatus: false,
    otpTxt: '',
    emailErrorStatus: false,
    emailErrorMsg: '',
    passwordErrorStatus: false,
    passwordErrorMsg: '',
    confirmPasswordErrorStatus: false,
    confirmPasswordErrorMsg: '',
    validEmail: false,
    validPassword: false,
    validConfirmPassword: false,
    usernameErrorMsg: '',
    usernameErrorStatus: false,
  }

  sendOtp = () => this.setState({isSend: true}, this.generateOTP)

  verifyOtp = () => this.setState({isSend: false}, this.verifyOTP)

  generateOTP = async () => {
    const {email} = this.state
    const otpUrl = 'http://localhost:3006/generate-otp'
    await fetch(otpUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email}),
    })
  }

  verifyOTP = async () => {
    const {email, otp} = this.state
    const verifyData = {email, otp}
    const otpUrl = 'http://localhost:3006/verify-otp'
    try {
      const response = await fetch(otpUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verifyData),
      })
      const data = await response.json()
      if (data.status === 200) {
        this.setState({
          otpVerificationStatus: true,
          otpStatus: true,
          otpTxt: data.message,
        })
      } else {
        this.setState({otpStatus: true, otpTxt: data.message})
      }
    } catch (err) {
      this.setState({otpStatus: true, otpTxt: err})
    }
  }

  onOtp = event => this.setState({otp: event.target.value})

  onInput = event => this.setState({username: event.target.value})

  onMail = event => this.setState({email: event.target.value})

  onPassword = event => this.setState({password: event.target.value})

  onConfirmPassword = event =>
    this.setState({confirmPassword: event.target.value})

  onUserBlur = () => this.setState({usernameErrorStatus: false})

  onEmailBlur = event => {
    if (!event.target.value.includes('@gmail.com')) {
      this.setState({emailErrorMsg: 'Invalid Email', emailErrorStatus: true})
    } else {
      this.setState({
        emailErrorMsg: '',
        emailErrorStatus: false,
        validEmail: true,
        otpVerificationStatus: false,
      })
    }
  }

  onPasswordBlur = event => {
    if (event.target.value.length < 8) {
      this.setState({
        passwordErrorMsg: 'Password must have 8 characters',
        passwordErrorStatus: true,
      })
    } else {
      this.setState({
        passwordErrorMsg: '',
        passwordErrorStatus: false,
        validPassword: true,
      })
    }
  }

  onConfirmPasswordBlur = event => {
    const {password} = this.state
    if (event.target.value !== password) {
      this.setState({
        confirmPasswordErrorMsg: 'Password do not match',
        confirmPasswordErrorStatus: true,
      })
    } else {
      this.setState({
        confirmPasswordErrorMsg: '',
        confirmPasswordErrorStatus: false,
        validConfirmPassword: true,
      })
    }
  }

  performValidations = () => {
    const {
      validConfirmPassword,
      validEmail,
      validPassword,
      otpVerificationStatus,
      password,
      confirmPassword,
      email,
      username,
    } = this.state
    if (
      validConfirmPassword &&
      validEmail &&
      validPassword &&
      otpVerificationStatus
    ) {
      this.getRegisterDetails()
    } else {
      if (password === '') {
        this.setState({
          passwordErrorMsg: 'Required*',
          passwordErrorStatus: true,
        })
      }
      if (confirmPassword === '') {
        this.setState({
          confirmPasswordErrorMsg: 'Required*',
          confirmPasswordErrorStatus: true,
        })
      }
      if (username === '') {
        this.setState({
          usernameErrorMsg: 'Required*',
          usernameErrorStatus: true,
        })
      }
      if (email === '') {
        this.setState({
          emailErrorMsg: 'Required*',
          emailErrorStatus: true,
        })
      }
    }
  }

  submitForm = event => {
    event.preventDefault()
    this.performValidations()
  }

  getRegisterDetails = async () => {
    const {history} = this.props
    const {username, email, password} = this.state
    const registerDetails = {username, email, password}
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
    const {
      username,
      email,
      password,
      confirmPassword,
      isError,
      errorMsg,
      isSend,
      otp,
      otpStatus,
      otpTxt,
      emailErrorMsg,
      emailErrorStatus,
      passwordErrorMsg,
      passwordErrorStatus,
      confirmPasswordErrorMsg,
      confirmPasswordErrorStatus,
      usernameErrorMsg,
      usernameErrorStatus,
    } = this.state

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
              <div className="register-input-item">
                <div className="register-input-field">
                  <BsPersonFill className="register-icon" />
                  <input
                    placeholder="Username"
                    className="register-input"
                    onChange={this.onInput}
                    value={username}
                    onBlur={this.onUserBlur}
                  />
                </div>
                {usernameErrorStatus && (
                  <p className="register-error-msg blur-msg">
                    {usernameErrorMsg}
                  </p>
                )}
              </div>

              <div className="register-input-item">
                <div className="register-input-field">
                  <IoIosMail className="register-icon" />
                  <input
                    placeholder="Email"
                    className="register-input"
                    onChange={this.onMail}
                    value={email}
                    onBlur={this.onEmailBlur}
                  />
                </div>
                {emailErrorStatus && (
                  <p className="register-error-msg blur-msg">{emailErrorMsg}</p>
                )}
              </div>

              <div className="register-input-item">
                <div className="register-input-field">
                  <HiLockClosed className="register-icon" />
                  <input
                    placeholder="Password"
                    className="register-input"
                    type="password"
                    onBlur={this.onPasswordBlur}
                    value={password}
                    onChange={this.onPassword}
                  />
                </div>
                {passwordErrorStatus && (
                  <p className="register-error-msg blur-msg">
                    {passwordErrorMsg}
                  </p>
                )}
              </div>

              <div className="register-input-item">
                <div className="register-input-field">
                  <HiKey className="register-icon" />
                  <input
                    placeholder="Repeat Password"
                    className="register-input"
                    onChange={this.onConfirmPassword}
                    value={confirmPassword}
                    type="password"
                    onBlur={this.onConfirmPasswordBlur}
                  />
                </div>
                {confirmPasswordErrorStatus && (
                  <p className="register-error-msg blur-msg">
                    {confirmPasswordErrorMsg}
                  </p>
                )}
              </div>

              <div className="otp-container">
                <input
                  type="text"
                  className="register-input otp-input"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={this.onOtp}
                />
                {isSend ? (
                  <button
                    className="otp-btn"
                    type="button"
                    onClick={this.verifyOtp}
                  >
                    Verify
                  </button>
                ) : (
                  <button
                    className="otp-btn"
                    type="button"
                    onClick={this.sendOtp}
                  >
                    Send OTP
                  </button>
                )}
              </div>
              {otpStatus && (
                <p className="register-error-msg blur-msg">{otpTxt}</p>
              )}
              <button
                onClick={this.registerSubmitBtn}
                type="submit"
                className="register-btn"
              >
                Register
              </button>
              {isError && <p className="register-error-msg">{errorMsg}</p>}
            </form>
            <p className="already-logged-txt">
              Have already an account?{' '}
              <Link to="/login">
                <span className="log-here-txt">Login here</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterForm
