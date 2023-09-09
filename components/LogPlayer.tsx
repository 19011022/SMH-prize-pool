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
  const [link, setLink] = useState<string>()

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


    const recipientPubKey1 = new web3.PublicKey('GrKdExBfhcxLxDkQEBFChLs7Xa55ddmFCchVhsqsvpEe');
    const transaction = new web3.Transaction()

    const sendSolInstruction = web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: recipientPubKey1,
      lamports: LAMPORTS_PER_SOL * winnerFee
    })

    transaction.add(sendSolInstruction)
    try {sendTransaction(transaction, connection).then( sig => {
      setLink(`https://explorer.solana.com/tx/${sig}?cluster=devnet`)
    });
    }catch(e){
      console.log(e)
    }
  }


  return (
        publicKey ?
          <div className="row">
                      {gameStarted && totalPrize && !gameFinished  && (
          <div className="bg-success text-white p-2 my-2 text-center">
            Game Started: Total Prize - {totalPrize}
          </div>
          )}
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr className='text-center'>
                    <th>Public Keys</th>
                  </tr>
                </thead>
                <tbody>
                  {userPublicKeys.map((key, index) => (
                    <tr key={index} className='text-center'>
                      <td className={'text-center' + key == winnerId ? 'text-success': ''}>{key}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          <div className='row mb-5 mx-auto'>
            <div className='col-12 col-md-4 mb-2 mb-md-0 text-center'>
              <button className="btn btn-warning w-100  text-white" onClick={generatePairKeyAndTransfer}  disabled={gameStarted}>Log a Player</button>
            </div>
            {keyPair ? (
               <div className='col-12 col-md-4 mb-2 mb-md-0 text-center'>
               <button className="btn btn-success w-100 p-2" onClick={calculateTotalMoney} disabled={gameStarted}>Start Round</button>
              </div>
            )
            : null
            }
            {gameStarted ? (
              <div className='col-12 col-md-4 mb-2 mb-md-0 text-center'>
               <button className="btn btn-primary w-100 p-2" onClick={finishGame}  disabled={!gameStarted}>Finish Round</button>
              </div>
            ) : null
            }
          </div>

          { gameFinished && winnerFee && (
            <div>
              <div className='table-responsive mt-3'>
              <table className='table'>
                <thead>
                    <tr className='text-center'>
                      <th colSpan={2}>
                        INVOICE
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <td className='text-center w-150px'>
                        Winner Id
                      </td>
                      <td className='text-start'>
                        {winnerId}
                      </td>
                    </tr>
                    <tr>
                      <td className='text-center w-150px'>
                        Server Fee
                      </td>
                      <td className='text-start'>
                        {serverFee}
                      </td>
                    </tr>
                    <tr>
                      <td className='text-center w-150px'>
                        Commission Fee
                      </td>
                      <td className='text-start'>
                        {commissionFee}
                      </td>
                    </tr>
                    <tr>
                      <td className='text-center w-150px'>
                        Owner Fee
                      </td>
                      <td className='text-start'>
                        {ownerFee}
                      </td>
                    </tr>
                    <tr>
                      <td className='text-center w-150px'>
                        Winner Fee
                      </td>
                      <td className='text-start'>
                        {winnerFee}
                      </td>
                    </tr>
                </tbody>
              </table>

              </div>
              <div className='text-primary p-2 text-center'>
                  <a href={link}>View Transaction</a>
              </div>
            </div>
          )}
          </div>
        : <div className='text-primary text-center'>Connect Your Wallet To Continue</div>

  );
}