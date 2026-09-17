// BAGIAN 9 — Grouping dan Aggregation

// Dataset produk untuk pengolahan
const products = [
  { id: 1, title: "Laptop", price: 1200, category: "laptops", stock: 5, rating: 4.5, brand: "TechPro" },
  { id: 2, title: "Smartphone", price: 800, category: "phones", stock: 15, rating: 4.2, brand: "SmartCorp" },
  { id: 3, title: "Headphones", price: 100, category: "audio", stock: 3, rating: 4.0, brand: "SoundWave" },
  { id: 4, title: "Wireless Mouse", price: 25, category: "accessories", stock: 40, rating: 4.3, brand: "ClickMaster" },
  { id: 5, title: "Mechanical Keyboard", price: 75, category: "accessories", stock: 12, rating: 4.6, brand: "ClickMaster" },
  { id: 6, title: "4K Monitor", price: 350, category: "monitors", stock: 8, rating: 4.1, brand: "ViewSharp" },
  { id: 7, title: "Gaming Chair", price: 220, category: "furniture", stock: 6, rating: 3.9, brand: "ComfySit" },
  { id: 8, title: "Tablet", price: 450, category: "tablets", stock: 9, rating: 4.4, brand: "SmartCorp" },
  { id: 9, title: "Smartwatch", price: 199, category: "wearables", stock: 2, rating: 4.0, brand: "TechPro" },
  { id: 10, title: "Bluetooth Speaker", price: 60, category: "audio", stock: 20, rating: 4.2, brand: "SoundWave" },
  { id: 11, title: "External SSD 1TB", price: 110, category: "storage", stock: 18, rating: 4.5, brand: "FastDrive" },
  { id: 12, title: "Webcam HD", price: 45, category: "accessories", stock: 7, rating: 3.8, brand: "ViewSharp" },
  { id: 13, title: "Printer Laser", price: 180, category: "office", stock: 4, rating: 4.1, brand: "PrintCorp" },
  { id: 14, title: "Router WiFi 6", price: 130, category: "networking", stock: 11, rating: 4.3, brand: "NetSpeed" },
  { id: 15, title: "Power Bank 20000mAh", price: 35, category: "accessories", stock: 50, rating: 4.4, brand: "PowerUp" },
  { id: 16, title: "Gaming Laptop", price: 1800, category: "laptops", stock: 3, rating: 4.7, brand: "TechPro" },
  { id: 17, title: "Earbuds Wireless", price: 89, category: "audio", stock: 25, rating: 4.2, brand: "SoundWave" },
  { id: 18, title: "Desk Lamp LED", price: 20, category: "furniture", stock: 30, rating: 3.7, brand: "ComfySit" },
  { id: 19, title: "Graphics Tablet", price: 150, category: "accessories", stock: 5, rating: 4.0, brand: "DrawTech" },
  { id: 20, title: "Action Camera", price: 250, category: "cameras", stock: 6, rating: 4.3, brand: "CamPro" },
  { id: 21, title: "Mini Projector", price: 210, category: "electronics", stock: 4, rating: 4.1, brand: "ViewSharp" },
  { id: 22, title: "Standing Desk", price: 320, category: "furniture", stock: 2, rating: 4.0, brand: "ComfySit" },
  { id: 23, title: "Noise Cancelling Headphones", price: 199, category: "audio", stock: 9, rating: 4.6, brand: "SoundWave" },
  { id: 24, title: "Smart Home Hub", price: 90, category: "electronics", stock: 14, rating: 4.2, brand: "SmartCorp" },
  { id: 25, title: "Curved Monitor", price: 400, category: "monitors", stock: 5, rating: 4.4, brand: "ViewSharp" },
  { id: 26, title: "USB-C Hub", price: 30, category: "accessories", stock: 60, rating: 3.9, brand: "ClickMaster" },
  { id: 27, title: "Portable SSD 2TB", price: 190, category: "storage", stock: 8, rating: 4.3, brand: "FastDrive" },
  { id: 28, title: "Fitness Tracker", price: 55, category: "wearables", stock: 22, rating: 4.1, brand: "TechPro" },
  { id: 29, title: "VR Headset", price: 399, category: "electronics", stock: 3, rating: 4.5, brand: "TechPro" },
  { id: 30, title: "Office Chair", price: 175, category: "furniture", stock: 7, rating: 4.0, brand: "ComfySit" },
];

/*
   Latihan 9.1 — Mengelompokkan Produk Berdasarkan Kategori
   Mengubah array products menjadi objek { [category]: Product[] }
   menggunakan reduce() dengan accumulator berupa objek.
*/
function groupByCategory(products) {
  return products.reduce((groups, product) => {
    const key = product.category;
    if (!groups[key]) groups[key] = [];
    groups[key].push(product);
    return groups;
  }, {});
}

/*
   Latihan 9.2 — Ringkasan Jumlah Produk per Kategori dalam Format Tabel
   Dari hasil grouping di atas, tampilkan ringkasan jumlah produk per kategori.
*/
function summarizeCategories(groupedProducts) {
  const summary = [];
  for (const category in groupedProducts) {
    const items = groupedProducts[category];
    const totalStock = items.reduce((sum, p) => sum + p.stock, 0);
    const avgPrice = items.reduce((sum, p) => sum + p.price, 0) / items.length;

    summary.push({
      Kategori: category,
      "Jumlah Produk": items.length,
      "Total Stok": totalStock,
      "Rata-rata Harga": `$${avgPrice.toFixed(2)}`,
    });
  }
  return summary;
}

if (require.main === module) {
  const grouped = groupByCategory(products);
  console.log("=== Hasil Grouping Berdasarkan Category ===");
  console.log(Object.keys(grouped)); // Daftar seluruh kategori yang ditemukan
  console.log("Contoh isi grup 'laptops':", grouped["laptops"].map((p) => p.title));

  const categoryTable = summarizeCategories(grouped);
  console.log("\n=== Tabel Ringkasan Jumlah Produk per Kategori ===");
  console.table(categoryTable);
}

module.exports = { products, groupByCategory, summarizeCategories };
