// BAGIAN 18 — State Management Sederhana (Tanpa Library)

const { products: allProducts } = require("./bagian10_frequency_counting.js");
const { renderProducts } = require("./bagian17_dom_manipulation.js");

/*
   Konsep Utama:
   Tampilan (UI) adalah representasi langsung dari state (UI = f(state)).
   DOM tidak boleh dimanipulasi secara langsung tanpa melalui state.
   Setiap kali state berubah, panggil render() untuk memperbarui tampilan.
*/

// State Aplikasi Sesuai Spesifikasi Jobsheet
const state = {
  products: [...allProducts],
  search: "",
  category: "all",
  sortBy: "default", // default, price-asc, price-desc, rating, title
  favorites: [],
  status: "success", // idle, loading, success, error, empty
};

/*
   Pipeline Transformasi Data Berdasarkan State:
   1. Filter Search Keyword
   2. Filter Category
   3. Sorting
*/
function getProcessedProducts(currentState) {
  let result = [...currentState.products];

  // 1. Filter Search
  if (currentState.search.trim() !== "") {
    const keyword = currentState.search.toLowerCase();
    result = result.filter((p) => p.title.toLowerCase().includes(keyword));
  }

  // 2. Filter Category
  if (currentState.category !== "all") {
    result = result.filter((p) => p.category === currentState.category);
  }

  // 3. Sorting
  switch (currentState.sortBy) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "title":
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      // default: urut berdasarkan id
      result.sort((a, b) => a.id - b.id);
      break;
  }

  return result;
}

/*
   Fungsi render() Utama:
   Mengecek status dan memperbarui UI berdasarkan state terkini.
*/
function render() {
  if (state.status === "loading") {
    console.log("[UI] Status: Sedang memuat produk...");
    return;
  }

  if (state.status === "error") {
    console.log("[UI] Status: Terjadi kesalahan saat memuat produk.");
    return;
  }

  const processed = getProcessedProducts(state);

  if (processed.length === 0) {
    state.status = "empty";
    console.log("[UI] Status: Tidak ada produk yang cocok dengan filter.");
    return;
  }

  state.status = "success";
  console.log(`[UI] Merender ${processed.length} produk (Search: "${state.search}", Category: "${state.category}", Sort: "${state.sortBy}"):`);
  console.table(
    processed.slice(0, 5).map((p) => ({
      ID: p.id,
      Title: p.title,
      Category: p.category,
      Price: `$${p.price}`,
      Rating: p.rating,
    }))
  );
  if (processed.length > 5) {
    console.log(`... dan ${processed.length - 5} produk lainnya.`);
  }
}

// Action Helper untuk memperbarui State secara terpusat (Store Pattern)
function setState(newState) {
  Object.assign(state, newState);
  render();
}

if (require.main === module) {
  console.log("=== BAGIAN 18: State Management Sederhana ===");

  console.log("\n1. Render Awal (Default State):");
  render();

  console.log("\n2. User Mengubah Kategori Menjadi 'audio':");
  setState({ category: "audio" });

  console.log("\n3. User Melakukan Pencarian 'wireless' dan Sort 'price-asc':");
  setState({ search: "wireless", sortBy: "price-asc" });

  console.log("\n4. User Mencari Kata Kunci yang Tidak Ada:");
  setState({ search: "non-existent-product" });

  /*
     Diskusi Jobsheet:
     Mengapa UI sebaiknya dirender berdasarkan state, bukan dimanipulasi langsung?
     - Single Source of Truth: State menjadi satu-satunya sumber kebenaran data aplikasi.
     - Prediktabilitas: Tampilan UI selalu dapat diprediksi dengan tepat jika kita mengetahui isi state-nya.
     - Mencegah Bug Desinkronisasi: Jika UI dimanipulasi langsung, state bisa berbeda dengan apa yang terlihat di layar.
  */
}

module.exports = { state, getProcessedProducts, render, setState };
