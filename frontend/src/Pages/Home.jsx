import React from 'react'
import Navbar from '../components/Navbar'
import Pricing from '../components/Pricing'
import Portfolio from '../components/Portfolio'

import Testimonial from '../components/Testimonial'
import Footer from '../components/Footer'
// import AnimatedImageSlider from '../components/ImageSlider/AnimatedImageSlider'
// import Animated3DNavbar from '../components/Navbar/Animated3dNavbar'
import Carousel from '../components/Carousel/Carousel'
import CircularStats from '../components/CircularStats'
import ScrollIndicator from '../components/ScrollIndicator'

const Home = () => {
  return (
    <>
    <Navbar/>
    <ScrollIndicator/>
    <Carousel/>
    <Pricing/>
    <Portfolio/>
    <CircularStats/>
    <Testimonial/>
    <Footer/>
    </>
    
  )
}

export default Home
