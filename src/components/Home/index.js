import {Component} from 'react'
import {HomeSection, Heading, Img} from './styledComponents'
import Header from '../Header'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Home extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (!jwtToken) {
      return <Redirect to="/ebank/login" />
    }

    return (
      <>
        <Header />
        <HomeSection>
          <Heading>Your Flexibility, Our Excellence</Heading>

          <Img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
          />
        </HomeSection>
      </>
    )
  }
}

export default Home
