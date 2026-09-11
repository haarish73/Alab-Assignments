import React from "react";
import "../css/CategoryTable.css";

const CategoryTable = ({ categories, onEdit, onDelete, onStatusChange }) => {
  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Category List</h2>
        <span className="category-count">{categories.length} Total</span>
      </div>

      {categories.length === 0 ? (
        <div className="empty-state">
          <p>No categories found.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th style={{ width: "80px" }}>ID</th>
                <th>Name</th>
                <th style={{ width: "120px" }}>Status</th>
                <th style={{ width: "160px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td className="col-id">#{cat.id}</td>
                  <td className="col-name">{cat.name}</td>

                  <td>
                    <button
                      type="button"
                      className={`status-badge ${cat.status}`}
                      onClick={() =>
                        onStatusChange(
                          cat.id,
                          cat.status === "active" ? "inactive" : "active"
                        )
                      }
                      title="Click to toggle status"
                    >
                      <span className="status-dot"></span>
                      {cat.status === "active" ? "Active" : "Inactive"}
                    </button>
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button
                        type="button"
                        className="btn-action btn-edit"
                        onClick={() => onEdit(cat)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn-action btn-delete"
                        onClick={() => onDelete(cat.id)}
                      >
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

export default CategoryTable;