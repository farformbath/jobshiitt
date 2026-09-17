// BAGIAN 19 — Event Handling

const { state, setState, render } = require("./bagian18_state_management.js");

/*
   Pola Alur Data untuk Interaksi User:
   [Interaksi User] -> [Event Listener] -> [Update State] -> [Panggil render()] -> [DOM Terupdate]

   Aturan:
   Event listener tidak boleh langsung mengubah elemen DOM daftar produk,
   tetapi HANYA bertugas memperbarui nilai pada objek state, kemudian
   memanggil fungsi render().
*/

/*
   Latihan 19.1 — Menghubungkan Input Search, Category Select, dan Sort Select ke State.
*/
function setupEventListeners() {
  if (typeof document === "undefined") {
    // Lingkungan Node.js: sediakan simulasi Event Handler
    return setupNodeSimulation();
  }

  // Lingkungan Browser DOM nyata:
  const searchInput = document.querySelector("#search-input");
  const categorySelect = document.querySelector("#category-select");
  const sortSelect = document.querySelector("#sort-select");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      setState({ search: e.target.value });
    });
  }

  if (categorySelect) {
    categorySelect.addEventListener("change", (e) => {
      setState({ category: e.target.value });
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      setState({ sortBy: e.target.value });
    });
  }
}

// Simulasi interaksi user untuk pengujian di Node.js
function setupNodeSimulation() {
  return {
    dispatchSearchInput(value) {
      console.log(`\n[Event: input] User mengetik di #search-input: "${value}"`);
      setState({ search: value });
    },
    dispatchCategoryChange(category) {
      console.log(`\n[Event: change] User memilih di #category-select: "${category}"`);
      setState({ category: category });
    },
    dispatchSortChange(sortBy) {
      console.log(`\n[Event: change] User memilih di #sort-select: "${sortBy}"`);
      setState({ sortBy: sortBy });
    },
  };
}

if (require.main === module) {
  console.log("=== BAGIAN 19: Event Handling ===");

  const simulator = setupEventListeners();

  // 1. Simulasi user mengetik "monitor" di kotak pencarian
  simulator.dispatchSearchInput("monitor");

  // 2. Simulasi user mengubah urutan menjadi "price-desc" (harga termahal dahulu)
  simulator.dispatchSortChange("price-desc");

  // 3. Simulasi user mengosongkan search dan memilih kategori "furniture"
  simulator.dispatchSearchInput("");
  simulator.dispatchCategoryChange("furniture");
  simulator.dispatchSortChange("rating");
}

module.exports = { setupEventListeners };
