import React from "react";
import "../css/ProductTable.css";

const ProductTable = ({ products, onEdit, onDelete, onStatusChange }) => {
  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Product List</h2>
        <span className="product-count">{products.length} Items</span>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <p>No products found</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="font-mono">#{product.id}</td>

                  <td>
                    {product.image ? (
                      <img
                        src={
                          product.image.startsWith("http")
                            ? product.image
                            : `http://localhost:5000/uploads/${product.image}`
                        }
                        alt={product.name}
                        className="product-thumbnail"
                      />
                    ) : (
                      <div className="no-image-placeholder">No Image</div>
                    )}
                  </td>

                  <td className="font-medium">{product.name}</td>
                  <td>${Number(product.price).toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span className="category-tag">{product.category_name || "Uncategorized"}</span>
                  </td>

                  <td>
                    <button
                      className={`badge-btn badge-${product.status}`}
                      onClick={() =>
                        onStatusChange(
                          product.id,
                          product.status === "active" ? "inactive" : "active"
                        )
                      }
                      title="Click to toggle status"
                    >
                      {product.status}
                    </button>
                  </td>

                  <td className="text-right">
                    <div className="action-buttons">
                      <button className="btn-action edit" onClick={() => onEdit(product)}>
                        Edit
                      </button>
                      <button className="btn-action delete" onClick={() => onDelete(product.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductTable;