import styles from "../styles/logout.module.scss"

export default function Logout({ loggingout, setIsLoggedIn }) {

const logout = () =>{
    setIsLoggedIn(false);
loggingout(false);
}

    return (
        <div className={styles.logout__background}>
            <div className={styles.logout__backdrop}>
                <img src="./mglogo.svg" alt="logo" />
                <p className={styles.title}>Money Guard</p>

<p className={styles.logout__text}>Are you sure you want to log out?</p>

                <div className={styles.btn__wrapper}>
                    <button onClick={() => logout()} className={styles.active__btn}>Logout</button>
                    <button onClick={() => loggingout(false)} className={styles.not__active__btn}>cancel</button>
                </div>
            </div>
        </div>
    )
}