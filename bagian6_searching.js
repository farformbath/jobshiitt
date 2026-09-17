//BAGIAN 6 — Searching (Linear Search)

const { products } = require("./bagian5_map_filter_reduce.js");

/*
   Latihan 6.1 — linearSearch(array, target)
   Manual dengan loop, TIDAK memakai .indexOf() / .find()
*/
function linearSearch(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) return i;
  }
  return -1;
}

console.log(linearSearch([10, 20, 30, 40], 30)); // 2
console.log(linearSearch([10, 20, 30, 40], 99)); // -1


/*
   Latihan 6.2 — Terapkan linear search untuk mencari produk
   berdasarkan id (tanpa .find())
*/
function findProductByIdLinearSearch(products, id) {
  const ids = products.map((p) => p.id);
  const index = linearSearch(ids, id);
  return index === -1 ? undefined : products[index];
}

console.log(findProductByIdLinearSearch(products, 9));
// { id: 9, title: 'Smartwatch', price: 199, category: 'wearables', stock: 2, rating: 4 }

console.log(findProductByIdLinearSearch(products, 999));
// undefined

/*
   Diskusi: mengapa linear search O(n)?
   Karena pada kasus terburuk (data tidak ditemukan, atau berada di
   posisi paling akhir), setiap elemen array harus diperiksa satu per
   satu tanpa ada informasi yang bisa "melompati" sebagian data.
   Jumlah operasi pemeriksaan tumbuh berbanding lurus (linear)
   dengan jumlah elemen n, sehingga kompleksitasnya O(n).
*/
