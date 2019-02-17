import React, { Component } from 'react';
import Home from './components/Home';
import axios from 'axios';
import { connect } from 'react-redux';

class App extends Component {

  componentDidMount(){
    axios.get('/api').then((res) => {
      this.props.getData(res.data)
    })
  }

  render() {
    return (
      <div className="App">
        <Home></Home>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    getData: (data) => {
      dispatch({type: 'GET_DATA', data: data})
    }
  }
}

export default connect(null, mapDispatchToProps)(App);
