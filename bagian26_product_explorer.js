// BAGIAN 26 — Product Explorer: Aplikasi Akhir Terintegrasi
// & Algoritma Lanjutan, Debugging Lab, Tugas Individu, Analisis

const { fetchProducts, fallbackProducts } = require("./bagian24_fetch_api.js");
const { Stack } = require("./bagian13_stack.js");
const { Queue } = require("./bagian14_queue.js");

/*
   ==========================================================================
   1. CORE APPLICATION: STATE MANAGEMENT & DATA STRUCTURES
   ==========================================================================
*/

const state = {
  products: [],
  filteredProducts: [],
  search: "",
  category: "all",
  sortBy: "default", // default, price-asc, price-desc, rating, title
  favorites: new Set(), // Struktur data Set untuk menyimpan ID favorit tanpa duplikasi
  searchHistory: new Stack(), // Struktur data Stack untuk fitur LIFO search history & undo
  productLookup: new Map(), // Struktur data Map untuk pencarian instan O(1) by ID
  status: "idle", // idle, loading, success, error, empty
  errorMessage: null,
  analytics: null,
};

/*
   Pipeline Filter & Transformasi Multi-Kriteria
*/
function applyFilters(products, filters = {}) {
  let result = [...products];

  // 1. Search filter (case-insensitive keyword)
  if (filters.search && filters.search.trim() !== "") {
    const keyword = filters.search.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(keyword) ||
        (p.description && p.description.toLowerCase().includes(keyword))
    );
  }

  // 2. Category filter
  if (filters.category && filters.category !== "all") {
    result = result.filter((p) => p.category === filters.category);
  }

  // 3. Price range filter
  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice);
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice);
  }

  // 4. Rating filter
  if (filters.minRating !== undefined) {
    result = result.filter((p) => (p.rating || 0) >= filters.minRating);
  }

  // 5. Stock filter
  if (filters.minStock !== undefined) {
    result = result.filter((p) => (p.stock || 0) >= filters.minStock);
  }

  // 6. Sorting
  switch (filters.sortBy) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case "title":
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      result.sort((a, b) => a.id - b.id);
      break;
  }

  return result;
}

/*
   Hitung Statistik Dashboard
*/
function computeDashboardStats(products) {
  if (!products.length) return null;
  const totalProducts = products.length;
  const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const totalRating = products.reduce((sum, p) => sum + (p.rating || 0), 0);

  return {
    totalProducts,
    averagePrice: `$${(totalPrice / totalProducts).toFixed(2)}`,
    totalStock,
    averageRating: `⭐ ${(totalRating / totalProducts).toFixed(2)}`,
  };
}

/*
   Rendering UI Simulator (Node.js & Browser)
*/
function renderUI() {
  console.log(`\n======================================================`);
  console.log(`[STATUS APLIKASI: ${state.status.toUpperCase()}]`);

  if (state.status === "loading") {
    console.log("⏳ Sedang memuat produk dari DummyJSON API...");
    return;
  }

  if (state.status === "error") {
    console.log(`❌ Error: ${state.errorMessage}`);
    return;
  }

  if (state.status === "empty") {
    console.log(`⚠️ Tidak ada produk yang sesuai dengan kriteria filter saat ini.`);
    return;
  }

  // Tampilkan Ringkasan Dashboard
  const stats = computeDashboardStats(state.filteredProducts);
  console.log("📊 [STATISTICS SUMMARY]");
  console.table([stats]);

  // Tampilkan 5 Produk Teratas
  console.log(`📦 [DAFTAR PRODUK (${state.filteredProducts.length} Produk Ditemukan)]`);
  console.table(
    state.filteredProducts.slice(0, 5).map((p) => ({
      ID: p.id,
      Title: p.title.slice(0, 25),
      Category: p.category,
      Price: `$${p.price}`,
      Rating: p.rating,
      Stock: p.stock,
      Favorit: state.favorites.has(p.id) ? "❤️ YA" : "🤍 TIDAK",
    }))
  );
  if (state.filteredProducts.length > 5) {
    console.log(`... dan ${state.filteredProducts.length - 5} produk lainnya.`);
  }

  console.log(`📌 Filter Aktif -> Search: "${state.search}", Category: "${state.category}", Sort: "${state.sortBy}"`);
  console.log(`❤️ Total Produk Favorit (Set): ${state.favorites.size} produk`);
  console.log(`======================================================`);
}

/*
   Inisialisasi Aplikasi & Fetch Data
*/
async function initializeProductExplorer() {
  state.status = "loading";
  renderUI();

  try {
    const rawProducts = await fetchProducts(30);
    state.products = rawProducts;

    // Bangun Map Lookup untuk akses O(1)
    state.productLookup.clear();
    for (const p of rawProducts) {
      state.productLookup.set(p.id, p);
    }

    state.filteredProducts = applyFilters(state.products, {
      search: state.search,
      category: state.category,
      sortBy: state.sortBy,
    });

    state.status = state.filteredProducts.length > 0 ? "success" : "empty";
  } catch (err) {
    state.status = "error";
    state.errorMessage = err.message;
  } finally {
    renderUI();
  }
}

// Fitur Interaktif Tambahan (Tugas Individu)
function setSearchKeyword(keyword) {
  if (state.search) {
    state.searchHistory.push(state.search); // Simpan kata kunci lama ke Stack
  }
  state.search = keyword;
  state.filteredProducts = applyFilters(state.products, {
    search: state.search,
    category: state.category,
    sortBy: state.sortBy,
  });
  state.status = state.filteredProducts.length ? "success" : "empty";
  renderUI();
}

function undoSearch() {
  if (state.searchHistory.isEmpty()) {
    console.log("[Undo Search] Tidak ada riwayat pencarian sebelumnya di Stack.");
    return;
  }
  const previous = state.searchHistory.pop();
  console.log(`[Undo Search] Mengembalikan kata kunci ke: "${previous}"`);
  state.search = previous;
  state.filteredProducts = applyFilters(state.products, {
    search: state.search,
    category: state.category,
    sortBy: state.sortBy,
  });
  state.status = state.filteredProducts.length ? "success" : "empty";
  renderUI();
}

function toggleFavorite(productId) {
  if (state.favorites.has(productId)) {
    state.favorites.delete(productId);
    console.log(`[Favorites Set] Menghapus ID ${productId} dari favorit.`);
  } else {
    state.favorites.add(productId);
    console.log(`[Favorites Set] Menambahkan ID ${productId} ke favorit.`);
  }
  renderUI();
}

/*
   ==========================================================================
   2. ALGORITHM CHALLENGES (CHALLENGE 1 - 5)
   ==========================================================================
*/

function runAlgorithmChallenges(products) {
  console.log("\n========================================================");
  console.log("       SOLUSI ALGORITHM CHALLENGE (JOBSHEET P. 21)      ");
  console.log("========================================================");

  // Challenge 1 — Top 5 Products by Rating
  const top5Products = [...products]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);
  console.log("\n🏆 Challenge 1 — 5 Produk Rating Tertinggi:");
  console.table(top5Products.map((p) => ({ ID: p.id, Title: p.title, Rating: p.rating, Price: `$${p.price}` })));

  // Challenge 2 — Most Expensive Category (Average Price)
  const catGroups = products.reduce((acc, p) => {
    acc[p.category] = acc[p.category] || [];
    acc[p.category].push(p.price);
    return acc;
  }, {});
  const catAvgPrices = Object.entries(catGroups).map(([cat, prices]) => ({
    Kategori: cat,
    RataRataHarga: prices.reduce((a, b) => a + b, 0) / prices.length,
  }));
  catAvgPrices.sort((a, b) => b.RataRataHarga - a.RataRataHarga);
  console.log(`\n💰 Challenge 2 — Kategori Termahal: ${catAvgPrices[0].Kategori} (Rata-rata: $${catAvgPrices[0].RataRataHarga.toFixed(2)})`);

  // Challenge 3 — Duplicate Tags (Tag yang muncul di lebih dari 1 produk)
  const allTags = products.flatMap((p) => p.tags || []);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
  const duplicateTags = Object.entries(tagCounts)
    .filter(([_, count]) => count > 1)
    .map(([tag, count]) => ({ Tag: tag, Muncul: count }));
  console.log("\n🏷️ Challenge 3 — Tag Duplikat (> 1 Produk):");
  console.table(duplicateTags.slice(0, 8));

  // Challenge 4 — Stock Analysis (Kategori dengan total stock terbesar)
  const catStock = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + (p.stock || 0);
    return acc;
  }, {});
  const sortedCatStock = Object.entries(catStock).sort((a, b) => b[1] - a[1]);
  console.log(`\n📦 Challenge 4 — Kategori Total Stok Terbesar: ${sortedCatStock[0][0]} (${sortedCatStock[0][1]} unit)`);

  // Challenge 5 — Search Ranking (Scoring System: Exact > Partial > Rating)
  function searchWithRanking(items, keyword) {
    const lowerKey = keyword.toLowerCase().trim();
    return items
      .map((p) => {
        let score = 0;
        const lowerTitle = p.title.toLowerCase();
        if (lowerTitle === lowerKey) {
          score += 100; // Exact match mendapat skor tertinggi
        } else if (lowerTitle.includes(lowerKey)) {
          score += 50; // Partial match
        }
        // Rating sebagai tie-breaker penentu
        score += (p.rating || 0) * 2;
        return { ...p, relevanceScore: score };
      })
      .filter((p) => p.relevanceScore > 10)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  const rankedResults = searchWithRanking(products, "essence");
  console.log("\n🔍 Challenge 5 — Hasil Search Ranking untuk 'essence':");
  console.table(
    rankedResults.slice(0, 3).map((p) => ({
      Title: p.title,
      Skor: p.relevanceScore,
      Rating: p.rating,
    }))
  );
}

/*
   ==========================================================================
   3. ADVANCED CHALLENGE: PERFORMANCE BENCHMARK (JOBSHEET P. 22)
   ==========================================================================
*/

function runPerformanceBenchmark() {
  console.log("\n========================================================");
  console.log("    PERFORMANCE BENCHMARK: NESTED FIND VS MAP LOOKUP     ");
  console.log("========================================================");

  // Generate 10.000 data
  const largeDataset = [];
  for (let i = 1; i <= 10000; i++) {
    largeDataset.push({
      id: i,
      title: `Product ${i}`,
      category: `category-${i % 20}`,
      price: Math.floor(Math.random() * 1000),
    });
  }

  // Generate 1.000 query acak
  const queryIds = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 10000) + 1);

  // Approach A: Array.prototype.find() repetitif 1000x (O(n * m))
  const startA = performance.now();
  let foundA = 0;
  for (const qId of queryIds) {
    const item = largeDataset.find((p) => p.id === qId);
    if (item) foundA++;
  }
  const endA = performance.now();
  const timeA = endA - startA;

  // Approach B: Bangun Map sekali lalu .get() 1000x (O(n + m))
  const startB = performance.now();
  const lookupMap = new Map();
  for (const p of largeDataset) {
    lookupMap.set(p.id, p);
  }
  let foundB = 0;
  for (const qId of queryIds) {
    const item = lookupMap.get(qId);
    if (item) foundB++;
  }
  const endB = performance.now();
  const timeB = endB - startB;

  console.log(`Approach A (Array.find() 1000x)     : ${timeA.toFixed(2)} ms`);
  console.log(`Approach B (Map Build + get 1000x)  : ${timeB.toFixed(2)} ms`);
  console.log(`Hasil: Pendekatan Map ${(timeA / timeB).toFixed(1)}x lebih cepat pada 10.000 data!`);
}

/*
   ==========================================================================
   4. DEBUGGING LAB (BUG 1 S/D BUG 7) (JOBSHEET P. 22-23)
   ==========================================================================
*/

function displayDebuggingLabSolutions() {
  console.log("\n========================================================");
  console.log("       DEBUGGING LAB SOLUTIONS (JOBSHEET P. 22-23)       ");
  console.log("========================================================");

  const bugs = [
    {
      no: 1,
      name: "Lupa Return",
      error: "Hasil function bernilai undefined (total stock tidak kembali).",
      penyebab: "Callback reduce memakai block body {} tanpa pernyataan 'return sum + p.stock', serta pemanggilan reduce di luar tidak di-return oleh function pembungkus.",
      solusi: "function getTotalStock(products) { return products.reduce((sum, p) => sum + p.stock, 0); }",
      penjelasan: "Nilai accumulator wajib di-return pada setiap iterasi reduce agar dapat diteruskan ke elemen berikutnya.",
    },
    {
      no: 2,
      name: "Salah Menggunakan map",
      error: "Menghasilkan array berisi boolean [true, false, ...] bukannya array of objects produk mahal.",
      penyebab: "map() digunakan untuk transformasi nilai elemen. Untuk menyaring (filter) berdasarkan kondisi boolean seharusnya memakai filter().",
      solusi: "const expensiveProducts = products.filter(p => p.price > 500);",
      penjelasan: "filter() hanya menyertakan elemen yang kondisinya menghasilkan nilai truthy.",
    },
    {
      no: 3,
      name: "Mutasi Array Tanpa Sengaja",
      error: "state.favorites termutasi langsung di memori (melanggar prinsip immutability).",
      penyebab: "Method .push() memodifikasi array asal secara in-place sehingga history state sebelumnya rusak.",
      solusi: "function addToFavorites(state, product) { return { ...state, favorites: [...state.favorites, product] }; }",
      penjelasan: "Gunakan spread operator [...] untuk membuat salinan array baru tanpa mengubah state lama.",
    },
    {
      no: 4,
      name: "Undefined karena Property Tidak Ada",
      error: "TypeError: Cannot read properties of undefined (reading 'width').",
      penyebab: "Nama properti di data objek adalah 'dimensions' (jamak), bukan 'dimension' (tunggal), atau produk tidak memiliki field dimensi.",
      solusi: "function getAverageDimension(product) { return ((product.dimensions?.width ?? 0) + (product.dimensions?.height ?? 0)) / 2; }",
      penjelasan: "Perbaiki nama field ke 'dimensions' dan gunakan optional chaining (?.) serta nullish coalescing (??) untuk keamanan data.",
    },
    {
      no: 5,
      name: "Async Function Tanpa await",
      error: "TypeError: data.json is not a function (karena data adalah objek Promise, bukan Response).",
      penyebab: "fetch() mengembalikan Promise. Jika tidak di-await, variabel data menampung Promise yang belum selesai, sehingga method .json() tidak dapat dipanggil langsung.",
      solusi: "async function loadProducts() { const response = await fetch('https://dummyjson.com/products'); return await response.json(); }",
      penjelasan: "Tambahkan await pada fetch() dan await pada response.json().",
    },
    {
      no: 6,
      name: "Salah Handling Response",
      error: "HTTP 404 Not Found tetapi kode mencoba mem-parse JSON sehingga data.products bernilai undefined.",
      penyebab: "URL typo ('productss') dan kode tidak memvalidasi response.ok sebelum membaca body response.",
      solusi: "async function getProducts() { const response = await fetch('https://dummyjson.com/products'); if (!response.ok) throw new Error(`HTTP Error: ${response.status}`); const data = await response.json(); return data.products; }",
      penjelasan: "Perbaiki typo URL dan lakukan pengecekan if (!response.ok) sebelum response.json().",
    },
    {
      no: 7,
      name: "Module Import Salah",
      error: "SyntaxError / TypeError: The requested module does not provide an export named 'default'.",
      penyebab: "algorithms.js mengekspor fungsi sebagai named export (export function linearSearch), sedangkan main.js mengimpornya sebagai default export (import linearSearch from ...).",
      solusi: "import { linearSearch } from './algorithms.js';",
      penjelasan: "Gunakan kurung kurawal { linearSearch } untuk mengimpor named export.",
    },
  ];

  for (const b of bugs) {
    console.log(`\n--- Bug ${b.no} — ${b.name} ---`);
    console.log(`Error Terjadi     : ${b.error}`);
    console.log(`Penyebab          : ${b.penyebab}`);
    console.log(`Perbaikan (Kode)  : ${b.solusi}`);
    console.log(`Penjelasan Solusi : ${b.penjelasan}`);
  }
}

/*
   ==========================================================================
   5. PERTANYAAN ANALISIS & REFLEKSI AKHIR (JOBSHEET P. 25-26)
   ==========================================================================
*/

function displayAnalysisAndReflection() {
  console.log("\n========================================================");
  console.log("   RINGKASAN PERTANYAAN ANALISIS & REFLEKSI (P. 25-26)  ");
  console.log("========================================================");

  console.log(`
1. Mengapa Set lebih cocok untuk data kategori unik?
   Set mengimplementasikan hash table dengan lookup O(1), sedangkan array.includes() di dalam loop membutuhkan O(n^2).

2. Apa konsekuensi nested loop vs Map?
   Nested loop beroperasi pada O(n^2) yang akan menyebabkan lag fatal pada ribuan data, sedangkan Map mengelompokkan data dalam satu kali scan O(n).

3. Mengapa binary search membutuhkan data terurut?
   Karena prinsip divide-and-conquer binary search mengeliminasi setengah rentang data berdasarkan perbandingan nilai tengah (mid).

4. Mengapa UI sebaiknya dirender berdasarkan state?
   Agar state menjadi Single Source of Truth sehingga tampilan selalu sinkron dengan data dan bebas dari inkonsistensi DOM.

5. Lifecycle Fetch hingga tampil di layar:
   fetch(url) dikirim -> Response diterima -> Cek response.ok -> Parse response.json() -> Update State -> Panggil render() -> DOM diperbarui.
`);
}

/*
   ==========================================================================
   6. MAIN EXECUTION
   ==========================================================================
*/

async function main() {
  console.log("Memulai Product Explorer: Aplikasi Akhir Terintegrasi...\n");

  // 1. Jalankan aplikasi utama
  await initializeProductExplorer();

  // 2. Simulasi interaksi pengguna
  console.log("\n>>> User Mencari 'powder'...");
  setSearchKeyword("powder");

  console.log("\n>>> User Menambahkan Produk Pertama ke Favorit (Set)...");
  if (state.filteredProducts.length > 0) {
    toggleFavorite(state.filteredProducts[0].id);
  }

  console.log("\n>>> User Melakukan Undo Search (Stack)...");
  undoSearch();

  // 3. Jalankan Algoritma Tantangan & Analisis
  runAlgorithmChallenges(state.products);
  runPerformanceBenchmark();
  displayDebuggingLabSolutions();
  displayAnalysisAndReflection();

  console.log("\n✨ Seluruh materi Praktikum Bagian 9 sampai 26 berhasil diselesaikan!");
}

if (require.main === module) {
  main();
}

module.exports = {
  state,
  applyFilters,
  computeDashboardStats,
  setSearchKeyword,
  undoSearch,
  toggleFavorite,
};
