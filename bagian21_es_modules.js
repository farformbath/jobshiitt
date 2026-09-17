// BAGIAN 21 — ES Modules

/*
   Konsep Dasar ES Modules:
   ES Modules (ESM) adalah standar resmi JavaScript modern untuk modularitas kode,
   menggunakan kata kunci 'export' untuk membagikan fungsi/variabel dan 'import'
   untuk menggunakannya di file lain.

   Struktur Folder Modular yang Direkomendasikan Jobsheet:
   js/
     main.js         -> Orchestration / entry point utama aplikasi
     state.js        -> Menyimpan state aplikasi & fungsi pengubah state
     data.js         -> Dataset lokal untuk testing & fallback offline
     api.js          -> Komunikasi dengan DummyJSON API (fetch data)
     ui.js           -> Rendering DOM dan manipulasi tampilan
     algorithms.js   -> Searching, sorting, grouping, frequency counting
     utils.js        -> Helper umum (formatting uang, debounce, dsb)

   Pada file HTML, modul diaktifkan dengan atribut type="module":
   <script type="module" src="js/main.js"></script>
*/

// --- 1. Simulasi algorithms.js ---
const algorithmsModule = {
  linearSearch(array, target) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === target) return i;
    }
    return -1;
  },

  binarySearch(sortedArray, target) {
    let left = 0;
    let right = sortedArray.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (sortedArray[mid] === target) return mid;
      if (sortedArray[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
    return -1;
  },

  groupByCategory(products) {
    return products.reduce((acc, p) => {
      acc[p.category] = acc[p.category] || [];
      acc[p.category].push(p);
      return acc;
    }, {});
  },
};

// --- 2. Simulasi utils.js ---
const utilsModule = {
  formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  },

  capitalize(str = "") {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
};

// --- 3. Simulasi state.js ---
const stateModule = (() => {
  const state = {
    products: [],
    search: "",
    category: "all",
    sortBy: "default",
    status: "idle",
  };

  return {
    getState: () => ({ ...state }),
    updateState: (partial) => Object.assign(state, partial),
  };
})();

// --- 4. Simulasi main.js (Orchestration) ---
function runModularApplicationDemo() {
  console.log("=== Demonstrasi Arsitektur ES Modules ===");

  // Pengujian utilitas
  console.log("Format Uang (utils.js):", utilsModule.formatCurrency(1299.9));
  console.log("Kapitalisasi (utils.js):", utilsModule.capitalize("electronics"));

  // Pengujian algoritma
  const sampleNumbers = [10, 20, 30, 40, 50];
  console.log("Binary Search 40 (algorithms.js): indeks ke-", algorithmsModule.binarySearch(sampleNumbers, 40));

  // Pengujian state
  stateModule.updateState({ search: "keyboard", category: "accessories", status: "success" });
  console.log("State Terkini (state.js):", stateModule.getState());

  /*
     Pertanyaan Diskusi Jobsheet:
     Mengapa memisahkan tanggung jawab kode ke dalam file yang berbeda (separation of concerns)
     memudahkan pengembangan dan debugging?

     Jawaban:
     1. Maintainability: Setiap file memiliki satu fokus tanggung jawab (Single Responsibility Principle).
        Jika terjadi error pada pencarian, kita langsung tahu harus memeriksa algorithms.js, bukan ui.js.
     2. Reusability: Fungsi algoritma atau helper utilitas dapat digunakan ulang di halaman/komponen lain
        tanpa perlu menyalin ulang kodenya.
     3. Kolaborasi Tim: Anggota tim dapat bekerja pada file yang berbeda (misal developer A mengerjakan ui.js,
        developer B mengerjakan api.js) tanpa memicu merge conflict pada version control (Git).
     4. Namespace Bersih: Mencegah tabrakan nama variabel global (global scope pollution).
  */
}

if (require.main === module) {
  runModularApplicationDemo();
}

module.exports = {
  algorithmsModule,
  utilsModule,
  stateModule,
  runModularApplicationDemo,
};
