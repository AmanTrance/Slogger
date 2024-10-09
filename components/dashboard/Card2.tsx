export function Card2() {
    const chains = [
      { id: 1, name: 'Solana', chainId: '0x1' },
      { id: 2, name: 'Polkadot', chainId: '0x89' },
      { id: 3, name: 'Wormhole', chainId: '0x38' },
    ];
  
    return (
      <div className="bg-white shadow-lg rounded-lg p-4 w-full sm:w-64 lg:w-72 mx-auto lg:ml-auto mt-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Chains Used</h2>
        <ul className="divide-y divide-gray-200">
          {chains.map((chain) => (
            <li key={chain.id} className="py-3">
              <p className="text-gray-600">{chain.name}</p>
              <p className="text-xs text-gray-400">Chain ID: {chain.chainId}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  