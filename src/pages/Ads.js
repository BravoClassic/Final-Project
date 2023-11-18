import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Ads() {
  return (
    <div>
        <Header />
        <div className='ads h-[calc(100vh-64px)] '>
          <div className='backdrop-blur-xl text-white h-full w-full flex flex-wrap flex-col justify-center items-center' >
          <h1 className='text-bold text-3xl'>Advertisment</h1>
          <p>Advertisment coming soon!</p>
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default Ads