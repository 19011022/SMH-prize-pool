import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import WalletContextProvider from '../components/WalletContextProvider'
import { AppBar } from '../components/AppBar'
import { LogPlayer } from '../components/LogPlayer'
import { ChangeGameForm } from '../components/ChangeGameForm'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';

const Home: NextPage = (props) => {
  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta
          name="description"
          content="Wallet-Adapter Example"
        />
      </Head>
      <WalletContextProvider>
        <AppBar />
         
        <div className="container mt-5">
          <div className='row'>
            <div className='col-12'>
            <ChangeGameForm></ChangeGameForm>
            </div>
            <div className='col-12'>
            <LogPlayer></LogPlayer>
            </div>
          </div>
        </div>
      </WalletContextProvider>
    </div>
  );
}

export default Home;
