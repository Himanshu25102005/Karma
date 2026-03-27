'use client'
import api from "@/services/api";
import React, { useState } from 'react'

const page = () => {
    const [form, setform] = useState({
        email: "",
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setform(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await api.signup(form)
            console.log(res)
        }catch(e){
            console.log(e.message);
        }
    };
    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder='Email' value={form.email} onChange={handleChange} />
                <input type="text" name="username" placeholder='Username' value={form.username} onChange={handleChange} />
                <input type="password" name="password" placeholder='Password' value={form.password} onChange={handleChange} />
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default page