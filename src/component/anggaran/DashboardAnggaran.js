import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const DashboardAnggaran = () => {
  const [anggarans, setAnggarans] = useState([]);
  const [msg, setMsg] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllAnggaran();
  }, []);

  const getAllAnggaran = async () => {
    const response = await axios.get(`http://localhost:5000/anggaran`);
    setAnggarans(response.data);
  };

  const EditAnggaran = (id) => {
    navigate(`/editanggaran/${id}`);
  };

  const DeleteAnggaran = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/anggaran/${id}`);
      getAllAnggaran();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const generatePDF = () => {
    const filteredAnggarans = anggarans.filter((anggaran) => {
      const tanggal = new Date(anggaran.tanggal);
      return (!startDate || new Date(startDate) <= tanggal) && (!endDate || tanggal <= new Date(endDate));
    });

    const doc = new jsPDF();
    doc.text('Laporan Penggunaan Anggaran', 14, 16);
    doc.autoTable({
      head: [['Tanggal', 'Id Admin', 'Nama Admin', 'Status Kegunaan', 'Keterangan', 'Nominal']],
      body: filteredAnggarans.map(anggaran => [
        anggaran.tanggal.split('T')[0],
        anggaran.id_admin,
        anggaran.nama_admin,
        anggaran.status_penggunaan,
        anggaran.keterangan,
        anggaran.nominal
      ]),
      startY: 20,
    });
    doc.save('Laporan_Penggunaan_Anggaran.pdf');
  };

  return (
    <div className='container mt-5 p-5'>
      <h1 className='title is-5 mb-5 has-text-centered'>
        Welcome, Admin!
      </h1>
      <hr />
      <h1 className='title is-6 mb-3 has-text-centered'>Daftar Penggunaan Anggaran</h1>
      <hr />
      <p className="has-text-centered">{msg}</p>

      <div className="field">
        <label className="label">Start Date</label>
        <div className="control">
          <input
            type="date"
            className="input is-light"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">End Date</label>
        <div className="control">
          <input
            type="date"
            className="input is-light"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <button className="button is-link" onClick={generatePDF}>
          Download PDF
        </button>
      </div>

      {anggarans.length > 0 ? (
        <table className='table is-striped is-fullwidth'>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Id Admin</th>
              <th>Nama Admin</th>
              <th>Status Kegunaan</th>
              <th>Keterangan</th>
              <th>Nominal</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {anggarans.map((anggaran) => (
              <tr key={anggaran.id}>
                <td>{anggaran.tanggal.split('T')[0]}</td>
                <td>{anggaran.id_admin}</td>
                <td>{anggaran.nama_admin}</td>
                <td>{anggaran.status_penggunaan}</td>
                <td>{anggaran.keterangan}</td>
                <td>{anggaran.nominal}</td>
                <td>
                  <button className='button is-warning' onClick={() => EditAnggaran(anggaran.id)}>Edit</button>
                </td>
                <td>
                  <button className='button is-danger' onClick={() => DeleteAnggaran(anggaran.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className='has-text-centered'>Belum ada penggunaan anggaran terdaftar!</h1>
      )}
      <div className="column is-centered">
        <a href="/inputanggaran" className='button has-text-centered' style={{ backgroundColor: "#17726d" }}>Tambah data penggunaan anggaran</a>
      </div>
    </div>
  );
};

export default DashboardAnggaran;
