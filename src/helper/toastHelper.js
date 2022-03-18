/* eslint-disable prefer-destructuring */
import { toast } from 'react-toastify'

export const toastError = (error) => {
  let message = null
  if (typeof error === 'object' && error.message) {
    message = error.message
  }
  if (message !== null && typeof message !== 'undefined' && message !== '') {
    toast.error(message, {
      theme: 'dark',
    })
  }
}

export const toastSuccess = (message) => {
  if (message !== null && typeof message !== 'undefined' && message !== '') {
    toast.success(message, {
      theme: 'dark',
    })
  }
}
