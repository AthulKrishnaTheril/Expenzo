import React, { useState } from "react";
import CurrentBalance from "./CurrentBalance";
import "./App.css";

export default function App() {
  const [balance, setBalance] = useState(0);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = () => {
    const trimmedDesc = desc.trim();
    if (!trimmedDesc || !amount) return;
    const amt = Number(amount);
    if (isNaN(amt) || amt <= 0) return;

    const newBalance = balance - amt;
    const now = new Date();
    const newExpense = {
      id: now.getTime(),
      desc: trimmedDesc,
      amount: amt,
      after: newBalance.toFixed(2),
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
    };

    // Put newest first
    setExpenses((prev) => [newExpense, ...prev]);

    setBalance(newBalance);
    setDesc("");
    setAmount("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddExpense();
    }
  };

  return (
    <div className="container">
      {/* HEADER */}
      <header className="Header">
        <h1 className="logo">Expenzo</h1>
        <nav>
          <a href="/">Profile</a>
        </nav>
      </header>

      {/* BALANCE */}
      <main>
        <CurrentBalance balance={balance} setBalance={setBalance} />

        {/* ADD EXPENSE FORM */}
        <section className="add-expense">
          <div className="inputs">
            <input
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
          <button onClick={handleAddExpense}>Add Expense</button>
        </section>

        {/* EXPENSE LIST (scrollable) */}
        <section className="Transaction">
          <h2>Expenses</h2>
          {expenses.length === 0 && <p className="no-expenses">No expenses yet</p>}

          {expenses.map((e) => (
            <div key={e.id} className="expense-item">
              <div className="expense-main">{e.desc}</div>
              <div className="expense-meta">
                <div className="amount">₹{Number(e.amount).toFixed(2)}</div>
                <div className="after">After: ₹{e.after}</div>
                <small>
                  {e.date} {e.time}
                </small>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <p>© {new Date().getFullYear()} Expenzo. All rights reserved.</p>
      </footer>
    </div>
  );
}
