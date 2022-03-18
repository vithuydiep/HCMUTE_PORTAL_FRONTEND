import PropTypes from 'prop-types'
import React from 'react'
import './SliderItem.css'

function SliderItem({ panel }) {
  return (
    <div className="mySlides fade">
      <img className="slider_picture" src={panel.img} alt="Anh thu 1" />
      <div className="text">{panel.title}</div>
    </div>
  )
}

SliderItem.propTypes = {
  panel: PropTypes.object.isRequired,
}
export default SliderItem
