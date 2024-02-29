import { useState, useEffect } from 'react';
import { useEthereum } from '@/contexts/EthereumContext';

const ConnectButton: React.FC = () => {
  const { connect, disconnect, account } = useEthereum();
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  let isFraudulent = false;

  const handleClick = async () => {
    console.log('handleClick');
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
    console.log('account', account);
  };

  const handleDisconnect = () => {
    console.log('account', account);
    disconnect();
    setResponse({});
    setLoading(false);
    isFraudulent = false;
  };

  useEffect(() => {
    if (account) {
      handleClick();
    }
  }, [account]);

  useEffect(() => {
    if (loading) {
      isFraudulent = response.isMaliciousAddress;
      if (isFraudulent) {
        alert('Error: The address is fraudulent.');
        console.log('response', response.isMaliciousAddress);
        console.log(isFraudulent);
        handleDisconnect();
      }
     else {
      alert('The address is not fraudulent.');
      console.log('account is fr', account);
      console.log('response', response.isMaliciousAddress);
      console.log(isFraudulent);
    }
  }
  }, [loading]);

  return (
    <div>
      <button
        className="m-2 bg-lukso-pink text-white font-bold py-2 px-4 rounded"
        onClick={account ? handleDisconnect : handleConnect}
        disabled={isFraudulent}
      >
        {account ? 'Disconnect' : 'Connect'}
      </button>

      {/* {loading && <div>Loading...</div>} */}
    </div>
  );
};

export default ConnectButton;