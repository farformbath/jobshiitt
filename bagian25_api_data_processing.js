// BAGIAN 25 — API Data Processing

const { fetchProducts, fallbackProducts } = require("./bagian24_fetch_api.js");

/*
   Konsep Dasar:
   Setelah data produk berhasil diambil dari API (DummyJSON), data tersebut
   harus diolah, disaring, diagregasi, dan dianalisis sebelum disajikan ke user.
*/

/*
   25.1 — Statistics:
   Menghitung total products, average price, highest price, lowest price,
   total stock, dan average rating.
*/
function calculateApiStatistics(products = []) {
  if (!products.length) return null;

  const totalProducts = products.length;
  const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const totalRating = products.reduce((sum, p) => sum + (p.rating || 0), 0);

  const prices = products.map((p) => p.price);
  const highestPrice = Math.max(...prices);
  const lowestPrice = Math.min(...prices);

  return {
    totalProducts,
    averagePrice: Number((totalPrice / totalProducts).toFixed(2)),
    highestPrice,
    lowestPrice,
    totalStock,
    averageRating: Number((totalRating / totalProducts).toFixed(2)),
  };
}

/*
   25.2 — Category Analytics:
   Untuk setiap kategori, hitung:
   - Jumlah produk
   - Rata-rata harga
   - Rata-rata rating
   - Total stok
*/
function calculateCategoryAnalytics(products = []) {
  // 1. Kelompokkan produk berdasarkan kategori menggunakan Map / Reduce
  const grouped = products.reduce((acc, p) => {
    acc[p.category] = acc[p.category] || [];
    acc[p.category].push(p);
    return acc;
  }, {});

  // 2. Agregasi metrik untuk setiap kategori
  const analytics = [];
  for (const [category, items] of Object.entries(grouped)) {
    const totalItems = items.length;
    const totalStock = items.reduce((sum, p) => sum + (p.stock || 0), 0);
    const avgPrice = items.reduce((sum, p) => sum + p.price, 0) / totalItems;
    const avgRating = items.reduce((sum, p) => sum + (p.rating || 0), 0) / totalItems;

    analytics.push({
      Kategori: category,
      "Jumlah Produk": totalItems,
      "Rata-rata Harga": `$${avgPrice.toFixed(2)}`,
      "Rata-rata Rating": avgRating.toFixed(2),
      "Total Stok": totalStock,
    });
  }

  // Urutkan kategori berdasarkan jumlah produk terbanyak
  return analytics.sort((a, b) => b["Jumlah Produk"] - a["Jumlah Produk"]);
}

/*
   25.3 — Product Search dengan Tiga Mode:
   1. Exact Search           : Judul harus sama persis
   2. Partial Search         : Judul mengandung substring keyword (case-sensitive)
   3. Case-Insensitive Search: Judul mengandung keyword tanpa membedakan huruf besar/kecil
*/
function searchProducts(products = [], keyword = "", mode = "case-insensitive") {
  if (!keyword.trim()) return products;

  switch (mode) {
    case "exact":
      return products.filter((p) => p.title === keyword);

    case "partial":
      return products.filter((p) => p.title.includes(keyword));

    case "case-insensitive":
    default: {
      const lower = keyword.toLowerCase();
      return products.filter((p) => p.title.toLowerCase().includes(lower));
    }
  }
}

async function runDataProcessingPipeline() {
  console.log("=== BAGIAN 25: API Data Processing ===");

  let dataset;
  try {
    // Ambil 30 produk dari API DummyJSON
    dataset = await fetchProducts(30);
  } catch (error) {
    console.warn("Gagal terhubung ke DummyJSON, menggunakan fallback dataset.");
    dataset = fallbackProducts;
  }

  // 25.1 Tampilkan Ringkasan Statistik
  console.log("\n25.1 — Ringkasan Statistik Produk:");
  const stats = calculateApiStatistics(dataset);
  console.table([stats]);

  // 25.2 Tampilkan Analisis Kategori
  console.log("\n25.2 — Category Analytics:");
  const categoryAnalytics = calculateCategoryAnalytics(dataset);
  console.table(categoryAnalytics);

  // 25.3 Demonstrasi Tiga Mode Pencarian
  console.log("\n25.3 — Pengujian Tiga Mode Pencarian:");

  const keywordTest = "Essence";
  const exactResults = searchProducts(dataset, keywordTest, "exact");
  const partialResults = searchProducts(dataset, "essence", "partial"); // huruf kecil
  const caseInsensitiveResults = searchProducts(dataset, "essence", "case-insensitive");

  console.log(`\nKeyword: "${keywordTest}" (Mode: EXACT) -> Hasil: ${exactResults.length} produk`);
  console.log(`Keyword: "essence" (Mode: PARTIAL / Case-Sensitive) -> Hasil: ${partialResults.length} produk`);
  console.log(`Keyword: "essence" (Mode: CASE-INSENSITIVE) -> Hasil: ${caseInsensitiveResults.length} produk`);

  if (caseInsensitiveResults.length > 0) {
    console.log("Contoh produk ditemukan:", caseInsensitiveResults[0].title);
  }
}

if (require.main === module) {
  runDataProcessingPipeline();
}

module.exports = {
  calculateApiStatistics,
  calculateCategoryAnalytics,
  searchProducts,
  runDataProcessingPipeline,
};
