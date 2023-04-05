import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class ChangePassword extends Component {
  state = {
    password: '',
    confirmPassword: '',
    currentPassword: '',
    passwordErrorTxt: '',
    passwordErrorStatus: '',
    confirmPasswordErrorTxt: '',
    confirmPasswordErrorStatus: '',
    currentPasswordErrorTxt: '',
    currentPasswordErrorStatus: false,
    mainErrStatus: false,
    mainErrTxt: '',
  }

  onCurrentPassword = event =>
    this.setState({currentPassword: event.target.value})

  onPassword = event => this.setState({password: event.target.value})

  onConfirmPassword = event =>
    this.setState({confirmPassword: event.target.value})

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
    const {password} = this.state
    if (event.target.value !== password) {
      this.setState({
        confirmPasswordErrorTxt: "Password doesn't Match",
        confirmPasswordErrorStatus: true,
      })
    } else {
      this.setState({
        confirmPasswordErrorStatus: false,
        confirmPasswordErrorTxt: '',
      })
    }
  }

  submitPasswordForm = async event => {
    event.preventDefault()
    const getToken = Cookies.get('jwt_token')
    const {
      confirmPassword,
      currentPassword,
      passwordErrorStatus,
      confirmPasswordErrorStatus,
      password,
    } = this.state
    const passDetails = {
      currentPassword,
      confirmPassword,
    }
    const passUrl = 'http://localhost:3006/change-password'
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken}`,
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(passDetails),
    }

    if (
      passwordErrorStatus === false &&
      confirmPasswordErrorStatus === false &&
      password !== '' &&
      confirmPassword !== '' &&
      currentPassword !== ''
    ) {
      const response = await fetch(passUrl, options)
      const data = await response.json()
      if (data.error_code === 200) {
        const {history} = this.props
        history.replace('/')
      } else {
        this.setState({
          currentPasswordErrorTxt: data.error_msg,
          currentPasswordErrorStatus: true,
        })
      }
    } else {
      this.setState({
        mainErrStatus: true,
        mainErrTxt: '*All fields are required',
      })
    }
  }

  render() {
    const {
      password,
      confirmPassword,
      currentPassword,
      passwordErrorTxt,
      confirmPasswordErrorStatus,
      confirmPasswordErrorTxt,
      currentPasswordErrorTxt,
      currentPasswordErrorStatus,
      mainErrStatus,
      mainErrTxt,
    } = this.state
    return (
      <div className="change-password-container">
        <form
          className="change-password set-password"
          onSubmit={this.submitPasswordForm}
        >
          <h1 className="change-password-heading">Change Password</h1>
          <label className="set-password-label" htmlFor="passwordId">
            Current password
          </label>
          <input
            placeholder="Enter Your Password"
            value={currentPassword}
            id="passwordId"
            className="set-password-input"
            onChange={this.onCurrentPassword}
          />
          {currentPasswordErrorStatus && (
            <div className="error-div">
              <p className="error-txt">{currentPasswordErrorTxt}</p>
              <Link to="/password">
                <p className="forgot-password-txt">Forgot Password ?</p>
              </Link>
            </div>
          )}
          <label className="set-password-label" htmlFor="passwordId">
            New password
          </label>
          <input
            placeholder="Enter Your Password"
            value={password}
            id="passwordId"
            className="set-password-input"
            onChange={this.onPassword}
            onBlur={this.onPasswordBlur}
          />
          {passwordErrorTxt && <p className="error-txt">{passwordErrorTxt}</p>}
          <label className="set-password-label" htmlFor="confirmPassword">
            Confirm New password
          </label>
          <input
            placeholder="Enter Your Password"
            value={confirmPassword}
            id="confirmPassword"
            className="set-password-input"
            onChange={this.onConfirmPassword}
            onBlur={this.onConfirmPasswordBlur}
          />
          {confirmPasswordErrorStatus && (
            <p className="error-txt">{confirmPasswordErrorTxt}</p>
          )}
          <button className="set-password-btn" type="submit">
            Change Password
          </button>
          {mainErrStatus && (
            <p className="error-txt main-error">{mainErrTxt}</p>
          )}
        </form>
      </div>
    )
  }
}

export default ChangePassword
