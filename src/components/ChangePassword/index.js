import {Component} from 'react'
import './index.css'

class ChangePassword extends Component {
  state = {
    password: '',
    confirmPassword: '',
    errorMsg: '',
    errorStatus: false,
    currentPassword: '',
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onConfirmPassword = event => {
    this.setState({confirmPassword: event.target.value})
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
            onChange={this.onPassword}
          />
          <label className="set-password-label" htmlFor="passwordId">
            New password
          </label>
          <input
            placeholder="Enter Your Password"
            value={password}
            id="passwordId"
            className="set-password-input"
            onChange={this.onPassword}
          />
          <label className="set-password-label" htmlFor="confirmPassword">
            Confirm New password
          </label>
          <input
            placeholder="Enter Your Password"
            value={confirmPassword}
            id="confirmPassword"
            className="set-password-input"
            onChange={this.onConfirmPassword}
          />
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
