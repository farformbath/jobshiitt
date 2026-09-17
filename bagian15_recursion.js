// BAGIAN 15 — Recursion

/*
   Konsep Dasar:
   Recursion (rekursi) adalah teknik di mana sebuah fungsi memanggil dirinya sendiri
   untuk menyelesaikan sub-masalah yang lebih kecil, hingga mencapai kondisi berhenti (base case).
*/

// Contoh dari Jobsheet: Countdown
function countdown(n) {
  if (n <= 0) {
    console.log("Selesai");
    return;
  }
  console.log(n);
  countdown(n - 1);
}

// Struktur Data Kategori Bertingkat (Tree) dari Jobsheet (diperluas)
const categoriesTree = [
  {
    name: "Electronics",
    children: [
      {
        name: "Computers",
        children: [
          { name: "Laptops", children: [] },
          { name: "Desktops", children: [] },
          {
            name: "Accessories",
            children: [
              { name: "Keyboards", children: [] },
              { name: "Mice", children: [] },
            ],
          },
        ],
      },
      {
        name: "Audio",
        children: [
          { name: "Headphones", children: [] },
          { name: "Speakers", children: [] },
        ],
      },
      {
        name: "Phones",
        children: [
          { name: "Smartphones", children: [] },
          { name: "Feature Phones", children: [] },
        ],
      },
    ],
  },
  {
    name: "Furniture",
    children: [
      { name: "Chairs", children: [] },
      { name: "Desks", children: [] },
      { name: "Lamps", children: [] },
    ],
  },
];

/*
   Latihan 15.1 — printCategories(categories, depth = 0)
   Menampilkan semua nama kategori termasuk sub-kategorinya dengan
   indentasi sesuai kedalaman hierarki pohon (depth).
*/
function printCategories(categories, depth = 0) {
  for (const category of categories) {
    console.log("  ".repeat(depth) + "- " + category.name);
    if (category.children && category.children.length > 0) {
      printCategories(category.children, depth + 1);
    }
  }
}

/*
   Fungsi Rekursif Tambahan:
   Mencari kategori dalam pohon hierarki berdasarkan nama (Deep Search).
*/
function findCategory(categories, targetName) {
  for (const category of categories) {
    if (category.name.toLowerCase() === targetName.toLowerCase()) {
      return category;
    }
    if (category.children && category.children.length > 0) {
      const found = findCategory(category.children, targetName);
      if (found) return found;
    }
  }
  return null;
}

/*
   Menghitung total kategori dalam struktur hierarki secara rekursif
*/
function countTotalCategories(categories) {
  let count = 0;
  for (const category of categories) {
    count += 1;
    if (category.children && category.children.length > 0) {
      count += countTotalCategories(category.children);
    }
  }
  return count;
}

if (require.main === module) {
  console.log("=== Contoh Dasar: Countdown Rekursif ===");
  countdown(3);

  console.log("\n=== Latihan 15.1: Menampilkan Hierarki Kategori ===");
  printCategories(categoriesTree);

  console.log("\n=== Pengujian Pencarian Kategori Rekursif ===");
  const target = "Keyboards";
  const found = findCategory(categoriesTree, target);
  console.log(`Pencarian "${target}":`, found ? "Ditemukan!" : "Tidak ditemukan");

  console.log("\nTotal seluruh kategori dalam tree:", countTotalCategories(categoriesTree));

  /*
     Pertanyaan Diskusi:
     Mengapa recursion membutuhkan base case, dan apa yang terjadi jika tidak ada?
     Jawaban:
     Base case adalah kondisi terminasi yang menghentikan fungsi memanggil dirinya sendiri.
     Jika tidak ada base case (atau kondisinya tidak pernah tercapai), pemanggilan fungsi
     akan terus menumpuk di Call Stack browser/Node.js hingga memori stack habis,
     menyebabkan error "RangeError: Maximum call stack size exceeded" (Stack Overflow).
  */
}

module.exports = {
  categoriesTree,
  countdown,
  printCategories,
  findCategory,
  countTotalCategories,
};
