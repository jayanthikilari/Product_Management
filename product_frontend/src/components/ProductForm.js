import React from "react";

function ProductForm({
  formData,
  errors,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
}) {
  return (
    <form
      onSubmit={onSubmit}
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
        {isEditing ? "Edit Product" : "Add New Product"}
      </h3>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={onChange}
        required
        style={{
          padding: "8px",
          marginBottom: "5px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      {errors.name && (
        <span style={{ color: "red", fontSize: "12px" }}>{errors.name}</span>
      )}

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={onChange}
        required
        style={{
          padding: "8px",
          marginBottom: "5px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      {errors.price && (
        <span style={{ color: "red", fontSize: "12px" }}>{errors.price}</span>
      )}

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={onChange}
        style={{
          padding: "8px",
          marginBottom: "5px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      {errors.category && (
        <span style={{ color: "red", fontSize: "12px" }}>{errors.category}</span>
      )}

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={onChange}
        rows="3"
        style={{
          padding: "8px",
          marginBottom: "5px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      {errors.description && (
        <span style={{ color: "red", fontSize: "12px" }}>
          {errors.description}
        </span>
      )}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          type="button"
          onClick={onCancel}
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
  );
}

export default ProductForm;
