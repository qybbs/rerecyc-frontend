import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const InputMitra = () => {
  const [coffeeshop, SetCoffeeshop] = useState("");
  const [alamat, setAlamat] = useState("");
  const [pj, setPj] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [cp_pj, setCpPj] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const PostMitra = async(e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:5000/mitra', {
            nama_coffeeshop: coffeeshop,
            alamat: alamat,
            pj: pj,
            jabatan: jabatan,
            cp_pj: cp_pj
        });
        navigate("/");
    } catch (error) {
        if (error.response) {
            setMsg(error.response.data.msg);
        }
    }
}

  return (
    <div className='container mt-5 p-5'>
      <form onSubmit={PostMitra} className="box">
                <h2 className='title is-3 has-text-centered'>Tambah daftar <a style={{ color: "#17726d" }}>Mitra</a></h2>
                <p className="has-text-centered">{msg}</p>
                <div class="field mt-5">
                  <label class="label">Nama Coffeeshop</label>
                  <div class="control">
                    <input type="text" class="input is-light" placeholder="Coffeeshop" value={coffeeshop} onChange={(e) => {SetCoffeeshop(e.target.value)}} />
                  </div>
                </div>
                <div class="field mt-5">
                  <label class="label">Alamat</label>
                  <div class="control">
                    <textarea class="textarea is-light" cols="20" rows="3" placeholder='Tulis alamat disini' value={alamat} onChange={(e) => {setAlamat(e.target.value)}}>{alamat}</textarea>
                  </div>
                </div>
                <div class="field mt-5">
                  <label class="label">Penanggung Jawab</label>
                  <div class="control">
                  <input type="text" class="input is-light" placeholder="Penanggung Jawab" value={pj} onChange={(e) => {setPj(e.target.value)}} />
                  </div>
                </div>
                <div class="field mt-5">
                  <label class="label">Jabatan</label>
                  <div class="control">
                  <input type="text" class="input is-light" placeholder="Jabatan" value={jabatan} onChange={(e) => {setJabatan(e.target.value)}} />
                  </div>
                </div>
                <div class="field mt-5">
                  <label class="label">CP Penanggung Jawab</label>
                  <div class="control">
                  <input type="text" class="input is-light" placeholder="CP Penanggung Jawab" value={cp_pj} onChange={(e) => {setCpPj(e.target.value)}} />
                  </div>
                </div>
                <div className="field mt-5 mb-3">
                  <button className="button is-fullwidth" style={{ backgroundColor: "#17726d" }}>Simpan</button>
                </div>
              </form>
    </div>
  )
}

export default InputMitra