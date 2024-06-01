import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { jwtDecode } from "jwt-decode"
import { useNavigate, useParams } from 'react-router-dom'

const EditNote = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [noteId, setNoteId] = useState("");
  const [content, setContent] = useState("");
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState("");
  const [users, setUsers] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getUsers();
    fetchNote();
  },[params.noteId]);

  const fetchNote = async() => {
    try {
      const response = await axiosJWT.get(`https://mynotes-backend-dot-project-180324-b-03.et.r.appspot.com/notes/${params.noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log(response);
      const noteData = response.data[0];
      setTitle(noteData.title);
      setContent(noteData.content);
      setNoteId(noteData.id);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  const updateNote = async(e) => {
    e.preventDefault();
    try {
      const response = await axiosJWT.put(`https://mynotes-backend-dot-project-180324-b-03.et.r.appspot.com/notes/${params.noteId}`, {
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
      <form onSubmit={updateNote} class="box">
                <h2 className='title is-3 has-text-centered'>Edit your <a className='has-text-success'>Note</a></h2>
                <p class="has-text-centered">{msg}</p>
                <div class="field mt-5">
                  <label class="label">Title</label>
                  <div class="control">
                    <input type="text" class="input is-success" placeholder="Title" value={title} onChange={(e) => {setTitle(e.target.value)}} />
                  </div>
                </div>
                <div class="field mt-5">
                  <label class="label">Content</label>
                  <div class="control">
                    <textarea class="textarea is-success" cols="30" rows="5" placeholder='Write your note here' value={content} onChange={(e) => {setContent(e.target.value)}}>{content}</textarea>
                  </div>
                </div>
                <div class="field mt-5 mb-3">
                  <button class="button is-success is-fullwidth">Simpan</button>
                </div>
              </form>
    </div>
  )
}

export default EditNote