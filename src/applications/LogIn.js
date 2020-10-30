import React from 'react';
import { Route, BrowserRouter as Router, Link as RouterLink, Switch, Redirect } from 'react-router-dom';
import Copyright from './components/Copyright';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux';
import { signIn } from '../redux/action/action';


class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success : this.props.isloggedin, 
      incorrectPassword : false
    }

    this.check.bind(this); 
  }
  
  render() {
    return (
      <div>
        {this.state.success ? this.navigate() : this.SignIn()}
      </div>
    )
  }

  useStyles() {
    return makeStyles((theme) => ({
      paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    }));
  }

  check = (event) => {
    
    event.preventDefault();

    const email = this.refs.email.value;
    const pass = this.refs.password.value;

    // verification

    // update redux
    this.props.signIn("firstname", "lastname", email);

    // send the request to the server and perform the verification
    const result = true; 
    if (result) {
      this.setState( {
        success: true, 
        incorrectPassword: false
      } ); 
    }
    else {
      this.setState( {
        success: false, 
        incorrectPassword: true
      } ); 
    }
  }

  navigate() {
    
    this.setState(
      () => 
        ({
          success: false, 
          incorrectPassword: false
        })
    );

    return <Redirect to = "/protectedpage"/>
  }

  SignIn() {
    const classes = this.useStyles();
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper} >
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon /> {/* The Icon in the start */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in 
          </Typography>  
          
          {
            this.state.incorrectPassword ?
                (<Typography component="h5" variant="h5">
                  Please enter the correct email
                </Typography>) : 
                null
          }

          <form className={classes.form} onSubmit={this.check}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              ref="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required 
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              ref="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <RouterLink to="/passwordrecovery">
                  Forgot password?
                </RouterLink>
              </Grid>
              <Grid item>
                <RouterLink to="/signup">
                  Don't have an account? Sign Up
                </RouterLink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright/>
        </Box>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    isloggedin: state.isloggedin
  };
};

const mapDispatchToProps = {
    signIn: signIn
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);