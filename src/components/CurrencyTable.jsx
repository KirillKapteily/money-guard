import { useState, useEffect } from 'react';
import styles from '../styles/currencyTable.module.scss';

const CURRENCIES = ['USD', 'EUR'];

export default function CurrencyTable() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cached = sessionStorage.getItem('currency_rates');
    if (cached) {
      setRates(JSON.parse(cached));
      setLoading(false);
      return;
    }

    const fetchRates = async () => {
      try {
        const results = await Promise.all(
          CURRENCIES.map((code) =>
            fetch(
              `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${code}&json`
            ).then((r) => r.json())
          )
        );

        const formatted = results.map((data) => ({
          currency: data[0].cc,
          purchase: (data[0].rate - 0.5).toFixed(2),
          sale: data[0].rate.toFixed(2),
        }));

        setRates(formatted);
        sessionStorage.setItem('currency_rates', JSON.stringify(formatted));
      } catch {
        setError('Failed to load rates');
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.loader}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.error}>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Purchase</th>
            <th>Sale</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate) => (
            <tr key={rate.currency}>
              <td>{rate.currency}</td>
              <td>{rate.purchase}</td>
              <td>{rate.sale}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}