import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'
import SellBook from './components/SellBook'
import OwnProducts from './components/OwnProducts'
import BooksList from './components/BooksList'
import BookDetails from './components/BookDetails'
import OwnProductDetails from './components/OwnProductDetails'
import Cart from './components/Cart'
import Payment from './components/Payment'
import ForgotPassword from './components/ForgotPassword'
import ChangePassword from './components/ChangePassword'
import NotFound from './components/NotFound'
import PaymentSuccess from './components/PaymentSuccess'
import SellBookUpdation from './components/SellBookUpdation'
import AboutSection from './components/AboutSection'

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/register" component={RegisterForm} />
          <Route
            exact
            path="/login"
            component={LoginForm}
            onUsername={this.onUsername}
          />
          <Route exact path="/password" component={ForgotPassword} />
          <Route exact path="/payment-success" component={PaymentSuccess} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/change-password"
            component={ChangePassword}
          />
          <ProtectedRoute exact path="/sell" component={SellBook} />
          <ProtectedRoute exact path="/sell/:id" component={SellBookUpdation} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/about" component={AboutSection} />
          <ProtectedRoute exact path="/payments/:id" component={Payment} />
          <ProtectedRoute exact path="/products" component={OwnProducts} />
          <ProtectedRoute exact path="/books/:id" component={BookDetails} />
          <ProtectedRoute exact path="/books" component={BooksList} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={OwnProductDetails}
          />
          <Route component={NotFound} />
        </Switch>
      </>
    )
  }
}

export default App
