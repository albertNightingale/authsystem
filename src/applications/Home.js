import React from 'react';
import { Route, BrowserRouter as Router, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {signOut} from '../redux/action/action'

class Home extends React.Component {

  inaccessibleViews = [
    <li><Link to="/about">About</Link></li>,
    <li><Link to="/login">LogIn</Link></li>
  ];
  
  accessibleViews = [
    <li><Link to="/about">About</Link></li>,
    <li><Link to="/protectedpage">Protected Page</Link></li>,
    <li><Link onClick={(e)=>this.props.signOut()} to="/home">LogOut</Link></li>
  ];

  constructor(props) {
    super(props);

    this.state = {
      'accessible': props.isloggedin
    }
  }

  renderfunc() {
    if (!this.state.accessible) {
      return (
        <nav>
          <ul>
            {this.inaccessibleViews}
          </ul>
        </nav>
      )
    }
    else {
      return (
        <nav>
          <ul>
            {this.accessibleViews}
          </ul>
        </nav>
      )
    }
  }

  onClick() {
    return (<Redirect to='/home'/>)
  }

  render() {
    return (
      <div>
        <h1 onClick={()=>this.onClick()}>Home</h1>
        {this.renderfunc()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isloggedin : state.isloggedin
  };
};

const mapDispatchToProps = {
    signOut: signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);