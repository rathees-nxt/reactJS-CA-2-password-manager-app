import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

const colorList = ['red', 'green', 'yellow', 'orange', 'pink', 'blue', 'purple']

class App extends Component {
  state = {
    detailsList: [],
    website: '',
    userName: '',
    password: '',
    searchInput: '',
    isShowPassword: false,
  }

  onChangeWebsite = e => {
    this.setState({website: e.target.value})
  }

  onChangeUserName = e => {
    this.setState({userName: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  onSearchInput = e => {
    this.setState({searchInput: e.target.value})
    console.log(e.target.value)
  }

  deleteDetails = id => {
    const {detailsList} = this.state
    const newList = detailsList.filter(eachList => eachList.id !== id)
    const check = newList.length !== 0
    this.setState({detailsList: newList, isToDisplay: check})
  }

  onAddContent = e => {
    e.preventDefault()
    const {website, userName, password} = this.state
    const initial = userName.slice(0, 1).toUpperCase()
    const colorClass = colorList[Math.floor(Math.random() * 7)]
    const newDetails = {
      id: v4(),
      initialValue: initial,
      website,
      userName,
      password,
      classname: colorClass,
    }
    this.setState(prevState => ({
      detailsList: [...prevState.detailsList, newDetails],
      website: '',
      userName: '',
      password: '',
      searchInput: '',
      isToDisplay: true,
    }))
  }

  toDisplayPassword = () => {
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
  }

  render() {
    const {
      detailsList,
      website,
      userName,
      password,
      searchInput,
      isShowPassword,
    } = this.state
    let {isToDisplay} = this.state

    const newList = detailsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (newList.length === 0) {
      isToDisplay = false
    } else {
      isToDisplay = true
    }

    return (
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="first-form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="pwd-manager-img"
          />
          <form className="newpassword-container" onSubmit={this.onAddContent}>
            <h1 className="form-heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="icon-img"
              />
              <input
                type="text"
                className="input"
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
                value={website}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="icon-img"
              />
              <input
                type="text"
                className="input"
                placeholder="Enter Username"
                onChange={this.onChangeUserName}
                value={userName}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="icon-img"
              />
              <input
                type="password"
                className="input"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <div className="btn-container">
              <button type="submit" className="add-button">
                Add
              </button>
            </div>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="pwd-manager-img1"
          />
        </div>

        <div className="second-container">
          <div className="password-container">
            <div className="counter">
              <h1 className="password-heading">Your Passwords</h1>
              <p className="count">{detailsList.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={this.onSearchInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="show-container">
            <input
              type="checkbox"
              id="check"
              className="checkbox"
              onClick={this.toDisplayPassword}
            />
            <label htmlFor="check" className="show-heading">
              Show Passwords
            </label>
          </div>
          {!isToDisplay && (
            <div className="nopassword-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password-img"
              />
              <p className="para">No passwords</p>
            </div>
          )}
          {isToDisplay && (
            <ul className="details-container">
              {newList.map(eachDetails => (
                <li className="details-list" key={eachDetails.id}>
                  <div className={`initial ${eachDetails.classname}`}>
                    <p className="letter">{eachDetails.initialValue}</p>
                  </div>
                  <div className="list-content">
                    <p className="para-el">{eachDetails.website}</p>
                    <p className="para-el">{eachDetails.userName}</p>
                    {isShowPassword ? (
                      <p className="para-el">{eachDetails.password}</p>
                    ) : (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="star-img"
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => this.deleteDetails(eachDetails.id)}
                    data-testid="delete"
                    className="del-btn"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="del-img"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
