'use client'

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function PageProof(amount:number) {
  const searchParams = useSearchParams();
  const [accessToken, setAccessToken] = useState();
  const [payToken, setPayToken] = useState();
  const [balances, setBalances] = useState(0);

  const code = searchParams.get('code');
  const connection_id = searchParams.get('connection_id');

  console.log("code:" + code);
  console.log("connection_id: " + connection_id);

  useEffect(() => {
    if (code && connection_id) {
      const data = {
        code: code,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET
      };

      fetch(`https://myfreetest-sandbox.biapi.pro/2.0/auth/token/access`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          console.log('Access Token:', data.access_token);
          setAccessToken(data.access_token);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [code, connection_id]);

  function getAccountData() {
    if (code && connection_id) {
      const data = {
        code: code,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET
      };

      fetch(`https://myfreetest-sandbox.biapi.pro/2.0/users/me/transactions?limit=1000`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

  function proofOfReserve() {
    if (code && connection_id) {
      const data = {
        code: code,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET
      };

      fetch(`https://myfreetest-sandbox.biapi.pro/2.0/users/me/accounts`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
      })
        .then(response => response.json())
        .then(data => {
          setBalances(data.balances.EUR);
          console.log(data.balances.EUR);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

  function initiatePayment() {
    if (code && connection_id) {
      const data = {
        grant_type: "client_credentials",
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        scope: "payments:admin"
      };

      fetch(`https://myfreetest-sandbox.biapi.pro/2.0/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          console.log('Pay Token:', data.token);
          setPayToken(data.token);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

  function oneTimePayment() {
    if (code && connection_id) {
      const data = {
        code: code,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET
      };

      fetch(`https://myfreetest-sandbox.biapi.pro/2.0/payments`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + payToken,
          'Content-Type': 'application/json'
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }



  // function initiatePayment() {
  //   // Obtention du jeton d'accès avec le scope "payments:admin"
  //   fetch(`https://myfreetest-sandbox.biapi.pro/2.0/auth/token`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       grant_type: 'client_credentials',
  //       client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
  //       client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  //       scope: 'payments:admin'
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       const accessToken = data.token;
  //       console.log('Access Token for payments:admin scope:', accessToken);

  //       // Une fois que nous avons le jeton d'accès, nous pouvons initier le paiement
  //       fetch(`https://myfreetest-sandbox.biapi.pro/2.0/auth/token`, {
  //         method: 'POST',
  //         headers: {
  //           'Authorization': 'Bearer ' + accessToken,
  //           'Content-Type': 'application/json',
  //         },
  //       })
  //         .then(response => response.json())
  //         .then(data => {
  //           console.log('Payment initiated:', data);
  //           // Gérer la réponse de l'initialisation du paiement ici
  //         })
  //         .catch(error => {
  //           console.error('Error initiating payment:', error);
  //           // Gérer les erreurs d'initialisation du paiement ici
  //         });
  //     })
  //     .catch(error => {
  //       console.error('Error obtaining access token:', error);
  //       // Gérer les erreurs d'obtention du jeton d'accès ici
  //     });
  // }



  return (
    <div className="flex justify-center items-center w-screen h-screen bg-indigo-500 bg-opacity-5">
      <main className="w-[450px] h-[616px] relative">
        <div className="w-[450px] h-[523px] relative top-[53px] bg-white rounded-[20px] border border-indigo-500">
          <div className="flex justify-center">
            <button className="flex justify-center text-[28px] font-bold">
              <span style={{ textDecoration: 'underline', color: 'blue' }}>Hash</span>
            </button>
          </div>
          <div className='flex justify-center mt-10'>
            <Image
              src="/images/proof.png"
              alt="proof"
              width={200}
              height={200}
            />
          </div>
          <div className="left-20 top-[320px] absolute text-center text-slate-800 text-3xl font-bold font-['DM Sans']">Your proof has been <br />generated !</div>
          <button onClick={getAccountData} className="w-[380px] h-[60px] mt-[150px] mx-[35px] bg-indigo-500 rounded-[10px] text-white text-xl font-medium flex justify-center items-center">
            Get data
          </button>
        </div>
      </main>
      <button onClick={proofOfReserve}>Proof of Reserve</button>
      <div>
        {balances}
      </div>
    </div>
  );
}
