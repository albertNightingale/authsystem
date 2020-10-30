import React from 'react';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';


export default class About extends React.Component{

    constructor(props) {
        super(props);
    }


    render() {
        return <h1>The About Information of this project</h1>
    }
}
