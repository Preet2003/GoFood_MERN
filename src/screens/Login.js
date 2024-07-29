import React from 'react'
import { useState } from 'react'

// submit button click karte hi vapas home page pein aa jaaye => usenavigate
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function Login() {

  const [credentials, setCredentials] = useState({ email: '', password: '' });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Submitted');

    const response = await fetch(`${backendUrl}/api/loginuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    })
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert('Enter Valid Credentials');
    }

    if (json.success) {

      // storing email also in localStorage for future use while placing order
      localStorage.setItem('userEmail', credentials.email);

      // save the token in local storage
      localStorage.setItem('authToken', json.authToken);

      console.log('Login Successful');
      console.log(localStorage.getItem('authToken'));

      // navigate to the home page
      navigate('/');
    }
  }

  const onChng = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="container">
        {/* on  submitting the form connect to backend */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChng} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChng} id="exampleInputPassword1" />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/createuser" className='m-3 btn btn-danger'>New User</Link>
        </form>
      </div>
    </>
  )
}
