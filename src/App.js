import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import UserContext from './Context/userContext'

import './App.css'
import SellBook from './components/SellBook'
import OwnProducts from './components/OwnProducts'
import BooksList from './components/BooksList'
import BookDetails from './components/BookDetails'
import OwnProductDetails from './components/OwnProductDetails'
import About from './components/About'
import Category from './components/Category'

class App extends Component {
  state = {activeUsername: ''}

  onUsername = name => this.setState({activeUsername: name})

  render() {
    const {activeUsername} = this.state
    console.log(activeUsername)
    return (
      <UserContext.Provider value={activeUsername}>
        <>
          <Switch>
            <Route exact path="/register" component={RegisterForm} />
            <Route
              exact
              path="/login"
              component={LoginForm}
              onUsername={this.onUsername}
            />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/sell" component={SellBook} />
            <ProtectedRoute exact path="/products" component={OwnProducts} />
            <ProtectedRoute exact path="/books/:id" component={BookDetails} />
            <ProtectedRoute exact path="/books" component={BooksList} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={OwnProductDetails}
            />
          </Switch>
        </>
      </UserContext.Provider>
    )
  }
}

export default App
