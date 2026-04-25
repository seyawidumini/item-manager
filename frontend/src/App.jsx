import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice ] = useState("");

  const API = "https://item-manager-1-sn7g.onrender.com";

  // GET items
  const fetchItems = async () => {
    const res = await axios.get(API);
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ADD item
  const addItem = async () => {
    await axios.post(API, { name, quantity, price });
    setName("");
    setQuantity("");
    fetchItems();
  };

  // DELETE item
  const deleteItem = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchItems();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Item Manager</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <input 
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        />

      <button onClick={addItem}>Add</button>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} - {item.quantity} -{item.price}
            <button onClick={() => deleteItem(item._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;