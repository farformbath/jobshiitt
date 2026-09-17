/* BAGIAN 1 — JavaScript Fundamentals dari Sudut Pandang
   Problem Solving

   Latihan 1.1 — Menghitung Harga Setelah Diskon
 */
function calculateDiscountedPrice(price, discountPercent) {
  return price - (price * discountPercent) / 100;
}

// Testing
console.log(calculateDiscountedPrice(50, 0));     // Hasilnya akan 50


// Latihan 1.2 — Menaikkan Tingkat Kesulitan

const cart = [
  { title: "Laptop", price: 1000, discountPercent: 10 },
  { title: "Mouse", price: 20, discountPercent: 5 },
  { title: "Keyboard", price: 50, discountPercent: 0 },
];

function applyDiscounts(cart) {
  const result = [];
  for (const item of cart) {
    const finalPrice = calculateDiscountedPrice(item.price, item.discountPercent);
    result.push({
      title: item.title,
      originalPrice: item.price,
      discountPercent: item.discountPercent,
      finalPrice,
    });
  }
  return result;
}

console.log(applyDiscounts(cart));
/*
//Hasilnya
[
  { title: 'Laptop',   originalPrice: 1000, discountPercent: 10, finalPrice: 900 },
  { title: 'Mouse',    originalPrice: 20,   discountPercent: 5,  finalPrice: 19 },
  { title: 'Keyboard', originalPrice: 50,   discountPercent: 0,  finalPrice: 50 }
]
*/

module.exports = { calculateDiscountedPrice, applyDiscounts, cart };
