import React from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

import Spinner from './components/Spinner'
import PasswordReset from './PasswordReset'

import '../App.css';

const objectSchema = {
  confirmEmail: string().required('Email is required'),
};

const initValue = {
  confirmEmail: ''
}

export default class PassowordRecovery_1 extends React.Component {
  state = {
    emailSentSuccess: false,
  }
  
  _handleModalClose = () => {
    this.setState(() => ({
      emailSentSuccess: false,
    }))
  }

  _handleSubmit = ({
    confirmEmail,
    setSubmitting,
    resetForm,
  }) => {
    // fake loading
    // The email verification step would be here
    setTimeout(async () => {
      setSubmitting(false)

      this.setState(() => ({
        emailSentSuccess: true,
      }))

      resetForm()
    }, 1000)

    // when done switch to another page

  }

  onSubmit = ({ confirmEmail },
    { setSubmitting, resetForm }) => {

    this._handleSubmit({
      confirmEmail, 
      setSubmitting,
      resetForm,
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

    if (!isSubmitting && !this.state.emailSentSuccess) // when nothing had happened
    {
      return (
        <Paper className="form form--wrapper" elevation={10}>
          <form className="form" onSubmit={handleSubmit}>
            {/*The email*/}
            <FormControl fullWidth margin="dense">
              <InputLabel
                htmlFor="confirm-email"
                error={Boolean(touched.confirmEmail && errors.confirmEmail)}
              >
                {'Email'}
              </InputLabel>
              <Input
                id="confirm-email"
                name="confirmEmail"
                type="email" 
                value={values.confirmEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.confirmEmail && errors.confirmEmail)}
              />
              <FormHelperText
                error={Boolean(touched.confirmEmail && errors.confirmEmail)}
              >
                {touched.confirmEmail && errors.confirmEmail ? errors.confirmEmail : ''}
              </FormHelperText>
            </FormControl>
            {/* The button */}
            <Button
              type="submit"
              variant="raised"
              color="primary"
              disabled={Boolean(!isValid || isSubmitting)}
              style={{ margin: '16px' }}
            >
              {'Confirm'}
            </Button>
          </form>
        </Paper>
      )
    }
    
    if (this.state.emailSentSuccess)
    {
      return <PasswordReset />; 
    }

    if (isSubmitting)
    {
      return <Spinner />; 
    }
  }

  render() {
    return (
      <Formik
        initialValues={initValue}

        validationSchema={object().shape(objectSchema)}

        onSubmit={this.onSubmit}
      >
        {this.renderForm}
      </Formik>
    )
  }
}