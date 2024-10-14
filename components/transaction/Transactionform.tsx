'use client'

import { useState } from "react";

export function Transactionform() {
    const [showPopup, setShowPopup] = useState(false); 
    const [selectedKey, setSelectedKey] = useState(""); 
    const [activeTab, setActiveTab] = useState(1); 
    const [selectedTransactionType, setSelectedTransactionType] = useState("");


    const publicKeys = ["Key1", "Key2", "Key3"];

    const handleSelectKey = (key: string) => {
        setSelectedKey(key);
        setShowPopup(false); 
    };


    const handleNext = () => {
        if (activeTab < 4) setActiveTab(activeTab + 1);
    };

    // Move to the previous tab
    const handlePrevious = () => {
        if (activeTab > 1) setActiveTab(activeTab - 1);
    };


    return (
        <div className="w-full h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex items-start justify-center pt-8">
        {/* Card Container */}
            <div className="w-full max-w-3xl mt-10 bg-white p-6 rounded-t-2xl shadow-md">
            {/* Top Navigation Buttons */}
                <div className="flex item-start justify-center mb-4 space-x-0">
                    {["Sender Public Key", "Type of Transaction", "Your Data", "Receiver Public Key"].map((label, index) => (
                        <button
                            key={index}
                            className={`flex-1 text-lg font-medium transition-colors duration-300 shadow-md 
                                        ${activeTab === index + 1 ? 'bg-gradient-to-r from-gray-600 to-gray-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'} 
                                        ${index === 0 ? 'rounded-l-full' : ''} 
                                        ${index === 3 ? 'rounded-r-full' : ''}`}
                            onClick={() => setActiveTab(index + 1)}
                        >
                            <span className="block whitespace-nowrap px-6 py-3">
                                {label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Content for Each Tab */}
                <div className="mt-4">
                    {activeTab === 1 && (
                        <div>
                        
                            <button
                                type="button"
                                className="flex items-center justify-center bg-gradient-to-r from-pink-600 to-pink-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gradient-to-l transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                                onClick={() => setShowPopup(true)}
                            >
                                <span className="text-lg">Select Public Key</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 ml-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12l7 7m-7-7l7-7" />
                                </svg>
                            </button>
                        
                    
                            {selectedKey && (
                                
                                <div className="mt-4">Selected Key: {selectedKey}</div>
                            )}
                        </div>
                    
                    
                    )}

                {activeTab === 2 && (
                <div>
                    <h2 className="text-2xl font-bold mt-6 text-left">Type of Transaction</h2>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => {
                                setActiveTab(3); 
                                setSelectedTransactionType("message"); 
                            }}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                        >
                            Message
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab(3); 
                                setSelectedTransactionType("coins"); 
                            }}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition duration-300"
                        >
                            Coins
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab(3); 
                                setSelectedTransactionType("nft"); 
                            }}
                            className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-600 transition duration-300"
                        >
                            NFT
                        </button>
                    </div>
                </div>
            )}

                {activeTab === 3 && (
                    <div>
                        <h2 className="text-2xl font-bold mt-6 text-left">Your Data</h2>
                        {selectedTransactionType === "message" && (
                            <textarea
                                className="w-full border rounded-md p-2"
                                placeholder="Enter your message here..."
                                rows={4}
                            />
                        )}
                        {selectedTransactionType === "coins" && (
                            <input
                                type="number"
                                className="w-full border rounded-md p-2"
                                placeholder="Enter amount in cryptocurrency"
                            />
                        )}
                        {selectedTransactionType === "nft" && (
                            <div className="flex flex-col">
                                <label className="mb-2">Upload an image, video, or audio:</label>
                                <input type="file" className="border rounded-md p-2" />
                            </div>
                        )}
                    </div>
                )}


                {activeTab === 4 && (
                    <div>
                        
                        <p className="mt-4 text-left">Please paste the receiver's public key below:</p>
                        <textarea
                            className="w-full border rounded-md p-3 resize-none"
                            placeholder="Paste the receiver's public key here..."
                            rows={4} 
                        />
                    </div>
                )}

                </div>
                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                        <button
                            onClick={handlePrevious}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition duration-300"
                            disabled={activeTab === 1} 
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNext}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                            disabled={activeTab === 4} 
                        >
                            Next
                        </button>
                    </div>
                
            </div>
            

        {/* Popup for selecting public keys */}
        {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                <div className="w-3/5 bg-white p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Select a Public Key</h3>
                    <ul>
                        {publicKeys.map((key) => (
                            <li key={key} className="mb-2">
                                <label className="flex items-center">
                                    {key}
                                    <button
                                        className="ml-2 border p-1 rounded"
                                        onClick={() => {
                                            handleSelectKey(key);
                                            setActiveTab(2);
                                        }}
                                        
                                    >
                                        <img
                                            src="/selectpubkeyicon.png"
                                            alt="Select Public Key"
                                            width={24}
                                            height={24}
                                        />
                                    </button>
                                </label>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="mt-4 bg-red-500 text-white p-2 rounded"
                        onClick={() => setShowPopup(false)} 
                    >
                        Close
                    </button>
                </div>
            </div>
        )}
    </div>
    );
}
