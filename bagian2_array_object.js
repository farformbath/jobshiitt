/*
   BAGIAN 2 — Data Representation dan Array of Objects

   * Dataset Produk (Tingkat Awal) 
*/
const products = [
  { id: 1, title: "Laptop", price: 1200, category: "laptops", stock: 5 },
  { id: 2, title: "Smartphone", price: 800, category: "phones", stock: 15 },
  { id: 3, title: "Headphones", price: 100, category: "audio", stock: 3 },
  { id: 4, title: "Wireless Mouse", price: 25, category: "accessories", stock: 40 },
  { id: 5, title: "Mechanical Keyboard", price: 75, category: "accessories", stock: 12 },
  { id: 6, title: "4K Monitor", price: 350, category: "monitors", stock: 8 },
  { id: 7, title: "Gaming Chair", price: 220, category: "furniture", stock: 6 },
  { id: 8, title: "Tablet", price: 450, category: "tablets", stock: 9 },
  { id: 9, title: "Smartwatch", price: 199, category: "wearables", stock: 2 },
  { id: 10, title: "Bluetooth Speaker", price: 60, category: "audio", stock: 20 },
  { id: 11, title: "External SSD 1TB", price: 110, category: "storage", stock: 18 },
  { id: 12, title: "Webcam HD", price: 45, category: "accessories", stock: 7 },
  { id: 13, title: "Printer Laser", price: 180, category: "office", stock: 4 },
  { id: 14, title: "Router WiFi 6", price: 130, category: "networking", stock: 11 },
  { id: 15, title: "Power Bank 20000mAh", price: 35, category: "accessories", stock: 50 },
  { id: 16, title: "Gaming Laptop", price: 1800, category: "laptops", stock: 3 },
  { id: 17, title: "Earbuds Wireless", price: 89, category: "audio", stock: 25 },
  { id: 18, title: "Desk Lamp LED", price: 20, category: "furniture", stock: 30 },
  { id: 19, title: "Graphics Tablet", price: 150, category: "accessories", stock: 5 },
  { id: 20, title: "Action Camera", price: 250, category: "cameras", stock: 6 },
  { id: 21, title: "Mini Projector", price: 210, category: "electronics", stock: 4 },
  { id: 22, title: "Standing Desk", price: 320, category: "furniture", stock: 2 },
  { id: 23, title: "Noise Cancelling Headphones", price: 199, category: "audio", stock: 9 },
  { id: 24, title: "Smart Home Hub", price: 90, category: "electronics", stock: 14 },
  { id: 25, title: "Curved Monitor", price: 400, category: "monitors", stock: 5 },
  { id: 26, title: "USB-C Hub", price: 30, category: "accessories", stock: 60 },
  { id: 27, title: "Portable SSD 2TB", price: 190, category: "storage", stock: 8 },
  { id: 28, title: "Fitness Tracker", price: 55, category: "wearables", stock: 22 },
  { id: 29, title: "VR Headset", price: 399, category: "electronics", stock: 3 },
  { id: 30, title: "Office Chair", price: 175, category: "furniture", stock: 7 },
];

//Latihan 2.1 — Mencari Produk
function findProductById(products, id) {
  return products.find((p) => p.id === id);
}

console.log(findProductById(products, 9));
// Hasilnya akan = { id: 9, title: 'Smartwatch', price: 199, category: 'wearables', stock: 2 }

console.log(findProductById(products, 999));
// Hasilnnya akan = undefined


//Latihan 2.2 — Stok Menipis
function getLowStockProducts(products) {
  return products.filter((p) => p.stock < 10);
}

console.log(getLowStockProducts(products));
// Semua produk dengan stock < 10 (Laptop, Headphones, Gaming Chair,
// yakni Tablet, Smartwatch, Printer Laser, dst.)


//Latihan 2.3 — Mengubah Data Tanpa Mutasi (immutability)
function updateStock(products, id, newStock) {
  return products.map((p) =>
    p.id === id ? { ...p, stock: newStock } : p
  );
}

const updatedProducts = updateStock(products, 9, 100);
console.log(updatedProducts.find((p) => p.id === 9));
// Hasilnya akan = { id: 9, title: 'Smartwatch', price: 199, category: 'wearables', stock: 100 }

console.log(products.find((p) => p.id === 9).stock);
// Hasilnya akan = 2 -> array asli tidak berubah, ini membuktikan immutability terjaga

module.exports = { products, findProductById, getLowStockProducts, updateStock };
