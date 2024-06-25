import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditPerolehan = () => {
  const [statuses, setStatuses] = useState([]);
  const [tanggal, SetTanggal] = useState("");
  const [idTmptSampah, SetIdTmptSampah] = useState("");
  const [pendapatanKotor, SetPendapatanKotor] = useState("");
  const [pendapatanBersih, SetPendapatanBersih] = useState("");
  const [id, setId] = useState(0);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAllStatus();
    fetchPerolehan();
  },[params.idPerolehan]);

  const getAllStatus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/sampah');
      setStatuses(response.data);
    } catch (error) {
      console.error('Error fetching statuses:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchPerolehan = async() => {
    try {
      const response = await axios.get(`http://localhost:5000/perolehan/${params.idPerolehan}`);
      const perolehanData = response.data[0];
      setId(perolehanData.id);
      SetTanggal(formatDate(perolehanData.tanggal)); // Format the date here
      SetIdTmptSampah(perolehanData.id_tmptsampah);
      SetPendapatanKotor(perolehanData.pendapatan_kotor);
      SetPendapatanBersih(perolehanData.pendapatan_bersih);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  const updatePerolehan = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/perolehan/${params.idPerolehan}`, {
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
      <form onSubmit={updatePerolehan} className="box">
                <h2 className='title is-3 has-text-centered'>Edit data <a className='has-text-success'>Perolehan</a></h2>
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
                  <button className="button is-success is-fullwidth">Simpan</button>
                </div>
              </form>
    </div>
  )
}

export default EditPerolehan
