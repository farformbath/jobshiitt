// BAGIAN 23 — Async/Await

const { fetchProductById, fetchDashboardData } = require("./bagian22_promise.js");

/*
   Konsep Dasar:
   async/await adalah fitur ES2017 yang membungkus Promise dengan sintaks
   yang jauh lebih bersih, intuitif, dan terbaca seolah-olah sinkron.
   - Kata kunci 'async' menandakan sebuah fungsi mengembalikan Promise.
   - Kata kunci 'await' menunda eksekusi baris berikutnya hingga Promise resolved/rejected,
     tanpa memblokir main thread event loop JavaScript.
*/

// State aplikasi untuk simulasi pemuatan data
const appState = {
  products: [],
  status: "idle", // idle, loading, success, error
  errorMessage: null,
};

// Latihan dari Jobsheet: loadProducts() dengan try/catch/finally
async function loadProducts(simulateFailure = false) {
  appState.status = "loading";
  appState.errorMessage = null;
  console.log(`[State Update] Status: "${appState.status}" (Mulai mengambil data...)`);

  try {
    if (simulateFailure) {
      throw new Error("Gagal terhubung ke server API!");
    }

    // Await Promise penyelesaian data
    const [products] = await fetchDashboardData();
    appState.products = products;
    appState.status = "success";
    console.log(`[State Update] Status: "${appState.status}" (Berhasil mendapatkan ${products.length} produk).`);
  } catch (error) {
    appState.status = "error";
    appState.errorMessage = error.message;
    console.error(`[State Update] Status: "${appState.status}" — Pesan: ${error.message}`);
  } finally {
    console.log("[Finally Block] Memanggil render() untuk memperbarui tampilan antarmuka.");
  }
}

/*
   Perbandingan Keterbacaan:
   1. Pendekatan Promise Chaining:
      getA().then(a => getB(a)).then(b => getC(b)).catch(err => console.error(err));
   2. Pendekatan Async/Await:
      try {
        const a = await getA();
        const b = await getB(a);
        const c = await getC(b);
      } catch (err) {
        console.error(err);
      }
*/

async function runAsyncDemonstrations() {
  console.log("=== BAGIAN 23: Async/Await ===");

  console.log("\n--- Skenario 1: Sukses Mengambil Data ---");
  await loadProducts(false);
  console.log("Isi State Akhir:", { status: appState.status, productCount: appState.products.length });

  console.log("\n--- Skenario 2: Terjadi Kegagalan (Simulasi Error) ---");
  await loadProducts(true);
  console.log("Isi State Akhir:", { status: appState.status, error: appState.errorMessage });

  console.log("\n--- Skenario 3: Mengambil Produk Satuan Berdasarkan ID ---");
  try {
    const item = await fetchProductById(2);
    console.log(`[Hasil Await] Produk ID 2: ${item.title} ($${item.price})`);
  } catch (err) {
    console.error("[Error Await]:", err.message);
  }
}

if (require.main === module) {
  runAsyncDemonstrations();
}

module.exports = { appState, loadProducts, runAsyncDemonstrations };
