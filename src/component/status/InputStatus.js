import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InputStatus = () => {
  const [mitras, setMitras] = useState([]);
  const [idCoffeeshop, setIdCoffeeshop] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllMitra();
  }, []);

  const getAllMitra = async () => {
    try {
      const response = await axios.get('http://localhost:5000/mitra');
      setMitras(response.data);
    } catch (error) {
      console.error("There was an error fetching the mitras!", error);
    }
  };

  const postStatus = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/sampah', {
        id_coffeeshop: idCoffeeshop,
        status: "Belum penuh"
      });
      navigate("/status");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className='container mt-5 p-5'>
      <form onSubmit={postStatus} className="box">
        <h2 className='title is-3 has-text-centered'>
          Tambah data <a style={{ color: "#17726d" }}>Tempat Sampah</a>
        </h2>
        <p className="has-text-centered">{msg}</p>
        <div className="field mt-5">
          <label className="label">Id Coffeeshop</label>
          <div className="control">
            <select
              className='input is-light'
              value={idCoffeeshop}
              onChange={(e) => setIdCoffeeshop(e.target.value)}
            >
              <option value="">Pilih Coffeeshop</option>
              {mitras.map((mitra) => (
                <option key={mitra.id} value={mitra.id}>
                  {mitra.id} - {mitra.nama_coffeeshop}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="field mt-5 mb-3">
          <button className="button is-fullwidth" style={{ backgroundColor: "#17726d" }}>
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputStatus;
