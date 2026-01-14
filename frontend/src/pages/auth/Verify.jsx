import React from 'react'
import { Link } from 'react-router-dom'
import './auth.css'

const Verify = () => {
  return (
        <div className="auth-page">
      <div className="auth-form">
        <h2>Verify Account</h2>
        <form >
          <label htmlFor="otp">Otp</label>
          <input
            type="number"
            // value={otp}
            // onChange={(e) => setOtp(e.target.value)}
            required
          />
          {/* <ReCAPTCHA
            sitekey=" 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={onChange}
          /> */}
          ,
          {/* {show && ( */}
            <button  className="common-btn">
              Verify
            </button>
          {/* )} */}
        </form>
        <p>
          Go to <Link to="/login">Login</Link> page
        </p>
      </div>
    </div>
  )
}

export default Verify