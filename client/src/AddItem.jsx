import React, { useEffect, useState } from "react";
import "./addItem.css";

const AddItem = ({ onCancel, onSubmit }) => {
  const [newUser, setNewUser] = useState({ name: "", email: "", age: "" });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const age = parseInt(newUser.age);
    const valid =
      newUser.name.trim() && newUser.email.trim() && !isNaN(age) && age >= 0;
    setIsValid(valid);
  }, [newUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    onSubmit({
      name: newUser.name.trim(),
      email: newUser.email.trim(),
      age: parseInt(newUser.age),
    });

    setNewUser({ name: "", email: "", age: "" });
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) =>
          setNewUser((prev) => ({ ...prev, name: e.target.value }))
        }
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) =>
          setNewUser((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      <input
        type="number"
        placeholder="Age"
        value={newUser.age}
        onChange={(e) =>
          setNewUser((prev) => ({ ...prev, age: e.target.value }))
        }
      />
      <div className="form-buttons">
        <button type="button" className="btnRed" onClick={onCancel}>
          {isValid ? 'Cancel':'Close'}
        </button>
        <button type="submit" className="btnGreen" disabled={!isValid}>
          Add
        </button>
      </div>
    </form>
  );
};

export default AddItem;
