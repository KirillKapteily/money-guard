import styles from "../styles/register.module.scss";
import cont from "../styles/body.module.scss";

//register.moduler
export default function Register({
  setIsRegistering,
  handleRegister,
  setUsername,
  setUserPassword,
  setUserEmail,
  setUserPasswordCkeck,
  validatePassword,
}) {
  return (
    <div className={cont.container}>
      <div className={styles.reg__background}>
        <div className={styles.reg__backdrop}>
          <img src="./mglogo.svg" alt="logo" />
          <h3 className={styles.title}>Money Guard</h3>
          <form onSubmit={handleRegister} className={styles.reg__form}>
            <div className={styles.input__wrapper}>
              <svg className={styles.email}>
                <use
                  href="./symbol-defs-k.svg#icon-user"
                  width="24"
                  height="24"
                ></use>
              </svg>
              <input
                type="text"
                placeholder="name"
                required
                className={styles.input}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
                placeholder="email"
                required
                className={styles.input}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div className={styles.input__wrapper}>
              <svg className={styles.email}>
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
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </div>
            <div className={styles.input__wrapper}>
              <svg className={styles.email}>
                <use
                  href="./symbol-defs-k.svg#icon-lock"
                  width="24"
                  height="24"
                ></use>
              </svg>
              <input
                type="password"
                placeholder="confirm Password"
                className={styles.input}
                onChange={(e) => setUserPasswordCkeck(e.target.value)}
              />
            </div>
            {/* <div className={styles.validate}><div className={`${validatePassword === "validate__bad" ? styles.validate__bad : (validatePassword === "validate__medium" ? styles.validate__medium : (validatePassword === "validate__good" ? styles.validate__good : (validatePassword === "none" ? styles.none : styles.none)))}`}></div></div> */}
            <div className={styles.validate}>
              <div className={styles[validatePassword] || styles.none}></div>
            </div>
            <div className={styles.btn__wrapper}>
              <button className={styles.active__btn} type="submit">
                Register
              </button>
              <button
                onClick={() => setIsRegistering(false)}
                className={styles.not__active__btn}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
