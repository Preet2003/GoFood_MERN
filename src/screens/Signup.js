import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Signup() {

  // useStates => pass the initial value of all the state
  const [credentials, setCredentials] = useState({name: '', email: '', password: '',geolocation:''});

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form Submitted');

    // connect to backend
    const response = await fetch('http://localhost:5000/api/createuser', {
      // post method => thus also send body
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // body should be in json format => we send json object but convert it to string
      body: JSON.stringify({

        // field names same as in the backend that is database
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      })
    })
    const json = await response.json();
    console.log(json);

    if(!json.success){
      alert('Enter Valid Credentials');
    }
  }

  // by default the value of the input field is empty and it is static
  // thus whatever value is given initially remains the same
  // to make it dynamic we need to use onChange event
  const onChng = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  // change for to htmlFor 
  return (
    <>
      <div className="container">
        {/* on  submitting the form connect to backend */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleName" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChng}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email}  onChange={onChng} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChng} id="exampleInputPassword1" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleAddress" className="form-label">Address</label>
            <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChng} id="exampleAddress1" />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/login" className='m-3 btn btn-danger'>Already a User</Link>
        </form>
      </div>
    </>
  )
}
