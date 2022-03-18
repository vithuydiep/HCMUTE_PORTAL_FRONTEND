import React from 'react'
import { useSelector } from 'react-redux'
import LoadingIcon from '../../../assets/loading.gif'
import './GlobalLoading.css'

const GlobalLoading = () => {
  const isLoading = useSelector((state) => state.loading.isLoading)

  if (isLoading) {
    return (
      <div className="globalloading">
        <img src={LoadingIcon} alt="Loading" className="globalloading-icon" />
      </div>
    )
  }
  return null
}

export default GlobalLoading
