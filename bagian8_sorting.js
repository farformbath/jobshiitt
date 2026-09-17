//BAGIAN 8 — Sorting

const { products } = require("./bagian5_map_filter_reduce.js");

//Sorting dengan built-in method (contoh dari jobsheet)

const numbers = [5, 3, 8, 1];
console.log([...numbers].sort((a, b) => a - b)); // ascending  -> [1, 3, 5, 8]
console.log([...numbers].sort((a, b) => b - a)); // descending -> [8, 5, 3, 1]

console.log(
  [...products].sort((a, b) => a.price - b.price).map((p) => p.title).slice(0, 3)
);
// 3 produk termurah


//Latihan 8.1 — bubbleSort(numbers) manual, tanpa memutasi input

function bubbleSort(numbers) {
  const arr = [...numbers];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

const unsorted = [5, 3, 8, 1, 9, 2];
console.log(bubbleSort(unsorted)); // [1, 2, 3, 5, 8, 9]
console.log(unsorted);             // [5, 3, 8, 1, 9, 2] menunjukan array asli tidak berubah

/*
   Diskusi: bubble sort (buatan sendiri) vs sort() bawaan?
   Untuk data kecil, perbedaan performa nyaris tidak terasa.
   Tapi bubble sort punya kompleksitas O(n^2) di kasus terburuk
   (dua loop bersarang), sedangkan implementasi sort() bawaan mesin
   JS umumnya jauh lebih optimal (mendekati O(n log n)). Untuk data
   besar, bubble sort akan terasa jauh lebih lambat.
*/


/*
   Latihan 8.2 — sortProducts(products, sortBy)
   Pilihan: "price-asc", "price-desc", "rating", "title"
   Tidak memutasi array asli.
*/
function sortProducts(products, sortBy) {
  const arr = [...products];

  switch (sortBy) {
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price);
    case "rating":
      return arr.sort((a, b) => b.rating - a.rating); // rating tertinggi dulu
    case "title":
      return arr.sort((a, b) => a.title.localeCompare(b.title));
    default:
      throw new Error(`sortBy tidak dikenali: "${sortBy}"`);
  }
}

console.log(sortProducts(products, "price-asc").slice(0, 3).map((p) => p.title));
// 3 produk termurah, urut dari yang paling murah

console.log(sortProducts(products, "price-desc").slice(0, 3).map((p) => p.title));
// 3 produk termahal

console.log(sortProducts(products, "rating").slice(0, 3).map((p) => p.title));
// 3 produk dengan rating tertinggi

console.log(sortProducts(products, "title").slice(0, 3).map((p) => p.title));
// 3 produk pertama secara alfabetis

