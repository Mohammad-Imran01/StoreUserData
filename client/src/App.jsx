import { useEffect, useState } from "react";
import AddItem from "./AddItem";
import { getUsers, addUser, deleteUser } from "../src/apis/user";

function App() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch users on mount
  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch((err) => {
        console.error("Failed to fetch users:", err.message);
        setUsers([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Add user handler
  const handleAddUser = async (user) => {
    try {
      const added = await addUser(user);
      setUsers((prev) => [...prev, added]);
      setShowForm(false);
    } catch (err) {
      console.error("Add failed:", err.message);
    }
  };

  // Delete user handler
  const handleRemove = async (_id) => {
    try {
      await deleteUser(_id);
      setUsers((prev) => prev.filter((u) => u._id !== _id));
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  return (
    <div className="app">
      <div className="card">
        {showForm && (
          <AddItem
            onCancel={() => setShowForm(false)}
            onSubmit={handleAddUser}
          />
        )}

        <div className="rowHeading">
          <h1>User List</h1>
          {!showForm && (
            <button className="btnGreen" onClick={() => setShowForm(true)}>
              +
            </button>
          )}
        </div>

        <div className="scroll-box">
          {loading ? (
            <p>Loading users...</p>
          ) : users.length === 0 ? (
            <p>No users data found!</p>
          ) : (
            users.map((user) => (
              <div key={user._id} className="userItem">
                <div className="user-item">
                {console.log(user)}
                  <strong>{user.name}</strong>
                  <p>{user.email}</p>
                </div>
                {!showForm && (
                  <button
                    className="btnRed"
                    onClick={() => handleRemove(user._id)}
                    aria-label={`Remove ${user.name}`}
                  >
                    ×
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
