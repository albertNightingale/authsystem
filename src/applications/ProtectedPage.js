import React from 'react';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';

export default class ProtectedPage extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return <h1>Protected Page</h1>
  }
}

