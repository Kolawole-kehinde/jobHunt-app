import React from 'react'
import ShowcaseSearch from './layout/ShowcaseSearch'

const ShowCase = () => {
  return (
    <section className="showcase relative bg-cover bg-center bg-no-repeat h-72 flex items-center">
    <div className="overlay"></div>
    <div className="container mx-auto text-center z-10">
      <h2 className="text-4xl text-white font-bold mb-4">Find Your Dream Job</h2>
       <ShowcaseSearch/>
    </div>
  </section>
  )
}

export default ShowCase
