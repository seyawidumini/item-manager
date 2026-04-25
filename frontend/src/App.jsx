import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const API = "https://item-manager-1-sn7g.onrender.com/api/items";

  const fetchItems = async () => {
    const res = await axios.get(API);

    if (Array.isArray(res.data)) {
      setItems(res.data);
    } else {
      setItems([]);
      console.log("Backend returned:", res.data);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async () => {
    await axios.post(API, { name, quantity, price });
    setName("");
    setQuantity("");
    setPrice("");
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchItems();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Item Manager</h1>

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

      <button onClick={addItem}>Add Item</button>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} - {item.quantity} - Rs. {item.price}
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;