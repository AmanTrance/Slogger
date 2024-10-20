'use client'
import React, { useState, useRef, useEffect } from 'react';

interface Chain {
    name: string;
    icon: string;
}

export function Publickeyform() {
    const chains: Chain[] = [
        { name: 'Solana', icon: '/solana.png' },
        { name: 'Polkadot', icon: '/polkadot.png' },
        { name: 'Bitcoin', icon: '/bitcoin.png' },
        { name: 'Arbitrum', icon: '/arbitrum.png' },
        { name: 'Polygon', icon: '/polygon.png' },
    ];

    const [selectedChain, setSelectedChain] = useState<string>('');
    const [publicKey, setPublicKey] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleDropdownToggle = () => {
        setIsOpen((prev) => !prev);
    };

    const handleChainSelect = (chain: string) => {
        setSelectedChain(chain);
        setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`Selected Chain: ${selectedChain}, Public Key: ${publicKey}`);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-gray-50 rounded-lg shadow-lg max-w-md mx-auto p-6">
            <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Add Public Key</h2>
                <div className="relative mb-4" ref={dropdownRef}>
                    <button
                        type="button"
                        className="w-full border border-gray-300 rounded-md p-3 text-left flex items-center bg-white hover:border-pink-500 transition duration-200"
                        onClick={handleDropdownToggle}
                    >
                        {selectedChain ? (
                            <>
                                <img
                                    src={chains.find((chain) => chain.name === selectedChain)?.icon}
                                    alt={selectedChain}
                                    width={24}
                                    height={24}
                                    className="mr-2"
                                />
                                <span className="text-gray-700">{selectedChain}</span>
                            </>
                        ) : (
                            <span className="text-gray-400">Select a Chain</span>
                        )}
                    </button>
                    {isOpen && (
                        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-1 shadow-md">
                            {chains.map((chain, index) => (
                                <li
                                    key={index}
                                    className="flex items-center p-2 hover:bg-gray-200 cursor-pointer transition duration-200"
                                    onClick={() => handleChainSelect(chain.name)}
                                >
                                    <img src={chain.icon} alt={chain.name} width={24} height={24} className="mr-2" />
                                    <span className="text-gray-700">{chain.name}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <textarea
                        className="w-full border border-gray-300 rounded-md p-3 resize-none bg-white text-gray-700 focus:outline-none focus:border-pink-500 transition duration-200"
                        placeholder="Enter public key here"
                        rows={4}
                        value={publicKey}
                        onChange={(e) => setPublicKey(e.target.value)}
                    />
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:opacity-80 transition duration-200"
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}
