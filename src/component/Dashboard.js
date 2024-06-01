import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState("");
  const [users, setUsers] = useState("");
  const [notes, setNotes] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getUsers();
    getNotes();
  },[]);

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

  const getNotes = async() => {
    const response = await axiosJWT.get(`https://mynotes-backend-dot-project-180324-b-03.et.r.appspot.com/notes`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setNotes(response.data);
  }

  const EditNote = (id) => {
    navigate(`/editnote/${id}`);
  }

  const DeleteNote = async(id) => {
    try {
      const response = await axiosJWT.delete(`https://mynotes-backend-dot-project-180324-b-03.et.r.appspot.com/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getNotes();
    } catch (error) {
      console.log(error);
    }
  }

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  const capitalizedName = capitalizeFirstLetter(name);

  return (
    <div className='container mt-5 p-5'>
      <h1 className='title is-5 mb-5 has-text-centered'>
        Welcome Back, {capitalizedName}!
      </h1>
      {/* <hr />
      <h1 className='title is-6 mb-3 has-text-centered'>Users List</h1>
      <hr />
      {users.length > 0 && (
        <table className='table is-striped is-fullwidth'>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )} */}
      <hr />
      <h1 className='title is-6 mb-3 has-text-centered'>Notes List</h1>
      <hr />
      <p class="has-text-centered">{msg}</p>
      {notes.length > 0 && ( 
        <table className='table is-striped is-fullwidth'>
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Content</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => (
              <tr key={note.id}>
                <td>{index + 1}</td>
                <td>{note.title}</td>
                <td>{note.content}</td>
                <td>
                  <button className='button is-warning' onClick={() => EditNote(note.id)}>Edit</button>
                </td>
                <td>
                <button className='button is-danger' onClick={() => {
                DeleteNote(note.id);
                getNotes();
                }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {notes.length == 0 && (
        <h1 className='has-text-centered'>Belum ada catatan!</h1>
      )}
      <div className="column is-centered">
      <a href="/inputnote" className='button is-success has-text-centered'>Tambah Catatan</a>
      </div>
    </div>
  )
}

export default Dashboard