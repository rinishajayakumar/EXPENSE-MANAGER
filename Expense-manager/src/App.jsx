import { Routes, Route } from "react-router-dom";
import AddExpense from "./pages/AddExpense";

function App() {
  return (
    <div>
      <h1>Expense Manager 💸</h1>

      <Routes>
        <Route path="/" element={<AddExpense />} />
      </Routes>
    </div>
  );
}

export default App;