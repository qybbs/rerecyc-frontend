import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InputPerolehan = () => {
  const [statuses, setStatuses] = useState([]);
  const [tanggal, SetTanggal] = useState("");
  const [idTmptSampah, SetIdTmptSampah] = useState("");
  const [pendapatanKotor, SetPendapatanKotor] = useState("");
  const [pendapatanBersih, SetPendapatanBersih] = useState("");
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

  const PostPerolehan = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/perolehan', {
        tanggal: tanggal,
        id_tmptsampah: idTmptSampah,
        pendapatan_kotor: pendapatanKotor,
        pendapatan_bersih: pendapatanBersih
      });
      navigate("/perolehan");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  return (
    <div className='container mt-5 p-5'>
      <form onSubmit={PostPerolehan} className="box">
        <h2 className='title is-3 has-text-centered'>Tambah data <a style={{ color: "#17726d" }}>Perolehan</a></h2>
        <p className="has-text-centered">{msg}</p>
        <div className="field mt-5">
          <label className="label">Tanggal</label>
          <div className="control">
            <input
              type="date"
              className="input is-light"
              placeholder="Tanggal"
              value={tanggal}
              onChange={(e) => SetTanggal(e.target.value)}
            />
          </div>
        </div>
        <div className="field mt-5">
          <label className="label">Id Tempat Sampah</label>
          <div className="control">
            <select
              className='input is-light'
              value={idTmptSampah}
              onChange={(e) => SetIdTmptSampah(e.target.value)}
            >
              <option value="">Pilih Tempat Sampah</option>
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.id} - {status.nama_coffeeshop}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="field mt-5">
          <label className="label">Pendapatan Sampah Kotor</label>
          <div className="control">
            <input
              type="number"
              className="input is-light"
              placeholder="Pendapatan Sampah Kotor (Kg)"
              value={pendapatanKotor}
              onChange={(e) => SetPendapatanKotor(e.target.value)}
            />
          </div>
        </div>
        <div className="field mt-5">
          <label className="label">Pendapatan Sampah Bersih</label>
          <div className="control">
            <input
              type="number"
              className="input is-light"
              placeholder="Pendapatan Sampah Bersih (Kg)"
              value={pendapatanBersih}
              onChange={(e) => SetPendapatanBersih(e.target.value)}
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

export default InputPerolehan;
