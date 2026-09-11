import React from "react";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import "./App.css";

function App() {
const css = {
  textDecoration: "none"
};
  return (
    <div className="app-container">
      {/* Top Navbar */}
      <nav className="navbar">
        <Link to="/" className="navbar-brand" style={css}>
          <span className="brand-name">P & C</span>
        </Link>

        <div className="navbar-links">
          <NavLink
            to="/products"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            Products
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            Categories
          </NavLink>
        </div>
      </nav>

      {/* Main Body Content */}
      <main className="main-content">
        <Routes>
          {/* Home / Dashboard Route */}
          <Route
            path="/"
            element={
              <div className="dashboard-hero">
                <div className="hero-card">
                  <h1>Welcome to Category and Product Portal</h1>
                  <p>
                    Manage your store inventory, structure categories, and update details efficiently.
                  </p>

                  <div className="hero-actions">
                    <Link to="/products" className="btn btn-primary" >
                      Manage Products
                    </Link>
                    <Link to="/categories" className="btn btn-outline">
                      Manage Categories
                    </Link>
                  </div>
                </div>

                <div className="stats-grid">
                  <Link to="/products" className="stat-card">
                    <h3>Products</h3>
                    <p>View and manage product catalog</p>
                  </Link>
                  <Link to="/categories" className="stat-card">
                    <h3>Categories</h3>
                    <p>Organize product classifications</p>
                  </Link>
                </div>
              </div>
            }
          />

          {/* Page Routes */}
          <Route
            path="/products"
            element={
              <section className="page-wrapper">
                <Products />
              </section>
            }
          />
          <Route
            path="/categories"
            element={
              <section className="page-wrapper">
                <Categories />
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;