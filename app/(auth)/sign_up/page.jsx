"use client"

import React, { useState } from 'react'

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [error, setError] = useState("");
    //-------------------------------------------------------- 1. common variable//  
    const handleSubmit = async (e) => {  //-handlesubmit (handle error,fetch API)-//

        e.preventDefault();  //-ช่วยให้เราสามารถควบคุมการทำงานของฟอร์มได้เอง โดยไม่ให้เกิดการรีเฟรชหน้าเว็บ-//

        if (password != confirmPassword) {
            setError("Password do not match!");
            return;
        }

        if (!name || !password || !email || !confirmPassword) {
            setError("plese complete all input");
            return;
        }
     //-------------------------------------------------------- 2. variable function for handle error//
        try {
            const res = await fetch("http://localhost:3000/api/auth/signup",{   //-ใช้ฟังก์ชัน fetch เพื่อทำคำร้องขอ (request) แบบ HTTP ไปยัง URL ที่กำหนด - //
                method: "POST",   //-กำหนดว่าคำร้องขอนี้เป็นคำร้องขอแบบ POST ซึ่งใช้สำหรับการส่งข้อมูลใหม่ไปยังเซิร์ฟเวอร์-//
                headers: {
                    "Content-Type": "application/json"   //-กำหนดให้ข้อมูลที่ส่งไปนั้นมีรูปแบบเป็น JSON-//
                },
                body: JSON.stringify({    //-ข้อมูลที่ส่งไปยังเซิร์ฟเวอร์อยู่ในรูปแบบของ JSON สตริง โดยใช้ JSON.stringify เพื่อแปลงออบเจกต์ { name, email, password } ให้เป็นสตริง JSON-//
                    name,
                    email,
                    password
                })
            })

            if (res.ok) {
                const form = e.target;
                setError("");
                form.reset();
            } else {
                console.log("User registration failed")
            }

        } catch (error) {
            console.log("Error during Registration", error);
        }
    }

    //--------------------------------------------------------3. API to api/auth/signup//
    return (
        <div className='container mx-auto py-5'>
            <h3>Sign up</h3>
            <hr className='my-3' />
            <form onSubmit={handleSubmit}>
                {error && (
                    <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                        {error}
                    </div>
                )}
                <input onChange={(e) => setName(e.target.value)} type="text" className='block bg-gray-300 p-2 my-2 rounded-md' placeholder='Enter you name' /><br />
                <input onChange={(e) => setEmail(e.target.value)} type="email" className='block bg-gray-300 p-2 my-2 rounded-md' placeholder='Enter you email' /><br />
                <input onChange={(e) => setPassword(e.target.value)} type="password" className='block bg-gray-300 p-2 my-2 rounded-md' placeholder='Enter you password' /><br />
                <input onChange={(e) => setconfirmPassword(e.target.value)} type="password" className='block bg-gray-300 p-2 my-2 rounded-md' placeholder='Confirm password' /><br />
                <button type='submit' className=' bg-green-500 p-2 rounded-md text-whitw' >sign up</button>
            </form>
        </div>
    )
    //--------------------------------------------------------4. HTML to get input from user//
}