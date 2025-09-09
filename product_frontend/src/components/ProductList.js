import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });
  const [editProductId, setEditProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  // Form validation function
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name || formData.name.length < 3) tempErrors.name = "Name must be at least 3 characters";
    if (!formData.price || formData.price <= 0) tempErrors.price = "Price must be a positive number";
    if (!formData.category) tempErrors.category = "Category is required";
    if (formData.description.length > 200) tempErrors.description = "Description cannot exceed 200 characters";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // stop if validation fails

    try {
      if (editProductId) {
        await axios.put(`http://localhost:5000/api/products/${editProductId}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/products", formData);
      }
      setFormData({ name: "", price: "", category: "", description: "" });
      setEditProductId(null);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
    });
    setEditProductId(product._id);
    setShowForm(true);
  };

  // Filter products by name or price
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.price.toString().includes(searchQuery)
  );

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif",backgroundColor: "#F7DFC2", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", fontSize: "28px", fontWeight: "bold", marginBottom: "25px" }}>
        Product Details
      </h2>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Search by name or price..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "300px",
            fontSize: "14px",
          }}
        />
        <button
          style={{
            background: "#90EE90",
            color: "black",
            padding: "12px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
          }}
          onClick={() => {
            setFormData({ name: "", price: "", category: "", description: "" });
            setEditProductId(null);
            setShowForm(true);
            setErrors({});
          }}
        >
          + Add Product
        </button>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <p style={{ color: "#666", textAlign: "center" }}>No products found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "16px",
                background: "white",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                height: "230px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>{product.name}</h3>
                <p style={{ fontSize: "14px", color: "#333", margin: "4px 0" }}>₹{product.price}</p>
                <p style={{ fontSize: "13px", color: "#666", margin: "4px 0" }}>{product.category}</p>
                <p style={{ fontSize: "12px", color: "#999", marginTop: "6px" }}>
                  {product.description.length > 50 ? product.description.slice(0, 50) + "..." : product.description}
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                <button
                  style={{
                    background: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "6px 10px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  style={{
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "6px 10px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "350px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3 style={{ marginBottom: "15px", textAlign: "center" }}>
              {editProductId ? "Edit Product" : "Add New Product"}
            </h3>

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ padding: "8px", marginBottom: "5px", borderRadius: "6px", border: "1px solid #ccc" }}
            />
            {errors.name && <span style={{ color: "red", fontSize: "12px" }}>{errors.name}</span>}

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              style={{ padding: "8px", marginBottom: "5px", borderRadius: "6px", border: "1px solid #ccc" }}
            />
            {errors.price && <span style={{ color: "red", fontSize: "12px" }}>{errors.price}</span>}

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              style={{ padding: "8px", marginBottom: "5px", borderRadius: "6px", border: "1px solid #ccc" }}
            />
            {errors.category && <span style={{ color: "red", fontSize: "12px" }}>{errors.category}</span>}

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              style={{ padding: "8px", marginBottom: "5px", borderRadius: "6px", border: "1px solid #ccc" }}
            />
            {errors.description && <span style={{ color: "red", fontSize: "12px" }}>{errors.description}</span>}

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditProductId(null);
                  setErrors({});
                }}
                style={{
                  background: "#6c757d",
                  color: "white",
                  padding: "8px 14px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  background: "#28a745",
                  color: "white",
                  padding: "8px 14px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProductList;
