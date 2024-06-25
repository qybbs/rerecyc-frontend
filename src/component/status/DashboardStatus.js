import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DashboardStatus = () => {
  const [statuses, setStatuses] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllStatus();
  }, []);

  const getAllStatus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/sampah');
      setStatuses(response.data);
    } catch (error) {
      console.error('Error fetching statuses:', error);
    }
  };

  const DeleteStatus = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/sampah/${id}`);
      getAllStatus();
    } catch (error) {
      console.error('Error deleting status:', error);
    }
  };

  const toggleStatus = async (idSampah, nama, idcs, currentStatus) => {
    const newStatus = currentStatus === "Belum Penuh" ? "Sudah Penuh" : "Belum Penuh";
    console.log(`Toggling status for id: ${idSampah} from ${currentStatus} to ${newStatus}`);
    try {
      const response = await axios.put(`http://localhost:5000/sampah/${idSampah}`, {
        id_coffeeshop: idcs,
        nama_coffeeshop: nama,
        status: newStatus
      });
      console.log('API response:', response.data);
      getAllStatus();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className='container mt-5 p-5'>
      <h1 className='title is-5 mb-5 has-text-centered'>
        Welcome, Admin!
      </h1>
      <hr />
      <h1 className='title is-6 mb-3 has-text-centered'>Cek Status</h1>
      <hr />
      <p className="has-text-centered">{msg}</p>
      {statuses.length > 0 ? (
        <table className='table is-striped is-fullwidth'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Id Coffeeshop</th>
              <th>Coffeeshop</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {statuses.map((status) => (
              <tr key={status.id}>
                <td>{status.id}</td>
                <td>{status.id_coffeeshop}</td>
                <td>{status.nama_coffeeshop}</td>
                <td>
                  <button
                    className={`button ${status.status === "Belum Penuh" ? "is-warning" : "is-success"}`}
                    onClick={() => toggleStatus(status.id, status.nama_coffeeshop, status.id_coffeeshop, status.status)}
                  >
                    {status.status}
                  </button>
                </td>
                <td>
                  <button className='button is-danger' onClick={() => DeleteStatus(status.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className='has-text-centered'>Belum ada data!</h1>
      )}
      <div className="column is-centered">
        <a href="/inputstatus" className='button has-text-centered' style={{ backgroundColor: "#17726d" }}>Tambah tempat sampah</a>
      </div>
    </div>
  );
};

export default DashboardStatus;
