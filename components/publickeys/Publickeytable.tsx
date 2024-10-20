'use client'

import { useState } from 'react';

export function Publickeytable() {
    const [publicKeys, setPublicKeys] = useState([
        { chain: "Solana", icon: "/solana.png", keys: ["SolanaKey1", "SolanaKey2", "SolanaKey3"], status: ["Verified", "Pending Verification", "Failed"] },
        { chain: "Polkadot", icon: "/polkadot.png", keys: ["PolkadotKey1", "PolkadotKey2", "PolkadotKey3"], status: ["Verified", "Verified", "Failed"] },
        { chain: "Bitcoin", icon: "/bitcoin.png", keys: ["BitcoinKey1", "BitcoinKey2"], status: ["Verified", "Pending Verification"] },
        { chain: "Arbitrum", icon: "/arbitrum.png", keys: ["ArbitrumKey1", "ArbitrumKey2", "ArbitrumKey3"], status: ["Pending Verification", "Verified", "Failed"] },
        { chain: "Polygon", icon: "/polygon.png", keys: ["PolygonKey1", "PolygonKey2", "PolygonKey3"], status: ["Verified", "Pending Verification", "Failed"] },
    ]);

    const [copiedKeyIndex, setCopiedKeyIndex] = useState<number | null>(null);

    const copyToClipboard = (key: string, index: number) => {
        navigator.clipboard.writeText(key)
            .then(() => {
                setCopiedKeyIndex(index);
                setTimeout(() => {
                    setCopiedKeyIndex(null); 
                }, 2000); 
            })
            .catch(err => console.error('Failed to copy: ', err));
    };

    return (
        <div className="bg-gray-50 rounded-xl shadow-xl overflow-hidden p-8">
            <table className="min-w-full bg-white border-separate border-spacing-y-4 rounded-lg">
                <thead className="bg-gray-100 border-b">
                    <tr>
                        <th className="py-4 px-6 text-left text-xl font-semibold text-gray-800">Chain</th>
                        <th className="py-4 px-6 text-left text-xl font-semibold text-gray-800 w-full">Public Key</th>
                        <th className="py-4 px-6 text-center text-xl font-semibold text-gray-800 w-1/12">Status</th>
                        <th className="py-4 px-6 text-center text-xl font-semibold text-gray-800 w-1/12">Copy</th>
                    </tr>
                </thead>
                <tbody>
                    {publicKeys.map((item, index) => (
                        item.keys.map((key, keyIndex) => (
                            <tr key={keyIndex} className="bg-white hover:bg-gray-50 shadow-sm rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                                {/* Chain Icon */}
                                {keyIndex === 0 ? (
                                    <td className="py-5 px-6 text-gray-900 font-semibold align-top" rowSpan={item.keys.length}>
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={item.icon}
                                                alt={item.chain}
                                                className="w-5 h-5 rounded-full"
                                            />
                                            <span className="text-lg text-gray-800">{item.chain}</span>
                                        </div>
                                    </td>
                                ) : null}

                                {/* Public Key */}
                                <td className="py-5 px-6 font-mono text-gray-800 tracking-wide">
                                    <span className="truncate">{key}</span>
                                </td>

                                {/* Status */}
                                <td className="py-5 px-6 text-center">
                                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                                        item.status[keyIndex] === "Verified"
                                            ? "bg-green-100 text-green-700"
                                            : item.status[keyIndex] === "Failed"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-600"
                                    }`}>
                                        {item.status[keyIndex]}
                                    </span>
                                </td>

                                {/* Copy Button */}
                                <td className="py-5 px-6 text-center">
                                    <button
                                        className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 transition duration-200 ease-in-out"
                                        onClick={() => copyToClipboard(key, keyIndex)}
                                    >
                                        {copiedKeyIndex === keyIndex ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4 4m0 0l4-4m-4 4V3" />
                                            </svg>
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    );
}
