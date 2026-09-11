const db = require("../config/db");

// CREATE
exports.createCategory = (req, res) => {
  const { name, status } = req.body;

  const sql = "INSERT INTO categories (name, status) VALUES (?, ?)";
  db.query(sql, [name, status], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: "Category created" });
  });
};

// GET ALL
exports.getCategories = (req, res) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// UPDATE
exports.updateCategory = (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;

  const sql = "UPDATE categories SET name=?, status=? WHERE id=?";
  db.query(sql, [name, status, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Category updated" });
  });
};

// DELETE
exports.deleteCategory = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM categories WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Category deleted" });
  });
};