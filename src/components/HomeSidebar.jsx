import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import styles from "../styles/homesidebar.module.scss";

const USD_BUY_PRICE = 44.68;
const EUR_BUY_PRICE = 51.2;

const RenderCustomizedLabel = (props) => {
  const { x, y, value } = props;
  if (!value) return null;

  return (
    <text
      x={x}
      y={y - 12}
      fill="#FF868D"
      fontSize={12}
      textAnchor="middle"
      fontWeight={400}
      fontFamily="sans-serif"
    >
      {value.toFixed(2)}
    </text>
  );
};


const HomeSidebar = ({ transactions = [] }) => {
  const [rates, setRates] = useState({ usd: null, eur: null });
  const [loading, setLoading] = useState(true);

  const totalBalance = transactions.reduce((acc, transaction) => {
    if (transaction.type === "+") return acc + transaction.sum;
    if (transaction.type === "-") return acc - transaction.sum;
    return acc;
  }, 0);

  useEffect(() => {
    fetch("https://api.monobank.ua/bank/currency")
      .then((res) => res.json())
      .then((data) => {
        const usdData = data.find(
          (item) => item.currencyCodeA === 840 && item.currencyCodeB === 980,
        );
        const eurData = data.find(
          (item) => item.currencyCodeA === 978 && item.currencyCodeB === 980,
        );

        setRates({
          usd: usdData
            ? { purchase: usdData.rateBuy, sale: usdData.rateSell }
            : { purchase: 44.68, sale: 45.0308 },
          eur: eurData
            ? { purchase: eurData.rateBuy, sale: eurData.rateSell }
            : { purchase: 51.2, sale: 51.8001 },
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error while loading values, use fallback:", err);
        setRates({
          usd: { purchase: 44.68, sale: 45.0308 },
          eur: { purchase: 51.2, sale: 51.8001 },
        });
        setLoading(false);
      });
  }, []);

  const usdBuy = rates.usd?.purchase || 44.68;
  const eurBuy = rates.eur?.purchase || 51.2;

  const chartData = [
    { name: "start", value: usdBuy - 2.5 },
    { name: "USD", value: usdBuy },
    { name: "mid", value: (usdBuy + eurBuy) / 2 - 3.5 },
    { name: "EUR", value: eurBuy },
    { name: "end", value: eurBuy - 2.0 },
  ];

  return (
    <div className={styles.sidebarContainer}>
      <nav className={styles.navigation}>
        <div className={styles.navItem}>
          <div className={styles.iconWrapper}></div>
          <span className={styles.navText}>Home</span>
        </div>
        <div className={styles.navItem}>
          <div className={styles.iconWrapper}></div>
          <span className={styles.navText}>Statistic</span>
        </div>
      </nav>

      <div className={styles.balanceDiv}>
        <span className={styles.balanceLabel}>YOUR BALANCE</span>
        <h2 className={styles.balanceValue}>{`₴ `}</h2>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.col}>Currency</div>
          <div className={styles.col}>Purchase</div>
          <div className={styles.col}>Sale</div>
        </div>

        {loading ? (
          <div className={styles.loadingText}>Loading actual currency...</div>
        ) : (
          <>
            <div className={styles.tableRow}>
              <div className={styles.col}>USD</div>
              <div className={styles.col}>{rates.usd?.purchase.toFixed(2)}</div>
              <div className={styles.col}>{rates.usd?.sale.toFixed(2)}</div>
            </div>

            <div className={styles.tableRow}>
              <div className={styles.col}>EUR</div>
              <div className={styles.col}>{rates.eur?.purchase.toFixed(2)}</div>
              <div className={styles.col}>{rates.eur?.sale.toFixed(2)}</div>
            </div>
          </>
        )}
      </div>

      {!loading && (
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart
              data={chartData}
              margin={{ top: 25, right: -15, left: -15, bottom: 0 }}
            >
              <defs>
                <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8F5EFA" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#8F5EFA" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" hide />
              <YAxis hide domain={["dataMin - 1", "dataMax + 1"]} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#FFA48D"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#purpleGradient)"
                label={<RenderCustomizedLabel />}
                dot={{
                  r: 4,
                  stroke: "#FFA48D",
                  strokeWidth: 2,
                  fill: "#4A2A85",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default HomeSidebar;