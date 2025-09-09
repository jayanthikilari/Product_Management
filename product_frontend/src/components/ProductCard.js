import React from "react";

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div
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
        <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>
          {product.name}
        </h3>
        <p style={{ fontSize: "14px", color: "#333", margin: "4px 0" }}>
          ₹{product.price}
        </p>
        <p style={{ fontSize: "13px", color: "#666", margin: "4px 0" }}>
          {product.category}
        </p>
        <p style={{ fontSize: "12px", color: "#999", marginTop: "6px" }}>
          {product.description.length > 50
            ? product.description.slice(0, 50) + "..."
            : product.description}
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
          onClick={() => onEdit(product)}
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
          onClick={() => onDelete(product._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
