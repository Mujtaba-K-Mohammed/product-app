# Product App

A simple React + Vite application that displays products fetched from the DummyJSON API.  
The app shows product details such as title, price, image, and description.

---

## 🚀 Live Demo

https://product-app-blond-six.vercel.app/

---

## 📦 Features

- Fetch products from DummyJSON API
- Display product list
- Show product details
- Responsive UI
- Fast performance using Vite

---

## 🛠 Technologies Used

- React.js
- Vite
- JavaScript (ES6+)
- CSS
- DummyJSON API

---

## 📁 Project Structure

```
src/
  components/
  pages/
  App.jsx
public/
index.html
package.json
vite.config.js
```

---

## 🧩 How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Mujtaba-K-Mohammed/product-app.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Preview production build

```bash
npm run preview
```

---

## 🌐 Deployment (Vercel)

The project is deployed using Vercel.

Build settings:

- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Root Directory:** `/`

---

## ✔ Notes

- Removed `base` from `vite.config.js` to ensure Vercel loads assets correctly.
- The project works fully on Vercel without routing or asset-loading issues.
