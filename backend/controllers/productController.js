const db = require("../config/db");

// CREATE PRODUCT
exports.createProduct = (req, res) => {
  const {
    name,
    description,
    price,
    stock,
    category_id,
    status,
  } = req.body;

  const image = req.file
  ? req.file.filename
  : req.body.image || null;

  const sql = `
    INSERT INTO products 
    (name, description, price, stock, category_id, status, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, description, price, stock, category_id, status, image],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Product created" });
    }
  );
};

// GET ALL PRODUCTS (with category)
exports.getProducts = (req, res) => {
  const sql = `
    SELECT p.*, c.name AS category_name 
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// GET SINGLE PRODUCT
exports.getProductById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT p.*, c.name AS category_name 
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};

// UPDATE PRODUCT
exports.updateProduct = (req, res) => {
  const { id } = req.params;

  const {
    name,
    description,
    price,
    stock,
    category_id,
    status,
  } = req.body;

  const image = req.file
  ? req.file.filename
  : req.body.image || null;

  let sql = `
    UPDATE products SET 
    name=?, description=?, price=?, stock=?, category_id=?, status=?
  `;

  let values = [name, description, price, stock, category_id, status];

  if (image) {
    sql += ", image=?";
    values.push(image);
  }

  sql += " WHERE id=?";
  values.push(id);

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product updated" });
  });
};

// DELETE PRODUCT
exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM products WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product deleted" });
  });

  
};
// update product status


exports.updateProductStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.query(
    "UPDATE products SET status=? WHERE id=?",
    [status, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Status updated" });
    }
  );
};