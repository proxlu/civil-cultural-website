/* ----------- RESOURCES ----------- */
import Image from 'next/image'

/* ----------- STYLES ----------- */
import styles from 'Components/Header/styles.module.scss'

export function Logo() {
  return (
    <div className={styles.logoContainer}>
      <Image
        src='/civilcultural.png'
        alt='Logo Civil Cultural'
        width={40}
        height={40}
        objectFit='cover'
      />
      <p className={styles.typography}>
        Civil Cultural
      </p>
    </div >
  )
}