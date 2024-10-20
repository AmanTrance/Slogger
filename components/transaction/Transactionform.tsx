'use client'

import { useEffect, useRef, useState } from "react";

export function Transactionform() {
    const [showPopup, setShowPopup] = useState(false); 
    const [isOpen, setIsOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState(""); 
    const [activeTab, setActiveTab] = useState(1); 
    const [selectedTransactionType, setSelectedTransactionType] = useState("");
    const [selectedChain, setSelectedChain] = useState("Select"); 
    const dropdownRef = useRef<HTMLDivElement>(null);

    const publicKeys = ["Key1", "Key2", "Key3"];

    const handleSelectKey = (key: string) => {
        setSelectedKey(key);
        setShowPopup(false); 
    };


    const handleNext = () => {
        if (activeTab < 4) setActiveTab(activeTab + 1);
    };

   
    const handlePrevious = () => {
        if (activeTab > 1) setActiveTab(activeTab - 1);
    };

    const tabs = [
        { label: 'Public Key', 
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
          </svg>, 
            text: 'Chain and Public Key' },
        { label: 'Transaction Type', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
      </svg>, text: 'Type of Transaction' },
        { label: 'NFT', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>, text: 'Your Data (NFT)' },
        { label: 'Key', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
      </svg>, text: 'Receiver Public Key' }
    ];

    const chains = [
        { name: 'Solana', icon:<img
            src="/solana.png"
            alt="Solana"
            width={24}
            height={24}
        /> },
        { name: 'Polkadot', icon: <img
            src="/polkadot.png"
            alt="polkadot"
            width={24}
            height={24}
        /> },
        { name: 'Bitcoin', icon:  <img
            src="/bitcoin.png"
            alt="bitcoin"
            width={24}
            height={24}
        />},
        { name: 'Arbitrum', icon: <img
            src="/arbitrum.png"
            alt="arbitrum"
            width={24}
            height={24}
        />}, 
        { name: 'Polygon', icon: <img
            src="/polygon.png"
            alt="polygon"
            width={24}
            height={24}
        />},
    ];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const selectChain = (chain: { name: string }) => {
        setSelectedChain(chain.name);
        setIsOpen(false);
    };

    return (
        <div className="w-full h-screen flex items-start justify-center pt-8">
        {/* Card Container */}
            <div className="w-full max-w-5xl mt-10 bg-white p-2 rounded-t-2xl shadow-md">
            {/* Top Navigation Buttons */}
            <div className="flex items-start justify-center mb-4 space-x-0">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    className={`flex-1 text-lg font-medium transition-colors duration-300 shadow-md 
                                ${activeTab === index + 1 ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'} 
                                ${index === 0 ? '' : ''} 
                                ${index === 3 ? '' : ''}`}
                    onClick={() => setActiveTab(index + 1)}
                >
                    <div className="flex flex-col items-center px-6 py-3">
                        {/* Tab Icon */}
                        <div className="text-2xl mb-2">
                            {tab.icon}
                        </div>
                        {/* Tab Text */}
                        <span className="block whitespace-nowrap">
                            {tab.text}
                        </span>
                    </div>

                    {/* Current Tab Indicator */}
                    {activeTab === index + 1 && (
                        <div className="mt-1 h-1 w-full bg-[#d7fe03] rounded-t-md"></div>
                    )}
                </button>
            ))}
        </div>

                {/* Content for Each Tab */}
                <div className="mt-4 ">
                    {activeTab === 1 && (
                        <div className="relative flex flex-col space-y-4"> 
                       
                        <div className="flex items-center">
                            <label className="p-4 text-lg font-bold">Chain</label>
                            <button
                            type="button"
                            className="flex items-center justify-center bg-[#F5F5F8] text-black px-8 py-2 rounded-lg shadow-lg"
                            onClick={() => setIsOpen(!isOpen)}
                            >
                            <span className="text-md">{selectedChain}</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="ml-2 w-4 h-4"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                            </button>

                                {/* Dropdown Menu */}
                                {isOpen && (
                                <div className="absolute top-14 left-16 z-10 w-60 bg-white rounded-lg shadow-lg transition-all duration-300 ease-out">
                                    <ul className="py-2">
                                    <li
                                        className="flex items-center px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
                                        onClick={() => selectChain({ name: 'Select' })}
                                    >
                                        <span className="mr-2 text-md">Select</span>
                                    </li>
                                    {chains.map((chain, index) => (
                                        <li
                                        key={index}
                                        className="flex items-center px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
                                        onClick={() => selectChain(chain)}
                                        >
                                        <span className="mr-2">{chain.icon}</span>
                                        <span className="text-md">{chain.name}</span>
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                )}
                            </div>

                   
                    <div className="flex items-center">
                        <label className="p-4 text-lg font-bold">Public Key</label>
                        <button
                        type="button"
                        className="flex items-center justify-center bg-[#F5F5F8] text-black px-8 py-2 rounded-lg shadow-lg"
                        onClick={() => setShowPopup(true)}
                        >
                        <span className="text-md">Select</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="ml-2 w-4 h-4"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                        </button>

                        
                    </div>
                    </div>
                )}
                

                {activeTab === 2 && (
                <div>
                    <div className="flex flex-col space-y-4 mt-4">
                    <button
                        onClick={() => {
                        setActiveTab(3);
                        setSelectedTransactionType("message");
                        }}
                        className="w-full max-w-xs mx-auto py-3 px-6 text-lg font-semibold text-black border-2 border-black rounded-lg transition-colors duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                    >
                        Message
                    </button>
                    
                    <button
                        onClick={() => {
                        setActiveTab(3);
                        setSelectedTransactionType("coins");
                        }}
                        className="w-full max-w-xs mx-auto py-3 px-6 text-lg font-semibold text-black border-2 border-black rounded-lg transition-colors duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                    >
                        Coins
                    </button>
                    
                    <button
                        onClick={() => {
                        setActiveTab(3);
                        setSelectedTransactionType("nft");
                        }}
                        className="w-full max-w-xs mx-auto py-3 px-6 text-lg font-semibold text-black border-2 border-black rounded-lg transition-colors duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
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
                            rows={1} 
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
                            className="bg-[#83af3b] text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
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
