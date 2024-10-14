'use client'

import { useState } from 'react';

export function Publickeytable() {
    const [publicKeys, setPublicKeys] = useState([
        { key: "Key1", status: "Waiting" },
        { key: "Key2", status: "Waiting" },
        { key: "Key3", status: "Waiting" },
    ]);

    

    return (
        <div className="bg-white rounded-md shadow-md">
            <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
                <thead className="bg-[#d7fe03]">
                    <tr>
                        <th className="py-4 px-6 text-left text-xl font-bold" colSpan={3}>
                            Your Public Keys
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {publicKeys.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100">
                            <td className="py-3 px-6 w-[90%]">{item.key}</td>
                            <td className={`py-3 px-6 w-[7%] ${item.status === "Verified" ? "text-[#83af3b]" : item.status === "Loading Failed" ? "text-red-500" : "text-yellow-500"}`}>
                                {item.status}
                            </td>
                            <td className="py-3 px-0 text-center w-[3%]">
                                <button 
                                    
                                    className="text-blue-500 hover:text-blue-700 transition duration-200">
                                    <img
                                        src="/copyicon.png" 
                                        alt="Copy"
                                        className="w-5 h-5"
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
