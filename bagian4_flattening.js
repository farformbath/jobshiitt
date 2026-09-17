//BAGIAN 4 — Flattening Data


const { products } = require("./bagian3_nested_data.js");

//Contoh dasar dari jobsheet: flat() vs flatMap()

const tags = [
  ["computer", "office"],
  ["electronics"],
  ["gaming", "computer"],
];

console.log(tags.flat());
// ["computer", "office", "electronics", "gaming", "computer"]

const sampleProducts = [
  { title: "Laptop", tags: ["computer", "office"] },
  { title: "Phone", tags: ["mobile"] },
];

const allTagsSample = sampleProducts.flatMap((p) => p.tags);
console.log(allTagsSample);
// ["computer", "office", "mobile"]

/*
   Latihan 4.1 — Ambil seluruh tags dari semua produk
   menjadi satu array menggunakan flatMap()
*/
function getAllTagsFlat(products) {
  return products.flatMap((p) => p.tags);
}

console.log(getAllTagsFlat(products));
// ["computer","electronics","office","mobile","electronics","audio","electronics","gaming"]


/*
   Latihan 4.2 — Ambil seluruh comment dari semua review
   di semua produk menjadi satu array of strings
*/
function getAllComments(products) {
  return products.flatMap((p) => p.reviews.map((r) => r.comment));
}

console.log(getAllComments(products));
/*
[
  'Good product', 'Worth it',
  'Nice camera', 'Fast', 'Battery so-so',
  'Sound is crisp'
]
*/

// Variasi tanpa flatMap, memakai flat() + map() secara terpisah,
// untuk menunjukkan flatMap() = map() + flat(1)
function getAllCommentsAlt(products) {
  return products.map((p) => p.reviews.map((r) => r.comment)).flat();
}

console.log(getAllCommentsAlt(products));
// Hasilnya identik dengan getAllComments(products)
