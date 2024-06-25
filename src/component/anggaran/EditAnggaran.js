import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditAnggaran = () => {
  const [admins, setAdmins] = useState([]);
  const [tanggal, setTanggal] = useState("");
  const [idAdmin, setIdAdmin] = useState("");
  const [status, setStatus] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [nominal, setNominal] = useState("");
  const [id, setId] = useState(0);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAllAdmin();
    fetchAnggaran();
  },[params.idAnggaran]);

  const getAllAdmin = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user');
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admin:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchAnggaran = async() => {
    try {
      const response = await axios.get(`http://localhost:5000/anggaran/${params.idAnggaran}`);
      const anggaranData = response.data[0];
      setId(anggaranData.id);
      setTanggal(formatDate(anggaranData.tanggal));
      setIdAdmin(anggaranData.id_admin);
      setStatus(anggaranData.status_penggunaan);
      setKeterangan(anggaranData.keterangan);
      setNominal(anggaranData.nominal);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  const updateAnggaran = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/anggaran/${params.idAnggaran}`, {
        tanggal: tanggal,
        id_admin: idAdmin,
        status_penggunaan: status,
        keterangan,
        nominal
      });
      navigate("/anggaran");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  return (
    <div className='container mt-5 p-5'>
      <form onSubmit={updateAnggaran} className="box">
                <h2 className='title is-3 has-text-centered'>Edit data <a className='has-text-success'>Penggunaan Anggaran</a></h2>
                <p className="has-text-centered">{msg}</p>
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
                  <button className="button is-success is-fullwidth">Simpan</button>
                </div>
              </form>
    </div>
  )
}

export default EditAnggaran
