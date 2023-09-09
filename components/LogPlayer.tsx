import * as web3 from '@solana/web3.js'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { FC,useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const LogPlayer:  FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [userPublicKeys, setUserPublicKeys] = useState<string[]>([]);
  const [txSig, settxSig] = useState('');
  const [txSigS, settxSigS] = useState<string[]>([]);
  const [keyPair, setKeyPair] = useState<web3.PublicKey | null>(null);

  const generatePairKeyAndTransfer = event  => {
    event.preventDefault();
    // Generate a pair key using web3.js (you'll need to implement this)
    const newKeyPair = web3.Keypair.generate().publicKey; // Replace with actual implementation
    setKeyPair(newKeyPair);

    const recipientPubKey = newKeyPair;
    const transaction = new web3.Transaction()

    const game = JSON.parse(localStorage.getItem('game'));
    const sendSolInstruction = web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: recipientPubKey,
      lamports: LAMPORTS_PER_SOL * game.entryFee
    })

    transaction.add(sendSolInstruction)
    sendTransaction(transaction, connection).then(sig => {
        settxSig(sig)
    })
    
    settxSigS([...txSigS,txSig])


     // Update the list of public keys
     setUserPublicKeys([...userPublicKeys, newKeyPair.toString()]);

     // Save the updated public keys to local storage
     localStorage.setItem('publicKeys', JSON.stringify(userPublicKeys));
  };


  return (
        publicKey ?
          <div className="row">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Public Keys</th>
                  </tr>
                </thead>
                <tbody>
                  {userPublicKeys.map((key, index) => (
                    <tr key={index}>
                      <td>{key}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3">
              <button className="btn btn-success" onClick={generatePairKeyAndTransfer}>Log a Player</button>
            </div>
          </div>
        : <div className='text-primary text-center'>Connect Your Wallet To Continue</div>

  );
}