import { useEffect, useState } from "react";
import api from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/expenses");
      setExpenses(res.data);
    };
    fetchData();
  }, []);

  // ---------------- CATEGORY DATA (PIE CHART) ----------------
  const categoryData = expenses.reduce((acc, item) => {
    const cat = item.category || "Other";
    acc[cat] = (acc[cat] || 0) + item.amount;
    return acc;
  }, {});

  const pieData = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));

  // ---------------- MONTHLY DATA (BAR CHART) ----------------
  const monthlyDataMap = {};

  expenses.forEach((exp) => {
    const date = new Date(exp.date || Date.now());
    const month = date.toLocaleString("default", { month: "short" });

    monthlyDataMap[month] = (monthlyDataMap[month] || 0) + exp.amount;
  });

  const barData = Object.keys(monthlyDataMap).map((key) => ({
    month: key,
    amount: monthlyDataMap[key],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6666"];

  return (
    <div className="space-y-10">

      <h2 className="text-xl font-bold text-center">
        Expense Dashboard 📊
      </h2>

      {/* PIE CHART */}
      <div className="flex justify-center">
        <PieChart width={300} height={300}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* BAR CHART (MONTHLY) */}
      <div className="flex justify-center">
        <BarChart width={350} height={250} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </div>

    </div>
  );
}

export default Dashboard;