export default function TransactionHistory() {
  const transactions = [
    { id: 1, date: '2024-10-01', description: 'Person 1', amount: '-$120.00', type: 'debit' },
    { id: 2, date: '2024-09-29', description: 'Person 2', amount: '+$5000.00', type: 'credit' },
    { id: 3, date: '2024-09-25', description: 'Person 3', amount: '-$150.00', type: 'debit' },
    { id: 4, date: '2024-09-22', description: 'Person 4', amount: '+$800.00', type: 'credit' },
    { id: 5, date: '2024-09-19', description: 'Person 5', amount: '-$15.99', type: 'debit' },
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-full sm:w-64 lg:w-72 mx-auto lg:ml-auto mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Transaction History</h2>
      <ul className="divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="py-3 flex justify-between items-center">
            <div className="text-gray-600">
              <p className="text-sm font-semibold">{transaction.description}</p>
              <p className="text-xs">{transaction.date}</p>
            </div>
            <div
              className={`text-sm font-semibold ${
                transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {transaction.amount}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
