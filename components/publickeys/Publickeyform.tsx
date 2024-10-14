export function Publickeyform() {
    return (
        <div className="bg-white rounded-md shadow-md">
            <form>
                <label className="block w-full px-4 pt-4 bg-black rounded-t-md text-2xl font-bold text-white">
                    Add Public Key
                </label>
                <div>
                    <textarea
                        className="w-full border-x-4 border-pink-500 rounded-md p-3"
                        placeholder="Enter public key here"
                        rows={4}
                    />
                </div>
                <div className="flex justify-start ml-2">
                    <button
                        style={{ backgroundColor: '#d7fe03' }}
                        className="text-black font-semibold py-2 px-10 rounded-md shadow hover:bg-green-900 transition duration-200"
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}
