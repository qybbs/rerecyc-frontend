import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditMitra = () => {
  const [coffeeshop, SetCoffeeshop] = useState("");
  const [alamat, setAlamat] = useState("");
  const [pj, setPj] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [cp_pj, setCpPj] = useState("");
  const [jml, setJml] = useState(0);
  const [id, setId] = useState(0);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMitra();
  },[params.idMitra]);

  const fetchMitra = async() => {
    try {
      const response = await axios.get(`http://localhost:5000/mitra/${params.idMitra}`);
      const mitraData = response.data[0];
      setId(mitraData.id);
      SetCoffeeshop(mitraData.nama_coffeeshop);
      setAlamat(mitraData.alamat);
      setPj(mitraData.pj);
      setJabatan(mitraData.jabatan);
      setCpPj(mitraData.cp_pj);
      setJml(mitraData.jml_tmpt_sampah);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  const updateMitra = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/mitra/${params.idMitra}`, {
        nama_coffeeshop: coffeeshop,
        alamat: alamat,
        pj: pj,
        jabatan: jabatan,
        cp_pj: cp_pj,
        jml_tmpt_sampah: jml
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
      <form onSubmit={updateMitra} class="box">
                <h2 className='title is-3 has-text-centered'>Edit data <a className='has-text-success'>Mitra</a></h2>
                <p class="has-text-centered">{msg}</p>
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
                <input type="hidden" class="input is-light" value={jml} onChange={(e) => {setCpPj(e.target.value)}} />
                <div class="field mt-5 mb-3">
                  <button class="button is-success is-fullwidth">Simpan</button>
                </div>
              </form>
    </div>
  )
}

export default EditMitra