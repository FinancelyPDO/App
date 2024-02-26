import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our Proof Document Selector</h1>
      <div className="max-w-md p-8 bg-white rounded-lg shadow-md">
        <p className="text-lg mb-4">What type of proof do you need?</p>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Proof of Funds</h2>
          <p className="mb-4">
            Proof of funds is a document that shows you have the capital required to make a specific purchase, such as buying a home. It can be a bank statement, a letter from your bank or other financial institution, or other documents.
          </p>
          <Link href="/page-amount">
            <button className="block bg-indigo-500 text-white px-4 py-2 rounded-md text-center hover:bg-indigo-600">
              Select
            </button>
          </Link>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Income Verification</h2>
          <p className="mb-4">
            Income verification is a document that confirms the income of a person. It can be used for various purposes, such as applying for a loan or a rental property. The document may include pay stubs, a letter from an employer, or a tax return.
          </p>
          <Link href="/page-amount">
            <button className="block bg-blue-500 text-white px-4 py-2 rounded-md text-center hover:bg-blue-600">
              Select
            </button>
          </Link>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Proof of Address</h2>
          <p className="mb-4">
            Proof of address is a document that shows your current address. It can be used for various purposes, such as opening a bank account, applying for a loan, or verifying your identity. The document may include a utility bill, a bank statement, or a lease agreement.
          </p>
          <Link href="/page-amount">
            <button className="block bg-green-500 text-white px-4 py-2 rounded-md text-center hover:bg-green-600">
              Select
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}