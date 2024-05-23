import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch("https://gsd84267tf.execute-api.ap-southeast-1.amazonaws.com/items/")
      .then((response) => response.json())
      .then((data) => setItems(data));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newItem = { name, description };

    fetch(
      "https://gsd84267tf.execute-api.ap-southeast-1.amazonaws.com/items/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      }
    )
      .then((response) => response.json())
      .then(() => {
        fetchItems(); // Fetch items again to update the list
        setName("");
        setDescription("");
      });
  };

  return (
    <div className="container">
      <h1>Items</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Item</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
