import * as web3 from '@solana/web3.js'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { FC,useEffect,useState, } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


export const LogPlayer:  FC = () => {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const [totalPrize, setTotalPrize]= useState<number>()
  const [winnerId, setWinnerId]= useState<string>()
  const [serverFee, setServerFee]= useState<number>()
  const [commissionFee, setCommissionFee]= useState<number>()
  const [winnerFee, setWinnerFee]= useState<number>()
  const [ownerFee, setOwnerFee]= useState<number>()

  const serverPay = 4
  const commission = 2

  const [userPublicKeys, setUserPublicKeys] = useState<string[]>([])
  const [keyPair, setKeyPair] = useState<web3.PublicKey | null>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)

  const generatePairKeyAndTransfer = async (event)  => {
    event.preventDefault();
    // Generate a pair key using web3.js (you'll need to implement this)
    const newKeyPair = web3.Keypair.generate().publicKey; // Replace with actual implementation
    setKeyPair(newKeyPair);

    // Update the list of public keys
    setUserPublicKeys([...userPublicKeys, newKeyPair.toString()]);

    const recipientPubKey = new web3.PublicKey('GrKdExBfhcxLxDkQEBFChLs7Xa55ddmFCchVhsqsvpEe');
    const transaction = new web3.Transaction()

    const game = JSON.parse(localStorage.getItem('game'));
    const sendSolInstruction = web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: recipientPubKey,
      lamports: LAMPORTS_PER_SOL * game.entryFee
    })

    transaction.add(sendSolInstruction)
    sendTransaction(transaction, connection);
  };

  useEffect(() => {
    localStorage.setItem('publicKeys', JSON.stringify(userPublicKeys));
  }, [userPublicKeys]);

  const calculateTotalMoney = event =>{
    event.preventDefault();

    const game = JSON.parse(localStorage.getItem('game'));
    const totalKey = JSON.parse(localStorage.getItem('publicKeys')).length

    setTotalPrize(game.entryFee * totalKey)
    setGameStarted(true)
  }

  const finishGame = event =>{
    event.preventDefault();

    const game = JSON.parse(localStorage.getItem('game'));
    
    const winnerPlayer = Math.floor(Math.random() * userPublicKeys.length)
    setWinnerId(userPublicKeys[winnerPlayer])


    setCommissionFee(totalPrize * commission / 100)
    setServerFee(totalPrize * serverPay / 100)
    setOwnerFee(totalPrize * game.creatorShare / 100)

    setWinnerFee(totalPrize - commissionFee - serverFee - ownerFee)
    setGameFinished(true)
  }


  return (
        publicKey ?
          <div className="row">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr className='text-center'>
                    <th>Public Keys</th>
                  </tr>
                </thead>
                <tbody>
                  {userPublicKeys.map((key, index) => (
                    <tr key={index}>
                      <td className='text-center'>{key}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          <div className='row'>
            <div className='col-4 text-center'>
              <button className="btn btn-warning w-100 p-2 text-white" onClick={generatePairKeyAndTransfer}  disabled={gameStarted}>Log a Player</button>
            </div>
            <div className='col-4 text-center'>
              <button className="btn btn-success w-100 p-2" onClick={calculateTotalMoney} disabled={gameStarted}>Start Round</button>
            </div>
            <div className='col-4 text-center'>
              <button className="btn btn-primary w-100 p-2" onClick={finishGame}  disabled={!gameStarted}>Finish Round</button>
            </div>
          </div>
          {gameStarted && totalPrize && (
        <div className="bg-success text-white p-2 mt-3">
          Game Started: Total Prize - {totalPrize}
        </div>
        )}
        
          </div>
        : <div className='text-primary text-center'>Connect Your Wallet To Continue</div>

  );
}