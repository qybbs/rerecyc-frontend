import React, {useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Auth = async(e) => {
    e.preventDefault();
    try {
        await axios.post('https://mynotes-backend-dot-project-180324-b-03.et.r.appspot.com/login', {
            email: email,
            password: password
        });
        navigate("/dashboard");
    } catch (error) {
        if (error.response) {
            setMsg(error.response.data.msg);
        }
    }
}

return (
    <section class="hero has-background-grey-light is-fullheight is-fullwidth">
      <div class="hero-body is-light">
        <div class="container">
          <div class="column is-centered">
            <div class="column is-4-dekstop">
              <form onSubmit={Auth} class="box">
                <h2 className='title is-3 has-text-centered'>Sign in to <a className='has-text-success'>MyNotes</a></h2>
                <p class="has-text-centered">{msg}</p>
                <div class="field mt-5">
                  <label class="label">Email or Username</label>
                  <div class="control">
                    <input type="text" class="input" placeholder="Username" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                  </div>
                </div>
                <div class="field mt-5">
                  <label class="label">Password</label>
                  <div class="control">
                    <input type="password" class="input" placeholder="*******" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                  </div>
                </div>
                <div class="field mt-5">
                  <button class="button is-success is-fullwidth">Login</button>
                </div>
                <p class="has-text-centered">Don't have an account? <a href="/register" className='has-text-success'>Sign up</a></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Login