// BAGIAN 10 — Frequency Counting

const { products: baseProducts } = require("./bagian9_grouping_aggregation.js");

// Lengkapi data dengan tags untuk keperluan frequency counting
const tagsList = [
  ["computer", "electronics", "office"],
  ["mobile", "electronics", "gadget"],
  ["audio", "electronics", "music"],
  ["accessories", "office", "computer"],
  ["accessories", "hardware", "gaming"],
  ["monitors", "office", "display"],
  ["furniture", "office", "ergonomic"],
  ["tablets", "mobile", "gadget"],
  ["wearables", "fitness", "gadget"],
  ["audio", "music", "portable"],
  ["storage", "backup", "computer"],
  ["accessories", "video", "office"],
  ["office", "printing", "hardware"],
  ["networking", "internet", "office"],
  ["accessories", "power", "travel"],
  ["laptops", "gaming", "computer"],
  ["audio", "wireless", "music"],
  ["furniture", "lighting", "office"],
  ["accessories", "design", "creative"],
  ["cameras", "travel", "video"],
  ["electronics", "video", "home"],
  ["furniture", "ergonomic", "office"],
  ["audio", "wireless", "music"],
  ["electronics", "smart", "home"],
  ["monitors", "gaming", "display"],
  ["accessories", "connectivity", "computer"],
  ["storage", "backup", "portable"],
  ["wearables", "fitness", "health"],
  ["electronics", "gaming", "vr"],
  ["furniture", "ergonomic", "office"],
];

const products = baseProducts.map((p, i) => ({
  ...p,
  tags: tagsList[i] || ["general"],
}));

/*
   Latihan 10.1 — countFrequency(array)
   Function umum untuk menghitung frekuensi kemunculan setiap item pada array.
*/
function countFrequency(array) {
  return array.reduce((counts, item) => {
    counts[item] = (counts[item] || 0) + 1;
    return counts;
  }, {});
}

if (require.main === module) {
  // Uji coba dasar sesuai jobsheet
  const sampleWords = ["laptop", "phone", "laptop", "tablet", "phone", "laptop"];
  console.log("=== Latihan 10.1: countFrequency Dasar ===");
  console.log(countFrequency(sampleWords));
  // Target output: { laptop: 3, phone: 2, tablet: 1 }

  // 1. Frekuensi Category
  const categoryFrequencies = countFrequency(products.map((p) => p.category));

  // 2. Frekuensi Seluruh Tags menggunakan flatMap
  const allTags = products.flatMap((p) => p.tags);
  const tagFrequencies = countFrequency(allTags);

  // 3. Frekuensi Rating (dibulatkan dengan Math.round)
  const roundedRatings = products.map((p) => Math.round(p.rating));
  const ratingFrequencies = countFrequency(roundedRatings);

  // 4. Frekuensi Brand
  const brandFrequencies = countFrequency(products.map((p) => p.brand || "Unknown Brand"));

  console.log("\n=== Latihan 10.2: Penerapan pada Dataset Produk ===");
  console.log("\n1. Frekuensi Kategori Produk:");
  console.log(categoryFrequencies);

  console.log("\n2. Frekuensi Tags (Top 10):");
  const sortedTags = Object.entries(tagFrequencies)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  console.table(sortedTags.map(([tag, count]) => ({ Tag: tag, Muncul: count })));

  console.log("\n3. Frekuensi Rating (Dibulatkan):");
  console.log(ratingFrequencies);

  console.log("\n4. Frekuensi Brand:");
  console.log(brandFrequencies);
}

/*
   Diskusi: Mengapa frequency counting sering menjadi langkah awal analisis?
   Frequency counting memberikan gambaran distribusi data secara cepat
   (seperti histogram). Dari sini kita bisa mengetahui kategori dominan,
   tag paling populer, rating rata-rata pengguna, atau mendeteksi ketimpangan
   data (imbalance) sebelum melakukan analisis statistik lebih lanjut.
*/

module.exports = { products, countFrequency };
