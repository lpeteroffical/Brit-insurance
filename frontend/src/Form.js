import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./Form.css";

function Form() {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function for programmatic navigation

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((idToken) => {
          const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
          };
          fetch("http://18.169.24.172:8000/api/products", requestOptions)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              setProducts(data);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching data: ", error);
              setLoading(false);
            });
        });
      } else {
        console.log("User not logged in or token not available.");
        setLoading(false);
      }
    });
  };

  const addProduct = async () => {
    if (!newProductName || !newProductPrice) return;
    const auth = getAuth();
    const idToken = await auth.currentUser.getIdToken();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        name: newProductName,
        price: parseFloat(newProductPrice),
      }),
    };

    fetch("http://18.169.24.172:8000/api/products", requestOptions)
      .then((response) => response.json())
      .then(() => {
        fetchProducts(); // Refresh the list
        setNewProductName("");
        setNewProductPrice("");
      })
      .catch((error) => console.error("Error adding product: ", error));
  };

  const removeProduct = async (productId) => {
    const auth = getAuth();
    const idToken = await auth.currentUser.getIdToken();

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    };

    fetch(`http://18.169.24.172:8000/api/products/${productId}`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then(() => {
        fetchProducts(); // Refresh the product list
      })
      .catch((error) => console.error("Error removing product: ", error));
  };

  return (
    <div className="form-container">
      <h1>Product List</h1>
      <div>
        <input
          type="text"
          placeholder="Product Name"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(e.target.value)}
        />
        <button onClick={addProduct}>Add</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Items</th>
              <th>Price(£)</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  {/* Update this button to use product.id for removal */}
                  <button onClick={() => removeProduct(product.id)}>X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button classname="sum-btn" onClick={() => navigate("/summary")}>
        Summary
      </button>
    </div>
  );
}

export default Form;
