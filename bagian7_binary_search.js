//BAGIAN 7 — Binary Search

const { products } = require("./bagian5_map_filter_reduce.js");

//Latihan 7.1 — binarySearch(sortedArray, target)

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}

const sortedNumbers = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearch(sortedNumbers, 11)); // 5
console.log(binarySearch(sortedNumbers, 4));  // -1

/*
   Diskusi: mengapa binary search butuh data yang sudah terurut?
   Setiap langkah membuang separuh ruang pencarian (kiri atau kanan)
   berdasarkan asumsi bahwa semua nilai di satu sisi mid pasti lebih
   kecil, dan di sisi lain pasti lebih besar. Asumsi ini hanya valid
   jika data sudah terurut; kalau tidak, elemen yang dicari bisa saja
   terbuang di sisi yang "dianggap salah" padahal sebenarnya ada di
   situ.
*/


/*
  Latihan 7.2 — Urutkan produk berdasarkan price, lalu
   binarySearchByPrice(sortedProducts, targetPrice)
*/
function binarySearchByPrice(sortedProducts, targetPrice) {
  let left = 0;
  let right = sortedProducts.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midPrice = sortedProducts[mid].price;

    if (midPrice === targetPrice) return sortedProducts[mid];
    if (midPrice < targetPrice) left = mid + 1;
    else right = mid - 1;
  }

  return undefined;
}

const sortedByPrice = [...products].sort((a, b) => a.price - b.price);

console.log(binarySearchByPrice(sortedByPrice, 199));
// { id: 9, title: 'Smartwatch', price: 199, ... } atau
// { id: 23, title: 'Noise Cancelling Headphones', price: 199, ... }
// (keduanya berharga 199 — binary search akan mengembalikan salah satunya
//  tergantung posisi mid yang dikunjungi lebih dulu)

console.log(binarySearchByPrice(sortedByPrice, 77));
// undefined (tidak ada produk seharga 77)

