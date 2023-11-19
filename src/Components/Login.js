import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    
    const navigate = useNavigate();

    const [form, setForm] = useState({
        user: '',
        password: ''
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
        const baseURL = `https://cors-anywhere.herokuapp.com/http://corenet.usadi.co.id/BaseAPI/User` //Gunakan CORS Anywhere untuk menghidari CORS Policy
        // const baseURL = `http://corenet.usadi.co.id/BaseAPI/User`
        const { user, password } = form
        const params = `${baseURL}?user=${user}&password=${password}`
        axios.get(params)
            .then((res) => {
                console.log('Base URL: ', res)
                if(res.data.code === 1){
                    localStorage.setItem('auth', 1)
                    navigate('/')
                }
            })
            .catch((err) => {
                console.log(err)
            })
        console.log('Base URL: ', baseURL)
    }

    return (
        <div>
            <div className="row justify-content-center mt-4">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                name='user'
                                className="form-control"
                                placeholder='Username'
                                onChange={handleChange}
                                value={form.user}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                name='password'
                                className="form-control"
                                placeholder='Password'
                                onChange={handleChange}
                                value={form.password}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleClick}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
