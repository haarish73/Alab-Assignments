import React, { useEffect, useState } from "react";
import API from "../services/api";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import Swal from "sweetalert2";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // DELETE
const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    await API.delete(`/products/${id}`);

    Swal.fire("Deleted!", "Product has been deleted.", "success");
    fetchProducts();
  }
};

  // STATUS CHANGE
const handleStatusChange = async (id, status) => {
  await API.patch(`/products/${id}/status`, { status });

  Swal.fire({
    icon: "success",
    title: "Updated",
    text: `Status changed to ${status}`,
    timer: 1200,
    showConfirmButton: false,
  });

  fetchProducts();
};

  return (
    <div>
      <ProductForm
        selectedProduct={selectedProduct}
        refreshProducts={fetchProducts}
      />

      <ProductTable
        products={products}
        onEdit={setSelectedProduct}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default Products;