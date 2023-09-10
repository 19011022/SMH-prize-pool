import { FC } from 'react'
import styles from '../styles/Home.module.css'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Image from 'next/image'

export const AppBar: FC = () => {
    return (
        <div className={styles.AppHeader}>
            <Image src="/DOAL Logo Beyaz.png" height={50} width={50} />
            <div className='text-center header-title'>Prize Pool Admin Panel</div>
            <WalletMultiButton/>
        </div>
    )
}