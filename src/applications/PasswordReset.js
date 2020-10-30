import React, { Component } from "react";
import { Formik } from "formik";
import { object, ref, string } from "yup";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import Spinner from "./components/Alert";
import Alert from "./components/Alert";

import {Redirect, Route, BrowserRouter as Router, Link as RouterLink, Switch } from 'react-router-dom';
import LogIn from './LogIn'


const initialValues = {
    newPass: "",
    confirmPass: ""
}

const validationSchema = object().shape({
    newPass: string().required("New password is required"),
    confirmPass: string()
      .oneOf([ref("newPass")], "Passwords do not match")
      .required("Password is required")
  })

export default class PasswordReset extends Component {
  state = {
    passChangeSuccess: false
  };

  _renderModal = () => {

    return (
      <Redirect to='/login'/>
    );
  };

  _handleSubmit = ({
    newPass,
    confirmPass,
    setSubmitting,
    resetForm
  }) => {
    // fake async login
    setTimeout(async () => {
      setSubmitting(false);

      this.setState(() => ({
        passChangeSuccess: true
      }));

      resetForm();
    }, 1000);
  };

  onSubmit = ({ currentPass, newPass, confirmPass }, { setSubmitting, resetForm }) => {
    this._handleSubmit({
      currentPass,
      newPass,
      confirmPass,
      setSubmitting,
      resetForm
    })
  }

  renderForm = (props) => {
    const values = props.values; // the value within the page
    console.log(values)
    const touched = props.touched; // holds keys that are been touched/visted
    const errors = props.errors; // the error that occurs
    console.log(errors); 
    const handleChange = props.handleChange;
    const handleBlur = props.handleBlur; // for onBlur event, when the page lost focus
    const handleSubmit = props.handleSubmit;   
    const isValid = props.isValid; // checking the validity of the data
    const isSubmitting = props.isSubmitting;

    if (!isSubmitting)
    {
      if (!this.state.passChangeSuccess)
      {
        return (
          <Paper className="form form--wrapper" elevation={10}>
            <form className="form" onSubmit={handleSubmit}>
              <FormControl
                fullWidth
                margin="dense"
                error={Boolean(touched.newPass && errors.newPass)}
              >
                <InputLabel
                  htmlFor="password-new"
                  error={Boolean(touched.newPass && errors.newPass)}
                >
                  {"New Password"}
                </InputLabel>
                <Input
                  id="password-new"
                  name="newPass"
                  type="password"
                  value={values.newPass}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.newPass && errors.newPass)}
                />
                <FormHelperText
                  error={Boolean(touched.newPass && errors.newPass)}
                >
                  {touched.newPass && errors.newPass ? errors.newPass : ""}
                </FormHelperText>
              </FormControl>
              <FormControl
                fullWidth
                margin="dense"
                error={Boolean(touched.confirmPass && errors.confirmPass)}
              >
                <InputLabel
                  htmlFor="password-confirm"
                  error={Boolean(touched.confirmPass && errors.confirmPass)}
                >
                  {"Confirm Password"}
                </InputLabel>
                <Input
                  id="password-confirm"
                  name="confirmPass"
                  type="password"
                  value={values.confirmPass}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.confirmPass && errors.confirmPass)}
                />
                <FormHelperText
                  error={Boolean(touched.confirmPass && errors.confirmPass)}
                >
                  {touched.confirmPass && errors.confirmPass
                    ? errors.confirmPass
                    : ""}
                </FormHelperText>
              </FormControl>
              <Button
                type="submit"
                variant="raised"
                color="primary"
                disabled={Boolean(!isValid || isSubmitting)}
                style={{ margin: "16px" }}
              >
                {'Reset Password'}
              </Button>
            </form>
          </Paper>
        );
      }
      else {
        return this._renderModal(); 
      }
    }

    if (isSubmitting)
    {
      return <Spinner />; 
    }
  }

  render() {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={this.onSubmit}>
                {this.renderForm}
        </Formik>
    );
  }

}