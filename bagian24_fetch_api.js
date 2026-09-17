// BAGIAN 24 — Fetch API dan DummyJSON

/*
   Lifecycle Fetch API:
   1. Request dikirim ke URL server (fetch(url)).
   2. Menunggu respons melalui jaringan (Promise pending).
   3. Respons diterima -> Validasi apakah status HTTP sukses melalui response.ok.
   4. Parsing body respons menjadi JSON melalui response.json().
   5. Data ditransformasikan sesuai kebutuhan aplikasi.
   6. Data disimpan ke state dan dirender ke DOM.
*/

// Fallback data lokal jika internet offline saat pengujian
const fallbackProducts = [
  { id: 1, title: "Essence Mascara Lash Princess", price: 9.99, category: "beauty", rating: 4.94, stock: 5 },
  { id: 2, title: "Eyeshadow Palette with Mirror", price: 19.99, category: "beauty", rating: 3.28, stock: 44 },
  { id: 3, title: "Powder Canister", price: 14.99, category: "beauty", rating: 3.82, stock: 59 },
];

/*
   Fungsi fetchProducts() dari Jobsheet
*/
async function fetchProducts(limit = 30) {
  const url = `https://dummyjson.com/products?limit=${limit}`;
  console.log(`[Fetch API] Mengirim request ke: ${url}`);

  try {
    const response = await fetch(url);

    // Validasi response.ok (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} (${response.statusText})`);
    }

    const data = await response.json();
    console.log(`[Fetch API] Berhasil menerima data: ${data.products.length} produk (Total di server: ${data.total}).`);
    return data.products;
  } catch (error) {
    console.error("[Fetch API Error]:", error.message);
    throw error;
  }
}

// State aplikasi untuk latihan 24.1
const appState = {
  products: [],
  status: "idle", // idle, loading, success, error
  errorMessage: null,
};

/*
   Latihan 24.1 — Panggil fetchProducts(), simpan ke state.products,
   tambahkan handling loading, success, dan error ke DOM.
*/
async function loadAndRenderProducts(testErrorMode = false) {
  appState.status = "loading";
  appState.errorMessage = null;
  console.log(`\n[UI Render] Status: "${appState.status}" -> Menampilkan spinner loading...`);

  try {
    let products;
    if (testErrorMode) {
      // Menguji URL salah untuk simulasi error 404
      const badResponse = await fetch("https://dummyjson.com/productss_invalid_endpoint");
      if (!badResponse.ok) {
        throw new Error(`HTTP Error: ${badResponse.status} - Endpoint tidak ditemukan.`);
      }
      const data = await badResponse.json();
      products = data.products;
    } else {
      products = await fetchProducts(10);
    }

    appState.products = products;
    appState.status = "success";

    console.log(`[UI Render] Status: "${appState.status}" -> Berhasil merender daftar produk ke DOM:`);
    console.table(
      appState.products.slice(0, 5).map((p) => ({
        ID: p.id,
        Title: p.title,
        Category: p.category,
        Price: `$${p.price}`,
        Rating: p.rating,
      }))
    );
  } catch (error) {
    appState.status = "error";
    appState.errorMessage = error.message;
    console.error(`[UI Render] Status: "${appState.status}" -> Menampilkan kartu error ke user: "${error.message}"`);
  }
}

/*
   Pertanyaan Diskusi Jobsheet:
   Mengapa response.ok perlu dicek sebelum memanggil response.json()?

   Jawaban:
   fetch() memiliki perilaku khusus di mana Promise TIDAK akan rejected jika server
   mengembalikan status kode HTTP error seperti 404 (Not Found) atau 500 (Internal Server Error).
   fetch() hanya rejected jika terjadi kegagalan jaringan fisik (network failure/offline).
   Oleh karena itu, developer wajib memeriksa boolean response.ok (bernilai true jika
   status code berada di rentang 200–299). Jika response.ok bernilai false, kita harus
   melempar (throw) Error sendiri sebelum mencoba mem-parse JSON yang mungkin berisi pesan error HTML.
*/

if (require.main === module) {
  console.log("=== BAGIAN 24: Fetch API dan DummyJSON ===");

  (async () => {
    console.log("\n--- Skenario 1: Fetch Normal (Sukses) ---");
    await loadAndRenderProducts(false);

    console.log("\n--- Skenario 2: Simulasi Error (URL Salah / Jaringan Gagal) ---");
    await loadAndRenderProducts(true);
  })();
}

module.exports = {
  fetchProducts,
  loadAndRenderProducts,
  fallbackProducts,
};
