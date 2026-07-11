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

const DEFAULT_STATS_DATA = [
  { name: "Car", value: 1500, color: CATEGORY_COLORS.Car },
  { name: "Self care", value: 800, color: CATEGORY_COLORS.SelfCare },
  { name: "Child care", value: 2208.5, color: CATEGORY_COLORS.ChildCare },
  { name: "Household products", value: 300, color: CATEGORY_COLORS.Household },
  { name: "Education", value: 3400, color: CATEGORY_COLORS.Education },
  { name: "Leisure", value: 1230, color: CATEGORY_COLORS.Leisure },
  { name: "Other expenses", value: 610, color: CATEGORY_COLORS.Other },
];

const DEFAULT_STATS_TOTALS = {
  totalExpenses: 22549.24,
  totalIncome: 27350,
};

const Statistics = ({ transactions = [] }) => {
  const [month, setMonth] = useState("March");
  const [year, setYear] = useState("2022");

  const { data, totalExpenses, totalIncome } = useMemo(() => {
    const totals = {};
    const orderedCategories = [];
    let expenses = 0;
    let income = 0;

    transactions.forEach((transaction) => {
      const amount = Number(transaction.sum) || 0;
      if (amount === 0) return;

      if (transaction.type === "+" || transaction.type === "income") {
        income += Math.abs(amount);
        return;
      }

      const isExpense = transaction.type === "-" || transaction.type === "expense";
      if (!isExpense) return;

      expenses += Math.abs(amount);
      const categoryName = transaction.category?.trim() || "Other expenses";
      if (!totals[categoryName]) {
        totals[categoryName] = 0;
        orderedCategories.push(categoryName);
      }
      totals[categoryName] += Math.abs(amount);
    });

    if (orderedCategories.length === 0) {
      return {
        data: DEFAULT_STATS_DATA,
        totalExpenses: DEFAULT_STATS_TOTALS.totalExpenses,
        totalIncome: DEFAULT_STATS_TOTALS.totalIncome,
      };
    }

    return {
      data: orderedCategories.map((category, index) => ({
        name: category,
        value: totals[category],
        color: CATEGORY_COLORS[category] || COLOR_PALETTE[index % COLOR_PALETTE.length],
      })),
      totalExpenses: expenses,
      totalIncome: income,
    };
  }, [transactions]);

  const totalAmount = totalExpenses;

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

          <div className={transStyles.statisticsSummary}>
            <div className={transStyles.statisticsSummaryRow}>
              <span>Expenses:</span>
              <span className={transStyles.expenseAmount}>{`₴ ${totalExpenses.toLocaleString("ru-RU", {
                minimumFractionDigits: 2,
              })}`}</span>
            </div>
            <div className={transStyles.statisticsSummaryRow}>
              <span>Income:</span>
              <span className={transStyles.incomeAmount}>{`₴ ${totalIncome.toLocaleString("ru-RU", {
                minimumFractionDigits: 2,
              })}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
