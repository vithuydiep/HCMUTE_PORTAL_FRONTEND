import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchSliderList } from '../../../store/reducers/SliderReducer'
import SliderItem from '../SliderItem/SliderItem'
import './Slider.css'

// const panelList = [
//   {
//     id: 1,
//     title: 'Tổng thông tin',
//     img: '/assets/images/pic2.png',
//   },
//   {
//     id: 2,
//     title: 'Tổng thông tin',
//     img: '/assets/images/pic3.png',
//   },
//   {
//     id: 3,
//     title: 'Tổng thông tin',
//     img: '/assets/images/pic1.jpg',
//   },
// ]

function Slider() {
  const panelList = useSelector((state) => state.slider.listSlider)
  const [slideIndex, setSlideIndex] = useState(1)
  const dispatch = useDispatch()
  let setTimefunc
  function fucnSet() {
    setTimefunc = setTimeout(() => {
      setSlideIndex(slideIndex + 1)
    }, 5000)
  }

  useEffect(() => {
    dispatch(fetchSliderList())
  }, [])

  const showSlides = () => {
    let i
    const slides = document.getElementsByClassName('mySlides')
    if (slideIndex > slides.length) {
      setSlideIndex(1)
    } else if (slideIndex < 1) {
      setSlideIndex(slides.length)
    } else {
      // eslint-disable-next-line no-plusplus
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none'
      }
      slides[slideIndex - 1].style.display = 'block'
      fucnSet()
    }
  }

  const plusSlides = (n) => {
    setSlideIndex(slideIndex + n)
  }

  useEffect(() => {
    showSlides()
    return () => clearTimeout(setTimefunc)
  }, [slideIndex, panelList])

  return (
    <div className="grid wide">
      <div className="slideshow-container">
        {panelList.map((panel) => {
          return (
            <a href={panel.link}>
              <SliderItem panel={panel} key={panel.id} />
            </a>
          )
        })}
        <div
          className="prev"
          onClick={() => {
            plusSlides(-1)
          }}
        >
          &#10094;
        </div>
        <div
          className="next"
          onClick={() => {
            plusSlides(1)
          }}
        >
          &#10095;
        </div>
      </div>
    </div>
  )
}

export default Slider
