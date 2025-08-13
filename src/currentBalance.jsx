import React, { useState, useEffect } from "react";

export default function CurrentBalance({ balance, setBalance }) {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(balance);

  useEffect(() => {
    setTemp(balance);
  }, [balance]);

  const toggleEdit = () => {
    if (editing) {
      setBalance(Number(temp) || 0);
    }
    setEditing(!editing);
  };

  return (
    <div className="Balance">
      <h4>CURRENT BALANCE</h4>
      <h1>₹{Number(balance).toFixed(2)}</h1>

      {editing && (
        <input
          type="number"
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
        />
      )}

      <button onClick={toggleEdit}>{editing ? "SET" : "EDIT BUDGET"}</button>
    </div>
  );
}
