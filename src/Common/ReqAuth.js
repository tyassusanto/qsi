import React from 'react'
import { Navigate } from 'react-router-dom'

const ReqAuth = ({children}) => {
    let auth = localStorage.getItem('auth')

    if(auth){
        return <Navigate to={'/'}/>
    }
    return children;
}

export default ReqAuth