// BAGIAN 12 — Map (Struktur Data)

const { products } = require("./bagian10_frequency_counting.js");

/*
   Perbedaan Mendasar:
   - Array.prototype.map(): Method fungsi tingkat tinggi untuk mengubah
     (transformasi) setiap elemen array menjadi bentuk baru dan mengembalikan array baru.
   - Map: Struktur data objek bawaan JavaScript (Key-Value pairs) yang
     memungkinkan key bertipe apa pun dan dioptimalkan untuk operasi pencarian cepat O(1).
*/

// Contoh dasar dari Jobsheet:
function getExampleMap() {
  const productMapExample = new Map();
  for (const product of products) {
    productMapExample.set(product.id, product);
  }
  return productMapExample;
}

/*
   Latihan 12.1 — buildProductLookup(products)
   Membuat fungsi pembangun Map dari array produk dengan key = id produk.
*/
function buildProductLookup(products) {
  const lookup = new Map();
  for (const product of products) {
    lookup.set(product.id, product);
  }
  return lookup;
}

const productLookup = buildProductLookup(products);

if (require.main === module) {
  console.log("\n=== Latihan 12.1: Penggunaan buildProductLookup ===");
  console.log("Total entri dalam Map:", productLookup.size);

  // Mencari produk yang ada
  const idTarget = 9;
  const found = productLookup.get(idTarget);
  console.log(`Pencarian id ${idTarget} (Smartwatch):`, found ? found.title : "Tidak ditemukan");

  // Mencari produk yang tidak ada
  const notFound = productLookup.get(999);
  console.log("Pencarian id 999:", notFound ? notFound.title : "Tidak ditemukan");

  // Cek keberadaan dengan has()
  console.log("Apakah id 16 ada di Map?", productLookup.has(16));
  console.log("Apakah id 99 ada di Map?", productLookup.has(99));

  /*
     Diskusi: Kapan Map lebih tepat digunakan dibanding Object biasa?
     1. Key fleksibel: Map menerima key dengan tipe data apa pun (number, object, function),
        sedangkan Object hanya menerima string atau symbol sebagai key.
     2. Ukuran instan: Map memiliki properti .size yang bisa diakses langsung O(1),
        sedangkan Object memerlukan Object.keys(obj).length (O(n)).
     3. Kinerja: Map dioptimalkan untuk seringnya penambahan dan penghapusan pasangan key-value.
     4. Tidak ada tabrakan prototype: Object mewarisi properti bawaan seperti toString, hasOwnProperty,
        sedangkan Map bersih dari key default.
  */
}

module.exports = { buildProductLookup, productLookup };
