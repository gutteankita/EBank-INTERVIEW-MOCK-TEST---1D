import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {
  MainContainer,
  LoginContainer,
  Img,
  Div,
  Button,
  Para,
  Form,
  Label,
  Input,
  Heading,
} from './styledComponents'

class LoginForm extends Component {
  state = {
    userId: '',
    pin: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
    console.log(event.target.value)
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
    console.log(event.target.value)
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  // submitForm = async event => {
  //   event.preventDefault()
  //   const {userId, pin} = this.state
  //   const userDetails = {userId, pin}
  //   const url = 'https://apis.ccbp.in/ebank/login'
  //   const options = {
  //     method: 'POST',
  //     body: JSON.stringify(userDetails),
  //   }
  //   const response = await fetch(url, options)
  //   const data = await response.json()
  //   console.log(data, 'ddd')
  //   if (response.ok === true) {
  //     this.onSubmitSuccess(data.jwt_token)
  //   } else {
  //     this.onSubmitFailure(data.error_msg)
  //   }
  // }

  submitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state

    console.log('User ID:', userId)
    console.log('PIN:', pin)

    // Validation checks
    // if (userId.trim() === '' && pin.trim() === '') {
    //   this.onSubmitFailure('Invalid User ID and PIN')
    //   return
    // }

    if (userId.trim() === '') {
      this.onSubmitFailure('Invalid User ID')
      return
    }

    if (pin.trim() === '') {
      this.onSubmitFailure('Invalid PIN')
      return
    }

    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      console.log('API Response:', data)

      if (response.ok === true) {
        // Login successful
        console.log('Login successful!')
        this.onSubmitSuccess(data.jwt_token)
      } else {
        // Login failed
        console.log('Login failed:', data.error_msg)
        this.onSubmitFailure(data.error_msg)
      }
    } catch (error) {
      console.error('Error occurred during login:', error)
      this.onSubmitFailure(
        'An error occurred during login. Please try again later.',
      )
    }
  }

  // submitForm = async event => {
  //   event.preventDefault()
  //   const {userId, pin} = this.state

  //   console.log('User ID:', userId)
  //   console.log('PIN:', pin)

  //   // Validation checks
  //   if (userId.trim() === '' || pin.trim() === '') {
  //     this.onSubmitFailure('Please enter User ID and PIN')
  //     return
  //   }

  //   const userDetails = {user_id: userId, pin}
  //   const url = 'https://apis.ccbp.in/ebank/login'
  //   const options = {
  //     method: 'POST',
  //     body: JSON.stringify(userDetails),
  //   }

  //   try {
  //     const response = await fetch(url, options)
  //     const data = await response.json()

  //     console.log('API Response:', data)

  //     if (response.status === 200) {
  //       // Login successful
  //       console.log('Login successful!')
  //       this.onSubmitSuccess(data.jwt_token)
  //     } else {
  //       // Login failed
  //       console.log('Login failed:', data.error_msg)
  //       this.onSubmitFailure(data.error_msg)
  //     }
  //   } catch (error) {
  //     console.error('Error occurred during login:', error)
  //     this.onSubmitFailure(
  //       'An error occurred during login. Please try again later.',
  //     )
  //   }
  // }

  renderPinField = () => {
    const {pin} = this.state

    return (
      <>
        <Label htmlFor="pin">PIN</Label>
        <Input
          type="password"
          id="pin"
          value={pin}
          onChange={this.onChangePin}
          placeholder="Enter PIN"
        />
      </>
    )
  }

  renderUserIdField = () => {
    const {userId} = this.state

    return (
      <>
        <Label htmlFor="user-id">USER ID</Label>
        <Input
          type="text"
          id="user-id"
          value={userId}
          onChange={this.onChangeUserId}
          placeholder="Enter User ID"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <MainContainer>
        <LoginContainer>
          <Img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />

          <Form onSubmit={this.submitForm}>
            <Heading>Welcome Back!</Heading>
            <Div>{this.renderUserIdField()}</Div>
            <Div>{this.renderPinField()}</Div>
            <Button type="submit">Login</Button>
            {showSubmitError && (
              <Para className="error-message">*{errorMsg}</Para>
            )}
          </Form>
        </LoginContainer>
      </MainContainer>
    )
  }
}

export default LoginForm
