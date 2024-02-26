import React from 'react';

export default function PageAmount() {
  // The URL to navigate to
  const authUrl = 'https://myfreetest-sandbox.biapi.pro/2.0/auth/webview/connect?client_id=10916951&redirect_uri=http://localhost:3000/PageProof';
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Generate a Proof of Bank Account Balance</h1>
      <div className="max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="balance" className="block text-lg font-semibold mb-2">Balance</label>
          <input type="text" id="balance" name="balance" placeholder="$5000" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg" />
        </div>

        {/* Use an <a> tag for external navigation */}
        <a href={authUrl} className="block bg-indigo-500 text-white px-6 py-3 rounded-md text-center hover:bg-indigo-600 text-lg font-semibold">
          Generate Proof
        </a>

      </div>
    </div>
  );
}