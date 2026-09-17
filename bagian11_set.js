// BAGIAN 11 — Set

const { products } = require("./bagian10_frequency_counting.js");

/*
   Konsep Dasar Set:
   Set menyimpan koleksi nilai unik dan otomatis membuang elemen duplikat.
*/

// Contoh dari Jobsheet:
const categories = [...new Set(products.map((p) => p.category))];
console.log("=== Contoh Dasar Pembuatan Set Kategori ===");
console.log(categories);

/*
   Pertanyaan Diskusi Jobsheet:
   Mengapa Set lebih tepat digunakan dibanding pengecekan duplikasi manual
   menggunakan includes() di dalam loop?

   Jawaban:
   - Set mengimplementasikan mekanisme Hash Table di balik layar, sehingga
     pengecekan keberadaan elemen (has/add) memiliki kompleksitas waktu
     rata-rata O(1).
   - Sebaliknya, method includes() pada array melakukan linear scan dari
     awal hingga akhir dengan kompleksitas O(n). Jika includes() dijalankan
     di dalam perulangan sepanjang n elemen, total kompleksitasnya melonjak
     menjadi O(n^2).
   - Untuk data besar, Set jauh lebih efisien dan skalabel.
*/

/*
   Latihan 11.1 — Dapatkan Daftar Unik:
   1. unique category
   2. unique brand
   3. unique tags
*/

// 1. Unique Categories
const uniqueCategories = [...new Set(products.map((p) => p.category))];

// 2. Unique Brands
const uniqueBrands = [...new Set(products.map((p) => p.brand).filter(Boolean))];

// 3. Unique Tags (menggunakan flatMap lalu Set)
const uniqueTags = [...new Set(products.flatMap((p) => p.tags))];

console.log("\n=== Latihan 11.1: Daftar Nilai Unik ===");
console.log(`\n1. Unique Categories (${uniqueCategories.length} kategori):`);
console.log(uniqueCategories);

console.log(`\n2. Unique Brands (${uniqueBrands.length} brand):`);
console.log(uniqueBrands);

console.log(`\n3. Unique Tags (${uniqueTags.length} tag):`);
console.log(uniqueTags);

// Fungsi pembantu untuk demonstrasi Set pada fitur aplikasi (misal: Tag Filter / Favorites)
function getCommonTags(tagsA, tagsB) {
  const setB = new Set(tagsB);
  return tagsA.filter((tag) => setB.has(tag)); // Intersection O(n)
}

const tagsLaptop = products.find((p) => p.title === "Laptop").tags;
const tagsSmartphone = products.find((p) => p.title === "Smartphone").tags;
console.log("\nTag irisan antara Laptop & Smartphone:", getCommonTags(tagsLaptop, tagsSmartphone));

module.exports = {
  uniqueCategories,
  uniqueBrands,
  uniqueTags,
  getCommonTags,
};
