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
        <title>Prize Pool Admin Panel</title>
        <meta
          name="description"
          content="Prize Pool Admin Panel"
        />
      </Head>
      <WalletContextProvider>
        <AppBar />
         
        <div className="container mt-5 mx-auto">
          <div className='row'>
            <div className='col-12 mb-3'>
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
