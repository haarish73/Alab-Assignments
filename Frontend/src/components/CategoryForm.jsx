import React, { useState, useEffect } from "react";
import API from "../services/api";
import "../css/CategoryForm.css";
import Swal from "sweetalert2";

const INITIAL_STATE = { name: "", status: "active" };

const CategoryForm = ({ selectedCategory, refreshCategories, onCancel }) => {
  const [form, setForm] = useState(INITIAL_STATE);

  useEffect(() => {
    if (selectedCategory) {
      setForm(selectedCategory);
    } else {
      setForm(INITIAL_STATE);
    }
  }, [selectedCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setForm(INITIAL_STATE);
    if (onCancel) onCancel();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (form.id) {
        await API.put(`/categories/${form.id}`, form);
      } else {
        await API.post("/categories", form);
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Category saved successfully",
      });
      refreshCategories();
      handleReset();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <h2>{form.id ? "Edit Category" : "Add Category"}</h2>

      <div className="form-group">
        <label htmlFor="categoryName" className="form-label">
          Category Name
        </label>
        <input
          id="categoryName"
          type="text"
          name="name"
          placeholder="e.g. Electronics, Books"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Status</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="status"
              value="active"
              checked={form.status === "active"}
              onChange={handleChange}
            />
            <span>Active</span>
          </label>

          <label className="radio-label">
            <input
              type="radio"
              name="status"
              value="inactive"
              checked={form.status === "inactive"}
              onChange={handleChange}
            />
            <span>Inactive</span>
          </label>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {form.id ? "Update Category" : "Create Category"}
        </button>
        {form.id && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CategoryForm;
