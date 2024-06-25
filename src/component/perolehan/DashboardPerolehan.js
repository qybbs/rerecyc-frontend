import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './styles.css';

const DashboardPerolehan = () => {
  const [perolehans, setPerolehans] = useState("");
  const [msg, setMsg] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllPerolehan();
  },[]);

  const getAllPerolehan = async() => {
    const response = await axios.get(`http://localhost:5000/perolehan`);
    setPerolehans(response.data);
  }

  const EditPerolehan = (id) => {
    navigate(`/editperolehan/${id}`);
  }

  const DeletePerolehan = async(id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/perolehan/${id}`);
      window.location.reload();
      getAllPerolehan();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  const generatePDF = () => {
    const filteredPerolehans = perolehans.filter((perolehan) => {
      const tanggal = new Date(perolehan.tanggal);
      return (!startDate || new Date(startDate) <= tanggal) && (!endDate || tanggal <= new Date(endDate));
    });

    const doc = new jsPDF();
    doc.text('Laporan Perolehan Sampah', 14, 16);
    doc.autoTable({
      head: [['Tanggal', 'Id tempat Sampah', 'Id Coffeeshop', 'Coffeeshop', 'Pendapatan Kotor', 'Pendapatan Bersih']],
      body: filteredPerolehans.map(perolehan => [
        perolehan.tanggal.split('T')[0],
        perolehan.id_tmptsampah,
        perolehan.id_coffeeshop,
        perolehan.coffeeshop,
        perolehan.pendapatan_kotor,
        perolehan.pendapatan_bersih
      ]),
      startY: 20,
    });
    doc.save('Laporan_Penggunaan_Perolehan.pdf');
  };

  return (
    <div className='container mt-5 p-5'>
      <h1 className='title is-5 mb-5 has-text-centered'>
        Welcome, Admin!
      </h1>
      <hr />
      <h1 className='title is-6 mb-3 has-text-centered'>Perolehan Sampah</h1>
      <hr />
      <p class="has-text-centered">{msg}</p>

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

      {perolehans.length > 0 && ( 
        <table className='table is-striped is-fullwidth'>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Id Tempat Sampah</th>
              <th>Id Coffeeshop</th>
              <th>Coffeeshop</th>
              <th>Pendapatan Kotor</th>
              <th>Pendapatan Bersih</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {perolehans.map((perolehan, index) => (
              <tr key={perolehan.id}>
                <td>{perolehan.tanggal.split('T')[0]}</td>
                <td>{perolehan.id_tmptsampah}</td>
                <td>{perolehan.id_coffeeshop}</td>
                <td>{perolehan.coffeeshop}</td>
                <td>{perolehan.pendapatan_kotor}</td>
                <td>{perolehan.pendapatan_bersih}</td>
                <td>
                  <button className='button is-warning' onClick={() => EditPerolehan(perolehan.id)}>Edit</button>
                </td>
                <td>
                <button className='button is-danger' onClick={() => {
                DeletePerolehan(perolehan.id);
                getAllPerolehan();
                }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {perolehans.length == 0 && (
        <h1 className='has-text-centered'>Belum ada data perolehan!</h1>
      )}
      <div className="column is-centered">
      <a href="/inputperolehan" className='button has-text-centered' style={{ backgroundColor: "#17726d" }}>Tambah data perolehan</a>
      </div>
    </div>
  )
}

export default DashboardPerolehan