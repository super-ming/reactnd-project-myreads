import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import Main from './components/pages/bookcase'
import Search from './components/pages/search'

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div>
          <Route exact path='/' component={ Main } />
          <Route exact path='/search' component={ Search } />
        </div>
      </div>
    )
  }
}

export default App
