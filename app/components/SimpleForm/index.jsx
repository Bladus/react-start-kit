'use strict';

import React from 'react';
import { Field, reduxForm } from 'redux-form';

const required = value => (value ? undefined : 'Required')
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)
const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined
const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? 'Really? You still use AOL for your email?'
    : undefined
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined
export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined

/*const validate = values => {
    const errors = {}
    if (!values.firstName) {
        errors.firstName = 'Required'
    } else if (values.firstName && values.firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.age) {
        errors.age = 'Required'
    } else if (isNaN(Number(values.age))) {
        errors.age = 'Must be a number'
    } else if (Number(values.age) < 18) {
        errors.age = 'Sorry, you must be at least 18 years old'
    }
    return errors
}*/

const warn = values => {
    const warnings = {};
    if (values.firstName && values.firstName.length < 10) {
        warnings.firstName = 'Желательно больше  10...'
    }
    return warnings
}



const renderField = ({ input, label, type, meta: { touched, error, warning }}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const SimpleForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <Field
        name="username"
        type="text"
        component={renderField}
        label="Username"
        validate={[required, maxLength15, minLength2]}
        warn={alphaNumeric}
      />
          </div>
        </div>
        <div>
          <label>Last Name</label>
          <div>
            <Field
              name="lastName"
              component="input"
              type="text"
              placeholder="Last Name"
              component={renderField}
            />
          </div>
        </div>
        <div>
          <div>
            <Field
              name="email"
              component="input"
              type="email"
              label="Email"
              placeholder="Email"
              component={renderField}
            />
          </div>
        </div>
        <div>
          <label>Sex</label>
          <div>
            <label>
              <Field
                name="sex"
                component="input"
                type="radio"
                value="male"
              />{' '}
              Male
            </label>
            <label>
              <Field
                name="sex"
                component="input"
                type="radio"
                value="female"
              />{' '}
              Female
            </label>
          </div>
        </div>
        <div>
          <label>Favorite Color</label>
          <div>
            <Field name="favoriteColor" component="select">
              <option />
              <option value="ff0000">Red</option>
              <option value="00ff00">Green</option>
              <option value="0000ff">Blue</option>
            </Field>
          </div>
        </div>
        <div>
          <label htmlFor="employed">Employed</label>
          <div>
            <Field
              name="employed"
              id="employed"
              component="input"
              type="checkbox"
            />
          </div>
        </div>
        <div>
          <label>Notes</label>
          <div>
            <Field name="notes" component="textarea" />
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    )
}

export default reduxForm({
    form: 'simple', // a unique identifier for this form
})(SimpleForm);