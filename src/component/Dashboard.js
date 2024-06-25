import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [mitras, setMitras] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllMitra();
  },[]);

  const getAllMitra = async() => {
    const response = await axios.get(`http://localhost:5000/mitra`);
    setMitras(response.data);
  }

  const EditMitra = (id) => {
    navigate(`/editmitra/${id}`);
  }

  const DeleteMitra = async(id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/mitra/${id}`);
      window.location.reload();
      getAllMitra();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container mt-5 p-5'>
      <h1 className='title is-5 mb-5 has-text-centered'>
        Welcome, Admin!
      </h1>
      <hr />
      <h1 className='title is-6 mb-3 has-text-centered'>Daftar Mitra</h1>
      <hr />
      <p class="has-text-centered">{msg}</p>
      {mitras.length > 0 && ( 
        <table className='table is-striped is-fullwidth'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Coffeeshop</th>
              <th>Alamat</th>
              <th>Penanggung Jawab</th>
              <th>Jabatan</th>
              <th>CP Penanggung Jawab</th>
              <th>Jumlah Tempat Sampah</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mitras.map((mitra, index) => (
              <tr key={mitra.id}>
                <td>{index + 1}</td>
                <td>{mitra.nama_coffeeshop}</td>
                <td>{mitra.alamat}</td>
                <td>{mitra.pj}</td>
                <td>{mitra.jabatan}</td>
                <td>{mitra.cp_pj}</td>
                <td>{mitra.jml_tmpt_sampah}</td>
                <td>
                  <button className='button is-warning' onClick={() => EditMitra(mitra.id)}>Edit</button>
                </td>
                <td>
                <button className='button is-danger' onClick={() => {
                DeleteMitra(mitra.id);
                getAllMitra();
                }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {mitras.length == 0 && (
        <h1 className='has-text-centered'>Belum ada mitra terdaftar!</h1>
      )}
      <div className="column is-centered">
      <a href="/inputmitra" className='button has-text-centered' style={{ backgroundColor: "#17726d" }}>Tambah Mitra</a>
      </div>
    </div>
  )
}

export default Dashboard