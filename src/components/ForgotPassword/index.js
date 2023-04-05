import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class ForgotPassword extends Component {
  state = {
    emailSent: false,
    email: '',
    otp: '',
    otpTxt: '',
    otpStatus: false,
    otpSubmitted: false,
    password: '',
    confirmPassword: '',
    mailErrorStatus: true,
    mailErrorTxt: '',
    showEmailError: false,
    passwordErrorTxt: '',
    passwordErrorStatus: false,
    confirmPasswordErrorStatus: false,
    confirmPasswordErrorTxt: '',
    errorTxt: '',
    errorStatus: false,
    showRegister: false,
  }

  onEmail = event => this.setState({email: event.target.value})

  onOtp = event => this.setState({otp: event.target.value})

  sendOtp = () => {
    this.validationForMail()
  }

  verifyOtp = () => this.setState({emailSent: true}, this.verifyOTP)

  renderBack = () => this.setState({emailSent: false})

  validationForMail = () => {
    const {email, mailErrorStatus} = this.state
    if (email === '' && mailErrorStatus) {
      this.setState({
        mailErrorStatus: true,
        mailErrorTxt: 'Required*',
        showEmailError: true,
      })
    } else if (mailErrorStatus) {
      this.setState({showEmailError: true})
    } else {
      this.setState({emailSent: true, showEmailError: false}, this.generateOTP)
    }
  }

  onMailBlur = event => {
    if (!event.target.value.includes('@gmail.com')) {
      this.setState({
        mailErrorStatus: true,
        mailErrorTxt: 'Invalid Mail',
        showEmailError: true,
      })
    } else {
      this.setState({
        mailErrorStatus: false,
        mailErrorTxt: '',
        showEmailError: false,
      })
    }
  }

  onPasswordBlur = event => {
    if (event.target.value.length < 8) {
      this.setState({
        passwordErrorTxt: 'Must contain 8 characters',
        passwordErrorStatus: true,
      })
    } else {
      this.setState({passwordErrorStatus: false, passwordErrorTxt: ''})
    }
  }

  onConfirmPasswordBlur = event => {
    if (event.target.value.length < 8) {
      this.setState({
        confirmPasswordErrorTxt: 'Must contain 8 characters',
        confirmPasswordErrorStatus: true,
      })
    } else {
      this.setState({
        confirmPasswordErrorStatus: false,
        confirmPasswordErrorTxt: '',
      })
    }
  }

  onSetPassword = async () => {
    const {password, email} = this.state
    const passwordDetails = {password, email}
    const setPasswordUrl = 'http://localhost:3006/set-password'
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(passwordDetails),
    }
    const res = await fetch(setPasswordUrl, options)
    const data = await res.json()
    if (data.status === 200) {
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({
        errorTxt: data.message,
        errorStatus: true,
        showRegister: true,
      })
    }
  }

  generateOTP = async () => {
    const {email} = this.state
    const otpUrl = 'http://localhost:3006/generate-otp'
    try {
      await fetch(otpUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      })
    } catch (error) {
      console.error(error)
    }
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
        this.setState({otpSubmitted: true})
      } else {
        this.setState({otpStatus: true, otpTxt: data.message})
      }
    } catch (err) {
      this.setState({otpStatus: true, otpTxt: err})
    }
  }

  renderOtp = () => {
    const {otp, otpTxt, otpStatus} = this.state
    return (
      <>
        <h1 className="forgot-otp-sent-txt">We sent your code</h1>
        <p className="forgot-otp">Enter the confirmation code below</p>
        <input
          placeholder="Enter OTP"
          id="emailId"
          className="forgot-input"
          value={otp}
          onChange={this.onOtp}
        />
        {otpStatus && <p className="otp-result">{otpTxt}</p>}
        <div className="forgot-otp-btns">
          <button
            className="forgot-otp-back"
            type="button"
            onClick={this.renderBack}
          >
            Go back
          </button>
          <button
            className="forgot-otp-submit"
            type="button"
            onClick={this.verifyOtp}
          >
            Submit
          </button>
        </div>
      </>
    )
  }

  renderEmail = () => {
    const {email, showEmailError, mailErrorTxt} = this.state
    return (
      <>
        <p className="forgot-txt">
          Enter the email address associated with your account and we will send
          you a link to reset your password.
        </p>
        <label className="forgot-label" htmlFor="emailId">
          Email:
        </label>
        <input
          placeholder="Enter Email"
          id="emailId"
          className="forgot-input"
          value={email}
          onChange={this.onEmail}
          onBlur={this.onMailBlur}
        />
        {showEmailError && (
          <p className="register-error-msg login-error">{mailErrorTxt}</p>
        )}
        <button
          className="forgot-continue-btn"
          type="button"
          onClick={this.sendOtp}
        >
          Continue
        </button>
        <p className="forgot-bottom-txt">
          Do not have an account?
          <Link to="/register">
            <span className="forgot-signup-txt">Sign Up</span>
          </Link>
        </p>
      </>
    )
  }

  renderEmailOtp = () => {
    const {emailSent} = this.state

    return emailSent ? this.renderOtp() : this.renderEmail()
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onConfirmPassword = event => {
    this.setState({confirmPassword: event.target.value})
  }

  submitPasswordForm = event => {
    event.preventDefault()
    const {
      password,
      confirmPassword,
      passwordErrorStatus,
      confirmPasswordErrorStatus,
    } = this.state
    if (password === '') {
      this.setState({passwordErrorStatus: true, passwordErrorTxt: 'Required*'})
    } else if (!passwordErrorStatus && !confirmPasswordErrorStatus) {
      this.onSetPassword(password, confirmPassword)
    }
  }

  renderOnSetPassword = () => {
    const {
      password,
      confirmPassword,
      passwordErrorStatus,
      passwordErrorTxt,
      confirmPasswordErrorStatus,
      confirmPasswordErrorTxt,
      errorTxt,
      errorStatus,
      showRegister,
    } = this.state
    return (
      <form className="set-password" onSubmit={this.submitPasswordForm}>
        <h1 className="set-password-heading">Set Your Password</h1>
        <label className="set-password-label" htmlFor="passwordId">
          New password
        </label>
        <input
          placeholder="Enter Your Password"
          value={password}
          type="password"
          id="passwordId"
          className="set-password-input"
          onChange={this.onPassword}
          onBlur={this.onPasswordBlur}
        />
        {passwordErrorStatus && <p className="error-txt">{passwordErrorTxt}</p>}
        <label className="set-password-label" htmlFor="confirmPassword">
          Confirm New password
        </label>
        <input
          placeholder="Enter Your Password"
          value={confirmPassword}
          id="confirmPassword"
          className="set-password-input"
          type="password"
          onChange={this.onConfirmPassword}
          onBlur={this.onConfirmPasswordBlur}
        />
        {confirmPasswordErrorStatus && (
          <p className="error-txt">{confirmPasswordErrorTxt}</p>
        )}
        <button className="set-password-btn" type="submit">
          Set Password
        </button>
        {errorStatus && (
          <p className="error-txt set-password-error-msg">{errorTxt}</p>
        )}
        {showRegister && (
          <Link to="/register">
            <p className="register-now-link">Register Now</p>
          </Link>
        )}
      </form>
    )
  }

  render() {
    const {otpSubmitted} = this.state
    return (
      <div className="forgot-container">
        {otpSubmitted ? (
          this.renderOnSetPassword()
        ) : (
          <form className="forgot-form" onSubmit={this.submitForgotForm}>
            <h1 className="forgot-heading">The Novelty Bookstore</h1>
            {this.renderEmailOtp()}
          </form>
        )}
      </div>
    )
  }
}

export default ForgotPassword
