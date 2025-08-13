import { useState } from 'react';

function AddExpenseButton({ onAddExpense }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleAdd = () => {
    onAddExpense(description, amount);
    setDescription('');
    setAmount('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleAdd}>Add Expense</button>
    </div>
  );
}

export default AddExpenseButton;
