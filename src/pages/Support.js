import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Support() {
  return (
    <div>
        <Header />
        <div className='h-[calc(100vh-80px)] flex flex-wrap flex-col justify-center items-center'>
          <h1 className='text-bold text-3xl'>Support</h1>
          <p>For support with any errors with the application, send an email to <br/> <a href='mailto:gerald.akorli@gmail.com' className='underline'>gerald.akorli@gmail.com</a> or <a href='mailto:keionv11@gmail.com' className='underline'>keionv11@gmail.com</a></p>
        </div>
        <Footer />
    </div>
  )
}

export default Support