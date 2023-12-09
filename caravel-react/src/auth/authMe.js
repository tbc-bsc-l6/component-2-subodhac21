import axios from 'axios';
import React, { useEffect } from 'react'

const authMe = () => {
    let url = "http://127.0.0.1:8000/api/authme";
    useEffect(()=>{
        axios.get(url).then((response)=>{
            console.log(response);
        });
    },[]);
 
}

export default authMe
