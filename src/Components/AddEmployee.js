import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const AddEmployee = () => {
    const generateId = uuidv4();
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        id: generateId,
        nama: '',
        nip: '',
        jabatan: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleClick = () => {
        axios.post(`https://cors-anywhere.herokuapp.com/http://corenet.usadi.co.id/BaseAPI/Pegawai`, form)
            .then((res) => {
                console.log(res.data)
                const resColumns = res.data.columns;
                const resRows = res.data.rows;
                setColumns(resColumns);
                setRows(resRows);
            })
            .catch((err) => {
                console.log(err)
            }, [])
    }

    return (
        <div className='container my-3'>
            <div>
                <div>
                    <table className="custom-table">
                        <thead>
                            <tr>
                                {columns.map((column, index) => (
                                    <th key={index} style={{ width: `${column.width}%` }}>
                                        {column.caption}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, id) => (
                                <tr key={id}>
                                    <th>{row.nama}</th>
                                    <th>{row.nip}</th>
                                    <th>{row.jabatan}</th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn btn-primary my-3" onClick={() => navigate('/')}>Kembali</button>
                </div>
                {rows.length <= 4 && (
                    <div className="row justify-content-center mt-4">
                        <div className="col-md-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Id</label>
                                    <input
                                        type="text"
                                        name='id'
                                        className="form-control"
                                        placeholder={generateId}
                                        onChange={handleChange}
                                        value={form.id}
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Nama</label>
                                    <input
                                        type="text"
                                        name='nama'
                                        className="form-control"
                                        placeholder='Nama'
                                        onChange={handleChange}
                                        value={form.nama}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">NIP</label>
                                    <input
                                        type="text"
                                        name='nip'
                                        className="form-control"
                                        placeholder='NIP'
                                        onChange={handleChange}
                                        value={form.nip}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Jabatan</label>
                                    <input
                                        type="text"
                                        name='jabatan'
                                        className="form-control"
                                        placeholder='Jabatan'
                                        onChange={handleChange}
                                        value={form.jabatan}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={handleClick}>Tambah</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AddEmployee
