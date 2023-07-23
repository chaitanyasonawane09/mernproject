import React from 'react'
import{Link} from "react-router-dom";
const Errorpage = () => {
  return (
    <>
      <div id="not-found">
        <div className='not-found'>
            <div className='not found-404'>
                <h1>404</h1>
            </div>
            <h2>We are sorry,Page Not Found!</h2>
            <p className='mb-5'>
                THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED HAD ITS NAME CHANGES OR IS TEMPORARILY UNAVAILABLE.
            </p>
            <Link className="btn btn-primary" aria-current="page" to="/"> Back To Homepage</Link>
        </div>
      </div>

    </>
  )
}

export default Errorpage
