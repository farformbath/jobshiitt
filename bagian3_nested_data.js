//BAGIAN 3 — Nested Data


const products = [
  {
    id: 1,
    title: "Laptop",
    price: 1200,
    rating: 4.5,
    stock: 10,
    category: "laptops",
    tags: ["computer", "electronics", "office"],
    dimensions: { width: 30, height: 2, depth: 20 },
    reviews: [
      { user: "A", rating: 5, comment: "Good product" },
      { user: "B", rating: 4, comment: "Worth it" },
    ],
  },
  {
    id: 2,
    title: "Smartphone",
    price: 800,
    rating: 4.2,
    stock: 15,
    category: "phones",
    tags: ["mobile", "electronics"],
    dimensions: { width: 7, height: 0.8, depth: 15 },
    reviews: [
      { user: "C", rating: 4, comment: "Nice camera" },
      { user: "D", rating: 5, comment: "Fast" },
      { user: "E", rating: 3, comment: "Battery so-so" },
    ],
  },
  {
    id: 3,
    title: "Headphones",
    price: 100,
    rating: 4.0,
    stock: 25,
    category: "audio",
    tags: ["audio", "electronics", "gaming"],
    dimensions: { width: 18, height: 8, depth: 18 },
    reviews: [
      { user: "F", rating: 4, comment: "Sound is crisp" },
    ],
  },
];

/*
   1. Ambil semua tag dari seluruh produk menjadi satu array
      (masih boleh array di dalam array — belum diratakan)
*/
function getAllTagsNested(products) {
  return products.map((p) => p.tags);
}

console.log(getAllTagsNested(products));
// [ ['computer','electronics','office'], ['mobile','electronics'], ['audio','electronics','gaming'] ]


// 2. findProductsByTag(products, tag)
function findProductsByTag(products, tag) {
  return products.filter((p) => p.tags.includes(tag));
}

console.log(findProductsByTag(products, "electronics"));
// Laptop, Smartphone, Headphones (semua mengandung tag "electronics")


//3. Hitung jumlah review setiap produk -> { id, title, totalReviews }

function countReviewsPerProduct(products) {
  return products.map((p) => ({
    id: p.id,
    title: p.title,
    totalReviews: p.reviews.length,
  }));
}

console.log(countReviewsPerProduct(products));
// [ {id:1,title:'Laptop',totalReviews:2}, {id:2,title:'Smartphone',totalReviews:3}, {id:3,title:'Headphones',totalReviews:1} ]


//4. Kumpulkan review dengan rating 5 dari seluruh produk

function getFiveStarReviews(products) {
  const result = [];
  for (const p of products) {
    for (const review of p.reviews) {
      if (review.rating === 5) {
        result.push({ productId: p.id, productTitle: p.title, ...review });
      }
    }
  }
  return result;
}

console.log(getFiveStarReviews(products));
// [ {productId:1, productTitle:'Laptop', user:'A', rating:5, comment:'Good product'},
//   {productId:2, productTitle:'Smartphone', user:'D', rating:5, comment:'Fast'} ]


//5. Hitung rata-rata rating dari array reviews per produk

function calculateAverageRating(reviews) {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return total / reviews.length;
}

function getProductsWithComputedRating(products) {
  return products.map((p) => ({
    id: p.id,
    title: p.title,
    computedAverageRating: calculateAverageRating(p.reviews),
  }));
}

console.log(getProductsWithComputedRating(products));
// [ {id:1,title:'Laptop',computedAverageRating:4.5},
//   {id:2,title:'Smartphone',computedAverageRating:4},
//   {id:3,title:'Headphones',computedAverageRating:4} ]


//6. Temukan produk dengan jumlah review terbanyak
function findProductWithMostReviews(products) {
  return products.reduce((mostReviewed, current) =>
    current.reviews.length > mostReviewed.reviews.length ? current : mostReviewed
  );
}

console.log(findProductWithMostReviews(products).title);
// "Smartphone" (3 review)


/*
   7. Kumpulkan seluruh rating dari semua review di semua produk
      menjadi satu array datar (flat)
*/
function getAllReviewRatingsFlat(products) {
  const result = [];
  for (const p of products) {
    for (const review of p.reviews) {
      result.push(review.rating);
    }
  }
  return result;
}

console.log(getAllReviewRatingsFlat(products));
// [5, 4, 4, 5, 3, 4]

module.exports = { products };

