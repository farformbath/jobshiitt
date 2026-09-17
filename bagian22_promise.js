// BAGIAN 22 — Promise

/*
   Konsep Dasar:
   Promise adalah objek yang mewakili penyelesaian atau kegagalan sebuah operasi
   asinkron di masa mendatang (eventual completion/failure).

   3 Kemungkinan Status Promise:
   1. Pending   : Operasi sedang berjalan (belum selesai).
   2. Fulfilled : Operasi berhasil diselesaikan (memanggil resolve).
   3. Rejected  : Operasi gagal atau terjadi error (memanggil reject).
*/

// Contoh Dasar dari Jobsheet:
function createBasicPromise(success = true) {
  return new Promise((resolve, reject) => {
    if (success) resolve("Data berhasil diambil");
    else reject(new Error("Terjadi error saat pengambilan data"));
  });
}

// Simulasi Asynchronous Product Service menggunakan Promise
const mockDatabase = [
  { id: 1, title: "Laptop Pro", price: 1200, category: "laptops" },
  { id: 2, title: "Smartphone 5G", price: 800, category: "phones" },
  { id: 3, title: "Wireless Headphones", price: 150, category: "audio" },
];

function fetchProductById(id) {
  return new Promise((resolve, reject) => {
    console.log(`[Promise: Pending] Meminta data produk ID ${id}...`);

    setTimeout(() => {
      const found = mockDatabase.find((p) => p.id === id);
      if (found) {
        resolve(found); // Status berubah menjadi Fulfilled
      } else {
        reject(new Error(`Produk dengan ID ${id} tidak ditemukan!`)); // Rejected
      }
    }, 200);
  });
}

// Simulasi mengambil beberapa resource secara bersamaan dengan Promise.all
function fetchDashboardData() {
  const fetchProductsPromise = new Promise((res) =>
    setTimeout(() => res(mockDatabase), 150)
  );

  const fetchCategoriesPromise = new Promise((res) =>
    setTimeout(() => res(["laptops", "phones", "audio"]), 100)
  );

  return Promise.all([fetchProductsPromise, fetchCategoriesPromise]);
}

if (require.main === module) {
  console.log("=== BAGIAN 22: Pengujian Promise ===");

  // 1. Pengujian Dasar .then(), .catch(), .finally()
  console.log("\n1. Menguji Promise Dasar (Sukses):");
  createBasicPromise(true)
    .then((result) => console.log("Hasil:", result))
    .catch((error) => console.error("Error:", error.message))
    .finally(() => console.log("Selesai, apa pun hasilnya."));

  // 2. Menguji Promise Gagal
  setTimeout(() => {
    console.log("\n2. Menguji Promise Dasar (Gagal/Reject):");
    createBasicPromise(false)
      .then((result) => console.log("Hasil:", result))
      .catch((error) => console.error("Tertangkap di .catch():", error.message))
      .finally(() => console.log("Selesai, pembersihan resource."));
  }, 50);

  // 3. Menguji Simulasi Fetch Produk Sukses & Gagal
  setTimeout(() => {
    console.log("\n3. Menguji fetchProductById(1) (Ada):");
    fetchProductById(1)
      .then((product) => console.log("[Fulfilled] Ditemukan:", product.title))
      .catch((err) => console.error("[Rejected]:", err.message));

    fetchProductById(99)
      .then((product) => console.log("[Fulfilled] Ditemukan:", product.title))
      .catch((err) => console.error("[Rejected]:", err.message));
  }, 100);

  // 4. Menguji Promise.all()
  setTimeout(() => {
    console.log("\n4. Menguji Promise.all() (Dashboard Data):");
    fetchDashboardData().then(([products, categories]) => {
      console.log(`Berhasil memuat ${products.length} produk dan ${categories.length} kategori secara paralel.`);
    });
  }, 400);
}

module.exports = {
  createBasicPromise,
  fetchProductById,
  fetchDashboardData,
};
