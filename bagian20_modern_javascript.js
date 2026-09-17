// BAGIAN 20 — Modern JavaScript (ES6+)

const { products } = require("./bagian10_frequency_counting.js");

/*
   Fitur-Fitur Penting ES6+ yang Digunakan pada Product Explorer:
*/

// 1. Template Literals
const sampleProduct = products[0];
const label = `${sampleProduct.title} - $${sampleProduct.price}`;

// 2. Arrow Functions
const getTitle = (product) => product.title;

// 3. Object & Array Destructuring
const { title, price, category } = sampleProduct;
const [firstProduct, secondProduct, ...restProducts] = products;

// 4. Spread Operator (Immutability)
const updatedProduct = { ...sampleProduct, stock: 20 };
const mergedProducts = [...products.slice(0, 2), { id: 99, title: "Headset Stand", price: 15 }];

// 5. Rest Parameter
function sumPrices(...prices) {
  return prices.reduce((sum, p) => sum + p, 0);
}

// 6. Optional Chaining (?.) dan Nullish Coalescing (??)
const sampleWithDimensions = {
  title: "Laptop Pro",
  dimensions: { width: 35, height: 2 },
};
const sampleWithoutDimensions = {
  title: "Voucher Game",
};

const width1 = sampleWithDimensions.dimensions?.width ?? "Tidak diketahui";
const width2 = sampleWithoutDimensions.dimensions?.width ?? "Tidak diketahui";

// 7. Default Parameter
function filterByCategory(items = [], selectedCategory = "all") {
  if (selectedCategory === "all") return items;
  return items.filter((item) => item.category === selectedCategory);
}

/*
   Latihan 20.1 — Refactoring getStatistics dari Bagian 5
   Menggunakan modern syntax: destructuring, arrow functions, Math helpers,
   serta optional chaining & nullish coalescing untuk data defensif.
*/
function getStatisticsRefactored(productsList = []) {
  if (!productsList?.length) {
    return {
      totalProducts: 0,
      averagePrice: 0,
      highestPrice: 0,
      lowestPrice: 0,
      totalStock: 0,
      averageRating: 0,
    };
  }

  const totalProducts = productsList.length;

  // Destructuring dalam parameter callback reduce
  const totalPrice = productsList.reduce((sum, { price = 0 }) => sum + price, 0);
  const totalStock = productsList.reduce((sum, { stock = 0 }) => sum + stock, 0);
  const totalRating = productsList.reduce((sum, { rating = 0 }) => sum + rating, 0);

  // Menggunakan Math.max / Math.min dengan spread operator dan optional chaining
  const prices = productsList.map(({ price }) => price ?? 0);
  const highestPrice = Math.max(...prices);
  const lowestPrice = Math.min(...prices);

  return {
    totalProducts,
    averagePrice: Number((totalPrice / totalProducts).toFixed(2)),
    highestPrice,
    lowestPrice,
    totalStock,
    averageRating: Number((totalRating / totalProducts).toFixed(2)),
  };
}

if (require.main === module) {
  console.log("=== BAGIAN 20: Modern JavaScript (ES6+) ===");

  console.log("\n1. Contoh Sintaks ES6+:");
  console.log("Template Literal      :", label);
  console.log("Destructuring Object  :", { title, price, category });
  console.log("Rest Parameter Sum    : $" + sumPrices(100, 200, 300, 50));
  console.log("Optional Chaining (1) :", `Lebar produk 1 = ${width1}`);
  console.log("Optional Chaining (2) :", `Lebar produk 2 = ${width2}`);

  console.log("\n2. Latihan 20.1 — Hasil getStatisticsRefactored():");
  const stats = getStatisticsRefactored(products);
  console.log(stats);

  console.log("\n3. Uji Coba Defensif (Array Kosong / Undefined):");
  console.log(getStatisticsRefactored([]));
}

module.exports = {
  getStatisticsRefactored,
  sumPrices,
  filterByCategory,
};
