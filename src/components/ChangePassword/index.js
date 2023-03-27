import {Component} from 'react'
import './index.css'

class ChangePassword extends Component {
  state = {
    password: '',
    confirmPassword: '',
    errorMsg: '',
    errorStatus: false,
    currentPassword: '',
    passwordErrorTxt: '',
    passwordErrorStatus: '',
    confirmPasswordErrorTxt: '',
    confirmPasswordErrorStatus: '',
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

  submitPasswordForm = event => {
    event.preventDefault()
    const {password, confirmPassword} = this.state
    if (password !== confirmPassword) {
      this.setState({errorStatus: true, errorMsg: 'Password does not Match'})
    } else {
      console.log('entered')
      console.log(this.props)
      this.onSetPassword(password, confirmPassword)
    }
  }

  render() {
    const {
      password,
      confirmPassword,
      errorStatus,
      errorMsg,
      currentPassword,
      passwordErrorStatus,
      passwordErrorTxt,
      confirmPasswordErrorStatus,
      confirmPasswordErrorTxt,
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
          {/* <p>{}</p> */}
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

          {errorStatus && <p className="error-txt">{errorMsg}</p>}
          <button className="set-password-btn" type="submit">
            Change Password
          </button>
        </form>
      </div>
    )
  }
}

export default ChangePassword
