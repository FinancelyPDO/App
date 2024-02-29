import { useState, useEffect, useRef } from 'react';
import { useEthereum } from '@/contexts/EthereumContext';

interface ResponseData {
  isMaliciousAddress: boolean;
}
interface ConnectButtonProps {
  onAccountChange: (newAccount: string) => void;
}
const ConnectButton: React.FC<ConnectButtonProps> = ({ onAccountChange }) => {
  const { connect, disconnect, account } = useEthereum();
  const [response, setResponse] = useState<ResponseData>({ isMaliciousAddress: false });
  const [loading, setLoading] = useState(false);
  const isFraudulentRef = useRef(false);

  const handleClick = async () => {
    try {
      const response = await fetch("https://api.harpie.io/v2/validateAddress", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          apiKey: process.env.API_KEY_HARPIE,
          address: account
          //address: "0x55456cbd1f11298b80a53c896f4b1dc9bc16c731"
        })
      });
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(true);
    }
  };

  const handleConnect = () => {
    connect();
  };

  const handleDisconnect = () => {
    disconnect();
    setResponse({ isMaliciousAddress: false });
    setLoading(false);
    isFraudulentRef.current = false;
  };

  useEffect(() => {
    if (account) {
      handleClick();
      onAccountChange(account);
    }
  }, [account]);

  useEffect(() => {
    if (loading) {
      isFraudulentRef.current = response.isMaliciousAddress;
      if (isFraudulentRef.current) {
        alert('Error: The address is fraudulent.');
        handleDisconnect();
      } else {
        alert('The address is not fraudulent.');
      }
    }
  }, [loading]);

  return (
    <div>
      <button
        className="m-2 bg-lavender-600 hover:bg-tiffany_blue text-gray-800 font-bold py-4 px-14 rounded-lg shadow-lg hover:shadow-xl transition duration-150 ease-in-out disabled:opacity-50 disabled:bg-blue-300"
        onClick={account ? handleDisconnect : handleConnect}
        disabled={isFraudulentRef.current}
      >
        {account ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  );
};

export default ConnectButton;