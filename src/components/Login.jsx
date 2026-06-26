import styles from "../styles/login.module.scss";
import cont from "../styles/body.module.scss";

export default function Login({
  userEmail,
  userPassword,
  setUserEmail,
  setUserPassword,
  setIsLoggedIn,
  isLoggedIn,
  submit,
  setIsRegistering,
}) {
  return (
    <div className={cont.container}>
      <div className={styles.login__background}>
        <div className={styles.login__backdrop}>
          <img src="./mglogo.svg" alt="logo" />
          <p className={styles.title}>Money Guard</p>
          <form onSubmit={submit} className={styles.login__form}>
            <div className={styles.input__wrapper}>
              <svg className={styles.email}>
                <use
                  href="./symbol-defs-k.svg#icon-email"
                  width="24"
                  height="24"
                ></use>
              </svg>
              <input
                type="email"
                placeholder="E-mail"
                className={styles.input}
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>

            <div className={styles.input__wrapper}>
              <svg className={styles.lock}>
                <use
                  href="./symbol-defs-k.svg#icon-lock"
                  width="24"
                  height="24"
                ></use>
              </svg>
              <input
                type="password"
                placeholder="password"
                className={styles.input}
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </div>
            <div className={styles.btn__wrapper}>
              <button type="submit" className={styles.active__btn}>
                Log In
              </button>
              <button
                onClick={() => setIsRegistering(true)}
                className={styles.not__active__btn}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
