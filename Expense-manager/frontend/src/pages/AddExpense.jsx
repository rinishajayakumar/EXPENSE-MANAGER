import { useState } from "react";
import api from "../services/api";

function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/expenses", {
      title,
      amount: Number(amount),
      category,
    });

    setTitle("");
    setAmount("");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add Expense 💸</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          className="border p-2 w-full rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 w-full rounded"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* CATEGORY */}
        <select
          className="border p-2 w-full rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Bills</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>

        <button className="w-full bg-blue-500 text-white p-2 rounded">
          Add Expense
        </button>

      </form>
    </div>
  );
}

export default AddExpense;