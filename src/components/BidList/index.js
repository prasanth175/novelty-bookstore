import {Component} from 'react'
import './index.css'

class BidList extends Component {
  state = {count: 0, isAccepted: false}

  componentDidMount = () => this.setState(prev => ({count: prev.count + 1}))

  onBidAccept = () => this.setState({isAccepted: true})

  onBidDecline = () => this.setState({isAccepted: false})

  render() {
    const {count, isAccepted} = this.state
    const {item} = this.props
    const {bidAmount, mobile, user} = item
    return (
      <tr className="bid-details-item">
        <td className="bid-count-btn bid-table-value">{count}</td>
        <td className="bid-user bid-table-value">{user}</td>
        <td className="bidding-amount bid-table-value">{bidAmount}</td>
        <td className="bidding-options-btn">
          {isAccepted ? (
            <p className="accepted-number bid-table-value">{mobile}</p>
          ) : (
            <button
              className="bid-accept-btn bid-table-value"
              type="button"
              onClick={this.onBidAccept}
            >
              Accept
            </button>
          )}
          <button
            className="bid-decline-btn bid-table-value"
            type="button"
            onClick={this.onBidDecline}
          >
            Decline
          </button>
        </td>
      </tr>
    )
  }
}

export default BidList
