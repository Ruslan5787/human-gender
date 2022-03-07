import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const API = {
  SERVER_URL: 'https://api.genderize.io',
  URL: '?name=',
}

class HumanGender extends React.Component {
  constructor(props) {
    super(props)

    this.state = { name: '', gender: '' }

    this.getHumanInfo = this.getHumanInfo.bind(this)
    this.setName = this.setName.bind(this)
  }

  render() {
    return (
      <form onSubmit={this.getHumanInfo}>
        <Input setName={this.setName} />
        <Button />
        <Result gender={this.state.gender} />
      </form>
    )
  }

  async getHumanInfo(event) {
    event.preventDefault()
    
    const firstName = this.state.name
    
    if (firstName.length <= 2) {
      this.setState({gender: 'Введите больше двух символов'})
    } else {
      const response = await fetch(`${API.SERVER_URL}${API.URL}${firstName}`)
      const humanInfo = await response.json()
      
      this.setState({gender: humanInfo.gender})
    }
  }

  setName(value) {
    this.setState({ name: value })
  }
}

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: '' }

    this.getName = this.getName.bind(this);
  }

  getName(e) {
    this.setState({ name: e.target.value })

    this.props.setName(e.target.value)
  }

  render() {
    return (
      <input type="text" onChange={this.getName}></input>
    )
  }
}

class Button extends React.Component {
  render() {
    return (
      <button type="submit">Узнать пол</button>
    )
  }
}

class Result extends React.Component {
  render() {
    return (
      <div>{this.props.gender}</div>
    )
  }
}

ReactDOM.render(
  <HumanGender />,
  root
)

