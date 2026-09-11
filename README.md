<img width="1297" height="531" alt="image" src="https://github.com/user-attachments/assets/e58e7fd3-7a74-4aaa-950b-131828e5af07" /># 🛒 MERN Product Management Application

A full-stack product management system built using the MERN stack. This application allows users to manage products and categories with features like adding, updating, and viewing product details.

---

## 📸 Screenshots

### 🏠 Product Listing Page

<img width="1297" height="531" alt="image" src="https://github.com/user-attachments/assets/2ec34632-8a99-4fe1-b877-b855b54fa575" />


### ➕ Add Product

<img width="652" height="847" alt="image" src="https://github.com/user-attachments/assets/7c100538-4dd4-48bd-949b-19c1ad836694" />
<img width="710" height="777" alt="image" src="https://github.com/user-attachments/assets/50a7aa64-3363-4dc4-acd9-264114f872ab" />



### 📂 Category Management

![Category](./screenshots/category.png)

### ✏️ Edit Product

![Edit Product](./screenshots/edit-product.png)

---

## 🚀 Tech Stack

### Frontend

* React.js
* CSS / Custom Styling
* SweetAlert2 (for alerts & notifications)

### Backend

* Node.js
* Express.js

### Database

* MySQL (using `mysql2`)

---

## ⚙️ Features

* ➕ Add new products
* 📝 Update product details
* 📦 Manage product categories
* 🔍 View product listings
* 🖼️ Upload product images
* 📊 Track stock and pricing
* 🟢 Active / Inactive status management
* 🔔 Interactive alerts using SweetAlert (success, error, confirmation)

---

## 📂 Project Structure

```
project-root/
│
├── Frontend/               
│   ├── src/
│   └── public/
│
├── Backend/               
│   ├── config/           
│   ├── routes/           
│   ├── controllers/      
│   └──            
│
├── screenshots/           
│   ├── product-list.png
│   ├── add-product.png
│   ├── category.png
│   └── edit-product.png
│
├── .gitignore
├── package.json
└── README.md
```

---

## 🧾 Product Schema

```json
{
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse",
  "price": 25.99,
  "stock": 100,
  "category": "Accessories",
  "status": "Active",
  "image": "image-url"
}
```

---

## 🧾 Category Schema

```json
{
  "name": "Accessories",
  "status": "Active"
}
```

---

## 🔌 API Endpoints

### Product Routes

* `POST /api/products` → Create product
* `GET /api/products` → Get all products
* `PUT /api/products/:id` → Update product
* `DELETE /api/products/:id` → Delete product

### Category Routes

* `POST /api/categories` → Create category
* `GET /api/categories` → Get all categories

---

## 🗄️ Database Configuration

```js
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_password",
  database: "alab_db"
});

db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;
```

---

## 🔒 Environment Setup

Create a `.env` file in the server directory:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=alab_db
PORT=5000
```

---

## 📦 Installation & Setup

### 1. Clone the repository

```
git clone <your-repo-url>
cd project-root
```

### 2. Install dependencies

#### Backend

```
cd backend
npm install
```

#### Frontend

```
cd Frontend
npm install
```

---

### 3. Run the application

#### Start Backend

```
cd backend
npm start
```

#### Start Frontend

```
cd Frontend
npm start
```

---

## 🚫 .gitignore (Important)

```
node_modules/
.env
config/db.js
```

---

## 📌 Future Improvements

* 🔐 Authentication & Authorization (JWT)
* 📈 Dashboard analytics
* 🛍️ Order management system
* ☁️ Cloud image upload (AWS / Cloudinary)
* 🔄 Pagination & filtering

---

## 👨‍💻 Author

Developed by Harish Khan
