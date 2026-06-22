//header.module
import styles from "../styles/header.module.scss";
import cont from "../styles/body.module.scss";

export default function Header({ name, loggingout }) {
  
  return (
    <div className={cont.container}>
      <header>
        <div>
          <svg className={styles.logo}>
            <use
              href="./symbol-defs-k-header.svg#icon-money-guard-merged-logo"
              width="115"
              height="48"
            ></use>
          </svg>
        </div>

        <div className={styles.controls__wrapper}>
          <div>
            <p className={styles.name__display}>{name}</p>
          </div>
          <hr className={styles.hr} />
          <div
            className={styles.exit__wrapper}
            onClick={() => loggingout(true)}
          >
            <p className={styles.exit__text}>
              {" "}
              <svg className={styles.exit}>
                <use
                  href="./symbol-defs-k-header.svg#icon-exit"
                  width="18"
                  height="18"
                ></use>
              </svg>
              Exit
            </p>
          </div>
        </div>
      </header>
    </div>
  );
}
