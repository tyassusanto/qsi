import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../index.css'
import { useNavigate } from 'react-router-dom'


const Main = () => {
    const navigate = useNavigate();
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios.get(`http://corenet.usadi.co.id/BaseAPI/Pegawai`)
            // axios.get(`https://cors-anywhere.herokuapp.com/http://corenet.usadi.co.id/BaseAPI/Pegawai`)
            .then((res) => {
                const resColumns = res.data.columns;
                const resRows = res.data.rows;
                setColumns(resColumns);
                setRows(resRows);
                console.log(res.data)

            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleLogOut = () => {
        localStorage.clear();
        navigate('/login');

    }

    return (
        <div className='container py-3'>
            <div className="row">
                <div>
                    <button onClick={handleLogOut} className='btn btn-danger mb-3'>Logout</button>
                </div>
                <div>
                    <button onClick={()=>navigate('/AddEmployee')} className='btn btn-success mb-3'>Tambah Pegawai</button>
                </div>
            </div>
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
        </div>
    )
}

export default Main
