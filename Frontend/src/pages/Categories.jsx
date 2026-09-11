import React, { useEffect, useState } from "react";
import API from "../services/api";
import CategoryForm from "../components/CategoryForm";
import CategoryTable from "../components/CategoryTable";
import Swal from "sweetalert2";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load categories",
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ DELETE with confirm
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This category will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await API.delete(`/categories/${id}`);

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Category has been deleted.",
          timer: 1500,
          showConfirmButton: false,
        });

        fetchCategories();
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            err.response?.data?.message ||
            "Cannot delete category (maybe linked to products)",
        });
      }
    }
  };

  // ✅ STATUS CHANGE with error handling
  const handleStatusChange = async (id, status) => {
    try {
      await API.patch(`/categories/${id}/status`, { status });

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: `Status changed to ${status}`,
        timer: 1200,
        showConfirmButton: false,
      });

      fetchCategories();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update status",
      });
    }
  };

  return (
    <div>
      <CategoryForm
        selectedCategory={selectedCategory}
        refreshCategories={fetchCategories}
        onCancel={() => setSelectedCategory(null)} // ✅ reset edit
      />

      <CategoryTable
        categories={categories}
        onEdit={setSelectedCategory}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default Categories;