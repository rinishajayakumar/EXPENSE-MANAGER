import { useEffect, useState } from "react";
import api from "../services/api";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  // FETCH
  const fetchExpenses = async () => {
    try {
      const res = await api.get("/expenses");
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // DELETE
  const deleteExpense = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.log(err);
    }
  };

  // START EDIT
  const startEdit = (exp) => {
    setEditId(exp._id);
    setTitle(exp.title);
    setAmount(exp.amount);
    setCategory(exp.category || "");
  };

  // UPDATE
  const updateExpense = async () => {
    try {
      await api.put(`/expenses/${editId}`, {
        title,
        amount: Number(amount),
        category,
      });

      setEditId(null);
      setTitle("");
      setAmount("");
      setCategory("");

      fetchExpenses();
    } catch (err) {
      console.log(err);
    }
  };

  // TOTAL
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      {/* HEADER */}
      <h2 className="text-xl font-bold mb-2">Expenses 💸</h2>

      <p className="mb-4 font-semibold text-green-600">
        Total Spent: ₹ {total}
      </p>

      {/* LIST */}
      <div className="space-y-3">
        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses found</p>
        ) : (
          expenses.map((exp) => (
            <div
              key={exp._id}
              className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center"
            >
              {/* EDIT MODE */}
              {editId === exp._id ? (
                <div className="flex flex-col gap-2 w-full">

                  <input
                    className="border p-1 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                  />

                  <input
                    className="border p-1 rounded"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                  />

                  <select
                    className="border p-1 rounded"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Food</option>
                    <option>Travel</option>
                    <option>Bills</option>
                    <option>Shopping</option>
                    <option>Other</option>
                  </select>

                  <button
                    onClick={updateExpense}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  {/* VIEW MODE */}
                  <div>
                    <h3 className="font-semibold">{exp.title}</h3>
                    <p>₹ {exp.amount}</p>
                    <p className="text-sm text-gray-500">
                      {exp.category || "No category"}
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(exp)}
                      className="bg-yellow-400 px-2 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteExpense(exp._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Expenses;