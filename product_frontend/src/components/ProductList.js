import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";

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

  // Validation
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name || formData.name.length < 3)
      tempErrors.name = "Name must be at least 3 characters";
    if (!formData.price || formData.price <= 0)
      tempErrors.price = "Price must be a positive number";
    if (!formData.category) tempErrors.category = "Category is required";
    if (formData.description.length > 200)
      tempErrors.description = "Description cannot exceed 200 characters";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editProductId) {
        await axios.put(
          `http://localhost:5000/api/products/${editProductId}`,
          formData
        );
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

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.price.toString().includes(searchQuery)
  );

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#F7DFC2",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "25px",
        }}
      >
        Product Details
      </h2>

      {/* Search + Add button */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
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
            <ProductCard
              key={product._id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
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
          <ProductForm
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditProductId(null);
              setErrors({});
            }}
            isEditing={!!editProductId}
          />
        </div>
      )}
    </div>
  );
}

export default ProductList;
