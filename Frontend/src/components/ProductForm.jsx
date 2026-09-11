import React, { useState, useEffect } from "react";
import API from "../services/api";
import "../css/ProductForm.css";
import Swal from "sweetalert2";

const INITIAL_STATE = {
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    status: "active",
    image: "",
};

const ProductForm = ({ selectedProduct, refreshProducts, onCancel }) => {
    const [form, setForm] = useState(INITIAL_STATE);
    const [categories, setCategories] = useState([]);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await API.get("/categories");
                setCategories(res.data);
            } catch (err) {
                console.error("Failed to load categories", err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedProduct) {
            setForm(selectedProduct);
            if (selectedProduct.image) {
                setPreview(
                    selectedProduct.image.startsWith("http")
                        ? selectedProduct.image
                        : `http://localhost:5000/uploads/${selectedProduct.image}`
                );
            } else {
                setPreview(null);
            }
        } else {
            setForm(INITIAL_STATE);
            setPreview(null);
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        if (name === "image") {
            setPreview(value);
            setFile(null); // clear file if URL used
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));

            // ✅ clear URL when file is selected
            setForm((prev) => ({
                ...prev,
                image: "",
            }));
        }
    };

    const handleReset = () => {
        setForm(INITIAL_STATE);
        setFile(null);
        setPreview(null);
        if (onCancel) onCancel();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (file) {
                const data = new FormData();
                Object.keys(form).forEach((key) => {
                    data.append(key, form[key]);
                });
                data.append("image", file);

                if (form.id) {
                    await API.put(`/products/${form.id}`, data);
                } else {
                    await API.post("/products", data);
                }
            } else {
                if (form.id) {
                    await API.put(`/products/${form.id}`, form);
                } else {
                    await API.post("/products", form);
                }
            }

            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Product saved successfully",
            });
            refreshProducts();
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
        <form className="product-form" onSubmit={handleSubmit}>
            <h2>{form.id ? "Edit Product" : "Add Product"}</h2>

            <div className="form-group">
                <label className="form-label" htmlFor="name">Product Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="e.g. Wireless Headphones"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Write product description..."
                    rows="3"
                    value={form.description}
                    onChange={handleChange}
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label className="form-label" htmlFor="price">Price ($)</label>
                    <input
                        id="price"
                        type="number"
                        step="0.01"
                        name="price"
                        placeholder="0.00"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="stock">Stock Quantity</label>
                    <input
                        id="stock"
                        type="number"
                        name="stock"
                        placeholder="0"
                        value={form.stock}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="category_id">Category</label>
                <select
                    id="category_id"
                    name="category_id"
                    value={form.category_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
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

            <div className="form-group">
                <label className="form-label">Product Image</label>
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL (e.g. https://...)"
                    value={form.image}
                    onChange={handleChange}
                />
                <div className="file-upload-wrapper">
                    <span className="divider-text">OR upload file</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                {(preview || form.image) && (
                    <div className="image-preview">
                        <img
                            src={
                                preview
                                    ? preview
                                    : form.image?.startsWith("http")
                                        ? form.image
                                        : `http://localhost:5000/uploads/${form.image}`
                            }
                            alt="Product Preview"
                        />
                    </div>
                )}
            </div>

            <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                    {form.id ? "Update Product" : "Create Product"}
                </button>
                {form.id && (
                    <button type="button" className="btn btn-secondary" onClick={handleReset}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default ProductForm;