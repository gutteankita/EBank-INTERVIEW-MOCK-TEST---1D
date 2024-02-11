import {Component} from 'react'
import {HeaderSection, Img, Button} from './styledComponents'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom' // Import withRouter

class Header extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  render() {
    return (
      <HeaderSection>
        <Img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <Button onClick={this.onClickLogout}>Logout</Button>
      </HeaderSection>
    )
  }
}

export default withRouter(Header)
