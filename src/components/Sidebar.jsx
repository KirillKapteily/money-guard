import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineBarChart } from 'react-icons/md';
import styles from '../styles/sidebar.module.scss';
import CurrencyTable from './CurrencyTable';
export default function Sidebar({ balance, activeTab, onTabChange }) {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <button
          className={`${styles.navItem} ${activeTab === 'home' ? styles.active : ''}`}
          onClick={() => onTabChange('home')}
          type="button"
        >
          <AiOutlineHome className={styles.icon} />
          <span>Home</span>
        </button>

        <button
          className={`${styles.navItem} ${activeTab === 'statistics' ? styles.active : ''}`}
          onClick={() => onTabChange('statistics')}
          type="button"
        >
          <MdOutlineBarChart className={styles.icon} />
          <span>Statistics</span>
        </button>
      </nav>

      <div className={styles.balanceBlock}>
        <p className={styles.balanceLabel}>YOUR BALANCE</p>
        <h2 className={styles.balanceAmount}>
          ₴ {balance?.toLocaleString('uk-UA') ?? '0'}
        </h2>
      </div>
      <CurrencyTable />
    </aside>
  );
}