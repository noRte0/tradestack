"use client"

import React, { useState } from 'react'

export default function RegisterPage() {
    const [technique, setTechnique] = useState("");
    const [Contract, setContract] = useState("");
    const [LongShort, setLongShort] = useState("");
    const [Leverage, setLeverage] = useState("");
    const [EntryPrice, setEntryPrice] = useState("");
    const [ExitPrice, setExitPrice] = useState("");
    const [Pip, setPip] = useState("");
    const [Note, setNote] = useState("");
    const [Timeframe, setTimeframe] = useState("");
    const [result, setResult] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!technique || !result) {
            setError("Technique and result are required");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/trade-techniques/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    technique,
                    Contract,
                    LongShort,
                    Leverage,
                    EntryPrice,
                    ExitPrice,
                    Pip,
                    Note,
                    Timeframe,
                    result
                })
            })

            if (res.ok) {
                const form = e.target;
                setError("");
                form.reset();
            } else {
                console.log("Add techniques failed");
            }

        } catch (error) {
            console.log("Error during Add techniques", error);
        }
    }

    return (
        <div className='container mx-auto py-5'>
            <h3>Trade Technique</h3>
            <hr className='my-3' />
            <form onSubmit={handleSubmit}>
                {error && (
                    <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                        {error}
                    </div>
                )}
                <input onChange={(e) => setTechnique(e.target.value)} type="text" className='block bg-gray-300 p-2 my-2 rounded-md' placeholder='Enter technique' /><br />
                <input onChange={(e) => setContract(e.target.value)} type="text" className='block bg-gray-300 p-2 my-2 rounded-md' placeholder='Enter contract' /><br />
                <input onChange={(e) => setLongShort(e.target.value)} type="text" className='block bg-gray-300 p-2 my-2 rounded-md' placeholder='Enter long/short' /><br />
                <input onChange={(e) => setLeverage(e.target.value)} type="text" className='block bg-gray-300 p-2 my-2 rounded-md' placeholder='Enter leverage' /><br />
                <input onChange={(e) => setEntryPrice(e.target.value)} type="text" className='block bg-gray-300 p-2 my-2 rounded-md' placeholder='Enter entry price' /><br />
                <input onChange={(e) => setExitPrice(e.target.value)} type="text" className='block bg-gray-300 p-2 my-2 rounded-md' placeholder='Enter exit price' /><br />
                <input onChange={(e) => setPip(e.target.value)} type="text" className='block bg-gray-300 p-2 my-2 rounded-md' placeholder='Enter pip' /><br />
                <input onChange={(e) => setNote(e.target.value)} type="text" className='block bg-gray-300 p-2 my-2 rounded-md' placeholder='Enter note' /><br />
                <input onChange={(e) => setTimeframe(e.target.value)} type="text" className='block bg-gray-300 p-2 my-2 rounded-md' placeholder='Enter timeframe' /><br />
                <input onChange={(e) => setResult(e.target.value)} type="text" className='block bg-gray-300 p-2 my-2 rounded-md' placeholder='Enter result' /><br />
                <button type='submit' className=' bg-green-500 p-2 rounded-md text-whitw'>Add</button>
            </form>
        </div>
    )
}
