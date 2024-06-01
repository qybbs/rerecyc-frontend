import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router-dom'

const InputNote = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState("");
  const [users, setUsers] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getUsers();
  },[]);

  const PostNote = async(e) => {
    e.preventDefault();
    try {
        await axios.post('https://mynotes-backend-dot-project-180324-b-03.et.r.appspot.com/note', {
            name: name,
            title: title,
            content: content
        });
        navigate("/dashboard");
    } catch (error) {
        if (error.response) {
            setMsg(error.response.data.msg);
        }
    }
}

  const refreshToken = async() => {
    try {
      const response = await axios.get('https://mynotes-backend-dot-project-180324-b-03.et.r.appspot.com/token');
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.name);
      setExpired(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/")
      }
    }
  }

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(async(config) => {
    const currentDate = new Date();
    if (expired * 1000 < currentDate.getTime()) {
      const response = await axios.get("https://mynotes-backend-dot-project-180324-b-03.et.r.appspot.com/token");
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.name);
      setExpired(decoded.exp);
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  const getUsers = async() => {
    const response = await axiosJWT.get("https://mynotes-backend-dot-project-180324-b-03.et.r.appspot.com/users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setUsers(response.data);
  }

  return (
    <div className='container mt-5 p-5'>
      <form onSubmit={PostNote} className="box">
                <h2 className='title is-3 has-text-centered'>Make your <a className='has-text-success'>Note</a></h2>
                <p className="has-text-centered">{msg}</p>
                <div className="field mt-5">
                  <label className="label">Title</label>
                  <div className="control">
                    <input type="text" className="input is-success" placeholder="Title" value={title} onChange={(e) => {setTitle(e.target.value)}} />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Content</label>
                  <div className="control">
                    <textarea className="textarea is-success" cols="30" rows="5" placeholder='Write your note here' value={content} onChange={(e) => {setContent(e.target.value)}}></textarea>
                  </div>
                </div>
                <div className="field mt-5 mb-3">
                  <button className="button is-success is-fullwidth">Simpan</button>
                </div>
              </form>
    </div>
  )
}

export default InputNote