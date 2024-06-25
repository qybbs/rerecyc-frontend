import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InputAnggaran = () => {
  const [admins, setAdmins] = useState([]);
  const [tanggal, setTanggal] = useState("");
  const [idAdmin, setIdAdmin] = useState("");
  const [status, setStatus] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [nominal, setNominal] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllAdmin();
  }, []);

  const getAllAdmin = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user');
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admin:', error);
    }
  };

  const postAnggaran = async (e) => {
    e.preventDefault();
    if (!tanggal || !idAdmin || !status || !keterangan || !nominal) {
      setMsg("Please fill all fields");
      return;
    }
    try {
      await axios.post('http://localhost:5000/anggaran', {
        tanggal,
        id_admin: idAdmin,
        status_penggunaan: status,
        keterangan,
        nominal
      });
      navigate("/anggaran");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      } else {
        setMsg("Error occurred while saving data");
      }
    }
  }

  return (
    <div className='container mt-5 p-5'>
      <form onSubmit={postAnggaran} className="box">
        <h2 className='title is-3 has-text-centered'>Tambah data <span style={{ color: "#17726d" }}>Penggunaan Anggaran</span></h2>
        <p className="has-text-centered has-text-danger">{msg}</p>
        <div className="field mt-5">
          <label className="label">Tanggal</label>
          <div className="control">
            <input
              type="date"
              className="input is-light"
              placeholder="Tanggal"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
            />
          </div>
        </div>
        <div className="field mt-5">
          <label className="label">Id Admin</label>
          <div className="control">
            <select
              className='input is-light'
              value={idAdmin}
              onChange={(e) => setIdAdmin(e.target.value)}
            >
              <option value="">Pilih Admin</option>
              {admins.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.id} - {admin.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="field mt-5">
          <label className="label">Status Penggunaan</label>
          <div className="control">
            <select
              className='input is-light'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Pilih Status</option>
              <option value="Pemasukan">Pemasukan</option>
              <option value="Pengeluaran">Pengeluaran</option>
            </select>
          </div>
        </div>
        <div className="field mt-5">
          <label className="label">Keterangan</label>
          <div className="control">
            <input
              type="text"
              className="input is-light"
              placeholder="Keterangan"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
            />
          </div>
        </div>
        <div className="field mt-5">
          <label className="label">Nominal</label>
          <div className="control">
            <input
              type="number"
              className="input is-light"
              placeholder="Nominal"
              value={nominal}
              onChange={(e) => setNominal(e.target.value)}
            />
          </div>
        </div>
        <div className="field mt-5 mb-3">
          <button className="button is-fullwidth" style={{ backgroundColor: "#17726d" }}>Simpan</button>
        </div>
      </form>
    </div>
  )
}

export default InputAnggaran;
