import React from 'react'
import styles from './Header.module.css'

const Header =() => {

return(
    <div className={styles.container}>
    <div>
        <div className={styles.beer}></div>
    </div>
        <h1 className={styles.fuente}>WELCOME</h1>
    </div>
)


}

export default Header;