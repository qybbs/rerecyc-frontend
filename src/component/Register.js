import React, {useState} from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setconfPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const Register = async(e) => {
        e.preventDefault();
        try {
            await axios.post('https://mynotes-backend-dot-project-180324-b-03.et.r.appspot.com/users', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            });
            navigate("/");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="column is-centered">
            <div className="column is-4-dekstop">
              <form onSubmit={Register} className="box">
              <h2 className='title is-3 has-text-centered'>Sign up to <a className='has-text-success'>MyNotes</a></h2>
              <p className="has-text-centered">{msg}</p>
                <div className="field mt-5">
                  <label className="label">Name</label>
                  <div className="control">
                    <input type="text" className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Email</label>
                  <div className="control">
                    <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Password</label>
                  <div className="control">
                    <input type="password" className="input" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Confirm Password</label>
                  <div className="control">
                    <input type="password" className="input" placeholder="*******" value={confPassword} onChange={(e) => setconfPassword(e.target.value)}/>
                  </div>
                </div>
                <div className="field mt-5">
                  <button className="button is-success is-fullwidth">Register</button>
                </div>
                <p class="has-text-centered">Already have an account? <a href="/" className='has-text-success'>Sign in</a></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register