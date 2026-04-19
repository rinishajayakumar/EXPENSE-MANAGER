import { Routes, Route, Link } from "react-router-dom";
import AddExpense from "./pages/AddExpense";
import Expenses from "./pages/Expenses";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center mb-6">
        💸 Expense Manager
      </h1>

      {/* NAVIGATION */}
      <div className="flex justify-center gap-4 mb-6">

        <Link
          to="/"
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Add
        </Link>

        <Link
          to="/expenses"
          className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
        >
          View
        </Link>

        <Link
          to="/dashboard"
          className="px-4 py-2 bg-purple-500 text-white rounded shadow hover:bg-purple-600"
        >
          Dashboard 📊
        </Link>

      </div>

      {/* PAGE CONTAINER */}
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">

        <Routes>
          <Route path="/" element={<AddExpense />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

      </div>

    </div>
  );
}

export default App;