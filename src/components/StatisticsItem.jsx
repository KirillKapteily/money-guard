import react from "react";
import transStyles from "../styles/transactions.module.scss";

const StatisticsItem = ({ name, value, color }) => {
  return (
    <div className={transStyles.statisticsItemRow}>
      <div className={transStyles.statisticsCategoryName}>
        <span
          className={transStyles.statisticsColorMarker}
          style={{ backgroundColor: color }}
        />
        {name}
      </div>
      <span className={transStyles.statisticsCategorySum}>
        {value.toLocaleString("ru-RU", { minimumFractionDigits: 2 })}
      </span>
    </div>
  );
};

export default StatisticsItem;
