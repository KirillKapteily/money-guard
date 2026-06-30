import styles from "../styles/logout.module.scss";
import cont from "../styles/body.module.scss";

export default function Logout({ loggingout, setIsLoggedIn }) {
  const logout = () => {
    setIsLoggedIn(false);
    loggingout(false);
  };

  return (
    <>
        <div className={styles.logout__background}>
      <div className={cont.container}>
          <div className={styles.logout__backdrop}>
            <div className={styles.logo__wrapper}>
              <img src="./mglogo.svg" alt="logo" width="27" />
              <p className={styles.title}>Money Guard</p>
            </div>

            <p className={styles.logout__text}>
              Are you sure you want to log out?
            </p>

            <div className={styles.btn__wrapper}>
              <button onClick={() => logout()} className={styles.active__btn}>
                Logout
              </button>
              <button
                onClick={() => loggingout(false)}
                className={styles.not__active__btn}
              >
                cancel
              </button>
            </div>
          </div>
      </div>
        </div>
    </>
  );
}
