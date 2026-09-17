// BAGIAN 16 — Algorithm Complexity (Big-O secara Praktis)

/*
   Tabel Kompleksitas Waktu (Big-O) dari Jobsheet:
   ----------------------------------------------------------------------------------------
   Notasi       Penjelasan Sederhana                        Contoh
   ----------------------------------------------------------------------------------------
   O(1)         Waktu konstan, tidak tergantung ukuran data  Akses array by index, Map.get()
   O(log n)     Waktu tumbuh sangat lambat, data dibagi dua  Binary search
   O(n)         Waktu tumbuh linear seiring ukuran data      Linear search, satu for loop
   O(n^2)       Waktu tumbuh kuadratis, loop di dalam loop   Bubble sort, nested loop
   ----------------------------------------------------------------------------------------
*/

/*
   Latihan 16.1 — Perbandingan Langkah Pemeriksaan:
   Linear Search vs Binary Search pada Array 10.000 Elemen Terurut
*/

function linearSearchWithSteps(arr, target) {
  let steps = 0;
  for (let i = 0; i < arr.length; i++) {
    steps++;
    if (arr[i] === target) {
      return { index: i, steps };
    }
  }
  return { index: -1, steps };
}

function binarySearchWithSteps(arr, target) {
  let steps = 0;
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    steps++;
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return { index: mid, steps };
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return { index: -1, steps };
}

/*
   Latihan 16.2 — Mencari Pasangan Produk dengan Kategori Sama:
   Approach A: Nested Loop O(n^2)
   Approach B: Grouping berbasis Map / Objek O(n)
*/

// Generator dataset besar untuk pengujian
function generateProducts(count) {
  const categories = ["electronics", "furniture", "clothing", "books", "food", "sports"];
  const list = [];
  for (let i = 1; i <= count; i++) {
    list.push({
      id: i,
      title: `Product ${i}`,
      category: categories[i % categories.length],
      price: 10 + (i % 500),
    });
  }
  return list;
}

// Approach A: Nested Loop (O(n^2))
function findPairsNestedLoop(products) {
  const pairs = [];
  for (let i = 0; i < products.length; i++) {
    for (let j = i + 1; j < products.length; j++) {
      if (products[i].category === products[j].category) {
        pairs.push([products[i].id, products[j].id]);
      }
    }
  }
  return pairs;
}

// Approach B: Grouping Berbasis Map (O(n))
function findPairsWithMap(products) {
  const map = new Map();
  for (const product of products) {
    if (!map.has(product.category)) {
      map.set(product.category, []);
    }
    map.get(product.category).push(product);
  }

  const pairs = [];
  for (const group of map.values()) {
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        pairs.push([group[i].id, group[j].id]);
      }
    }
  }
  return pairs;
}

if (require.main === module) {
  console.log("=== Latihan 16.1: Linear Search vs Binary Search (10.000 Elemen) ===");
  const size = 10000;
  const sortedArray = Array.from({ length: size }, (_, i) => i + 1); // [1, 2, 3, ..., 10000]

  // Uji kasus terburuk (elemen di paling ujung akhir)
  const targetWorstCase = 10000;
  const linearResultWorst = linearSearchWithSteps(sortedArray, targetWorstCase);
  const binaryResultWorst = binarySearchWithSteps(sortedArray, targetWorstCase);

  console.log(`\nPencarian target ${targetWorstCase} (Posisi Terakhir):`);
  console.log(`- Linear Search: Membutuhkan ${linearResultWorst.steps} langkah pemeriksaan (O(n))`);
  console.log(`- Binary Search: Membutuhkan ${binaryResultWorst.steps} langkah pemeriksaan (O(log n))`);

  // Uji kasus elemen tidak ditemukan
  const targetNotFound = 99999;
  const linearResultNone = linearSearchWithSteps(sortedArray, targetNotFound);
  const binaryResultNone = binarySearchWithSteps(sortedArray, targetNotFound);

  console.log(`\nPencarian target ${targetNotFound} (Tidak Ada):`);
  console.log(`- Linear Search: Membutuhkan ${linearResultNone.steps} langkah pemeriksaan`);
  console.log(`- Binary Search: Membutuhkan ${binaryResultNone.steps} langkah pemeriksaan`);

  console.log("\n=== Latihan 16.2: Nested Loop O(n^2) vs Grouping Map O(n) ===");
  const sampleProducts = generateProducts(1000);
  console.log(`Menguji dengan ${sampleProducts.length} produk...`);

  // Ukur Approach A
  const t0 = performance.now();
  const pairsA = findPairsNestedLoop(sampleProducts);
  const t1 = performance.now();
  const timeA = t1 - t0;

  // Ukur Approach B
  const t2 = performance.now();
  const pairsB = findPairsWithMap(sampleProducts);
  const t3 = performance.now();
  const timeB = t3 - t2;

  console.log(`Approach A (Nested Loop O(n^2)) : ${timeA.toFixed(2)} ms (Ditemukan ${pairsA.length} pasang)`);
  console.log(`Approach B (Map Grouping O(n))   : ${timeB.toFixed(2)} ms (Ditemukan ${pairsB.length} pasang)`);
  console.log(`Efisiensi: Pendekatan Map ${(timeA / (timeB || 0.001)).toFixed(1)}x lebih cepat!`);

  /*
     Diskusi Hasil:
     Pada 1.000 produk, nested loop harus melakukan (1000 * 999) / 2 = 499.500 komparasi.
     Jika data naik menjadi 10.000 produk, nested loop akan melakukan ~50.000.000 komparasi
     yang dapat membuat browser mengalami freeze (not responding).
     Dengan Map, kita cukup melakukan 1 kali scan array O(n) untuk mengelompokkan data.
  */
}

module.exports = {
  linearSearchWithSteps,
  binarySearchWithSteps,
  generateProducts,
  findPairsNestedLoop,
  findPairsWithMap,
};
