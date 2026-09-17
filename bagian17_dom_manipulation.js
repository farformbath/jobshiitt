// BAGIAN 17 — DOM Manipulation

/*
   Konsep Dasar:
   Setelah data diolah dan ditransformasikan, langkah selanjutnya adalah
   merender data tersebut ke Document Object Model (DOM) browser.
   Alur kerja: Data diolah -> Ditransformasikan -> Dirender ke DOM.
*/

// Dataset 5 produk dummy untuk pengujian sesuai Latihan 17.1
const dummyProducts = [
  {
    id: 1,
    title: "Laptop Pro 15",
    price: 1200,
    category: "laptops",
    rating: 4.8,
    thumbnail: "https://via.placeholder.com/150?text=Laptop",
  },
  {
    id: 2,
    title: "Wireless Mouse Ergonomic",
    price: 35,
    category: "accessories",
    rating: 4.4,
    thumbnail: "https://via.placeholder.com/150?text=Mouse",
  },
  {
    id: 3,
    title: "Mechanical Keyboard RGB",
    price: 85,
    category: "accessories",
    rating: 4.7,
    thumbnail: "https://via.placeholder.com/150?text=Keyboard",
  },
  {
    id: 4,
    title: "Curved Gaming Monitor 27\"",
    price: 320,
    category: "monitors",
    rating: 4.6,
    thumbnail: "https://via.placeholder.com/150?text=Monitor",
  },
  {
    id: 5,
    title: "Noise Cancelling Headphones",
    price: 150,
    category: "audio",
    rating: 4.5,
    thumbnail: "https://via.placeholder.com/150?text=Headphones",
  },
];

/*
   Latihan 17.1 — renderProducts(products)
   Fungsi untuk merender daftar produk ke elemen container #product-list.
*/
function renderProducts(products, containerElement) {
  // Dukungan lingkungan Browser maupun Node.js (mock environment)
  const container =
    containerElement ||
    (typeof document !== "undefined"
      ? document.querySelector("#product-list")
      : null);

  if (!container) {
    // Mode Node.js / Server-Side Rendering: buat representasi HTML string
    return products
      .map(
        (product) => `
<div class="product-card" data-id="${product.id}">
  <img src="${product.thumbnail}" alt="${product.title}">
  <h3>${product.title}</h3>
  <p class="category">${product.category}</p>
  <p class="price">Harga: $${product.price}</p>
  <p class="rating">Rating: ⭐ ${product.rating}</p>
</div>`
      )
      .join("\n");
  }

  // Mode Browser DOM sesungguhnya:
  container.innerHTML = "";
  for (const product of products) {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.setAttribute("data-id", product.id);
    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p class="category">${product.category}</p>
      <p class="price">Harga: $${product.price}</p>
      <p class="rating">Rating: ⭐ ${product.rating}</p>
    `;
    container.append(card);
  }
}

if (require.main === module) {
  console.log("=== Latihan 17.1: Simulasi DOM Manipulation ===");
  console.log(`Merender ${dummyProducts.length} produk dummy ke #product-list:\n`);

  const renderedHTML = renderProducts(dummyProducts);
  console.log(renderedHTML);

  console.log("\nKode di atas siap dihubungkan ke index.html dengan elemen:");
  console.log('<div id="product-list"></div>');
}

module.exports = { dummyProducts, renderProducts };
