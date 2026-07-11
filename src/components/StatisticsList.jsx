import React, { useMemo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import StatisticsItem from "./StatisticsItem";
import transStyles from "../styles/transactions.module.scss";

const CATEGORY_COLORS = {
  Products: "#FFD8D0",
  Car: "#FD9498",
  SelfCare: "#C5BAFF",
  ChildCare: "#6E7FFF",
  Household: "#4A56E2",
  Education: "#81E1FF",
  Leisure: "#24CCA7",
  Other: "#00AD84",
};

const COLOR_PALETTE = [
  "#FFD8D0",
  "#FD9498",
  "#C5BAFF",
  "#6E7FFF",
  "#4A56E2",
  "#81E1FF",
  "#24CCA7",
  "#00AD84",
];

const Statistics = ({ transactions = [] }) => {
  const [month, setMonth] = useState("March");
  const [year, setYear] = useState("2022");

  const data = useMemo(() => {
    const totals = {};
    const orderedCategories = [];

    transactions.forEach((transaction) => {
      const amount = Number(transaction.sum) || 0;
      const isExpense = transaction.type === "-" || transaction.type === "expense";
      if (!isExpense || amount === 0) return;

      const categoryName = transaction.category?.trim() || "Other expenses";
      if (!totals[categoryName]) {
        totals[categoryName] = 0;
        orderedCategories.push(categoryName);
      }
      totals[categoryName] += Math.abs(amount);
    });

    return orderedCategories.map((category, index) => ({
      name: category,
      value: totals[category],
      color: CATEGORY_COLORS[category] || COLOR_PALETTE[index % COLOR_PALETTE.length],
    }));
  }, [transactions]);

  const totalAmount = data.reduce((sum, item) => sum + item.value, 0);

  const chartData = data.length
    ? data
    : [{ name: "empty", value: 1, color: "#3f3f7a" }];

  return (
    <div className={transStyles.statisticsWrapper}>
      <div className={transStyles.statisticsHeader}>
        <h2 className={transStyles.statisticsTitle}>Statistics</h2>
      </div>

      <div className={transStyles.statisticsContent}>
        <div className={transStyles.statisticsChartBox}>
          <ResponsiveContainer width="100%" height={360}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={130}
                startAngle={90}
                endAngle={-270}
                paddingAngle={2}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className={transStyles.statisticsCenterValue}>{`₴ ${totalAmount.toLocaleString("ru-RU", {
            minimumFractionDigits: 2,
          })}`}</div>
        </div>

        <div className={transStyles.statisticsInfoBox}>
          <div className={transStyles.statisticsSelectors}>
            <select
              className={transStyles.statisticsSelect}
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
            <select
              className={transStyles.statisticsSelect}
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option>2019</option>
              <option>2020</option>
              <option>2021</option>
              <option>2022</option>
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
              <option>2026</option>
            </select>
          </div>

          <div className={transStyles.statisticsLegend}>
            {data.map((item) => (
              <StatisticsItem
                key={item.name}
                name={item.name}
                value={item.value}
                color={item.color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
