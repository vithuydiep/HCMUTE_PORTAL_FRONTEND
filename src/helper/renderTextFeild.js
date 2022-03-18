import { TextField } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

const renderTextField = ({
  label,
  input,
  meta: { invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    error={invalid}
    helperText={error}
    {...input}
    {...custom}
  />
)

renderTextField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
}

export default renderTextField
