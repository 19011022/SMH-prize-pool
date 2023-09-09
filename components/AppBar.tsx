import { FC } from 'react'
import styles from '../styles/Home.module.css'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Image from 'next/image'

export const AppBar: FC = () => {
    return (
        <div className={styles.AppHeader}>
            <Image src="/solanaLogo.png" height={25} width={150} />
            <div className='text-center header-title'>Prize Pool Admin Panel</div>
            <WalletMultiButton/>
        </div>
    )
}