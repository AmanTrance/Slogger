export function Card3() {
    const publicKeys = [
      { chain: 'Solana', publicKey: '0xAbc...1234', active: true },
      { chain: 'Polkadot', publicKey: '0xDef...5678', active: false },
      { chain: 'Wormhole', publicKey: '0xGhi...9101', active: true },
    ];
  
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-3/4 mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Public Keys</h2>
        <ul className="divide-y divide-gray-200">
          {publicKeys.map((key, index) => (
            <li key={index} className="py-4 flex justify-between items-center">
              <div className="text-gray-600">
                <p className="text-lg font-semibold">{key.chain}</p>
                <p className="text-sm">{key.publicKey}</p>
              </div>
              <div
                className={`text-sm font-semibold ${
                  key.active ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {key.active ? 'Active' : 'Inactive'}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  