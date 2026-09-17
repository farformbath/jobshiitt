//BAGIAN 5 — Map, Filter, Reduce dalam Konteks Nyata


const { products: baseProducts } = require("./bagian2_array_object.js");

const ratings = [
  4.5, 4.2, 4.0, 4.3, 4.6, 4.1, 3.9, 4.4, 4.0, 4.2, 4.5, 3.8, 4.1, 4.3, 4.4,
  4.7, 4.2, 3.7, 4.0, 4.3, 4.1, 4.0, 4.6, 4.2, 4.4, 3.9, 4.3, 4.1, 4.5, 4.0,
];

const products = baseProducts.map((p, i) => ({ ...p, rating: ratings[i] }));

//Contoh dasar dari jobsheet: map, filter, reduce

const titles = products.map((p) => p.title);
console.log(titles);
// ["Laptop", "Smartphone", "Headphones", ... ] (30 judul)

const expensiveProducts = products.filter((p) => p.price > 500);
console.log(expensiveProducts.map((p) => p.title));
// ["Laptop", "Smartphone", "4K Monitor"? -> tidak, cek harga masing-masing
// Sebenarnya: "Laptop"(1200), "Smartphone"(800), "Tablet"(450)? -> 450 < 500, tidak masuk
// Yang > 500: Laptop, Smartphone, Gaming Laptop(1800), Curved Monitor(400)? -> tidak
// Hasil pasti: Laptop, Smartphone, Gaming Laptop

const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
console.log(totalStock);
// Jumlah seluruh stock dari 30 produk


//Latihan 5.1 — Rata-rata harga produk kategori "laptops"
const laptopPrices = products
  .filter((p) => p.category === "laptops")
  .map((p) => p.price);

const avgLaptopPrice = laptopPrices.reduce((a, b) => a + b, 0) / laptopPrices.length;

console.log(laptopPrices);      // [1200, 1800]
console.log(avgLaptopPrice);    // 1500


//Latihan 5.2 — getStatistics(products)

function getStatistics(products) {
  const totalProducts = products.length;

  const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
  const averagePrice = totalPrice / totalProducts;

  const highestPrice = products.reduce(
    (max, p) => (p.price > max ? p.price : max),
    products[0].price
  );

  const lowestPrice = products.reduce(
    (min, p) => (p.price < min ? p.price : min),
    products[0].price
  );

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  const totalRating = products.reduce((sum, p) => sum + p.rating, 0);
  const averageRating = totalRating / totalProducts;

  return {
    totalProducts,
    averagePrice,
    highestPrice,
    lowestPrice,
    totalStock,
    averageRating,
  };
}

console.log(getStatistics(products));
/*
{
  totalProducts: 30,
  averagePrice: ...,
  highestPrice: 1800,   // Gaming Laptop
  lowestPrice: 20,      // Desk Lamp LED
  totalStock: ...,
  averageRating: ...
}
*/

module.exports = { products, getStatistics };


