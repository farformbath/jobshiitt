// BAGIAN 13 — Stack (LIFO)

/*
   Konsep Dasar:
   Stack bekerja dengan prinsip Last In, First Out (LIFO):
   Elemen yang terakhir dimasukkan akan menjadi elemen pertama yang dikeluarkan.
   Analogi: Tumpukan piring atau tumpukan kartu.
*/

// Latihan 13.1 — Implementasi Class Stack
class Stack {
  constructor() {
    this.items = [];
  }

  // Menambahkan elemen ke atas tumpukan
  push(item) {
    this.items.push(item);
  }

  // Mengambil dan menghapus elemen teratas
  pop() {
    if (this.isEmpty()) return undefined;
    return this.items.pop();
  }

  // Melihat elemen teratas tanpa menghapusnya
  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[this.items.length - 1];
  }

  // Memeriksa apakah tumpukan kosong
  isEmpty() {
    return this.items.length === 0;
  }

  // Mendapatkan jumlah elemen dalam tumpukan
  size() {
    return this.items.length;
  }

  // Mengosongkan tumpukan
  clear() {
    this.items = [];
  }

  // Menampilkan seluruh isi tumpukan (dari atas ke bawah)
  toArray() {
    return [...this.items].reverse();
  }
}

/*
   Latihan 13.2 — Penerapan pada Search History & Undo Search
   Studi kasus: Menyimpan kata kunci pencarian user di Product Explorer.
   Fitur undo search mengembalikan kata kunci sebelumnya.
*/
class SearchHistoryManager {
  constructor() {
    this.historyStack = new Stack();
    this.currentSearch = "";
  }

  search(keyword) {
    if (this.currentSearch) {
      // Simpan pencarian sebelumnya ke stack sebelum ganti keyword baru
      this.historyStack.push(this.currentSearch);
    }
    this.currentSearch = keyword;
    console.log(`[Search] Mencari: "${keyword}"`);
  }

  undoSearch() {
    if (this.historyStack.isEmpty()) {
      console.log("[Undo] Tidak ada riwayat pencarian sebelumnya.");
      return null;
    }
    const previous = this.historyStack.pop();
    this.currentSearch = previous;
    console.log(`[Undo] Mengembalikan ke pencarian: "${previous}"`);
    return previous;
  }

  getCurrentSearch() {
    return this.currentSearch;
  }

  getHistory() {
    return this.historyStack.toArray();
  }
}

if (require.main === module) {
  console.log("=== Latihan 13.1: Pengujian Dasar Stack ===");
  const stack = new Stack();
  stack.push("laptop");
  stack.push("phone");
  stack.push("tablet");

  console.log("Elemen teratas (peek):", stack.peek()); // tablet
  console.log("Pop elemen:", stack.pop());               // tablet
  console.log("Elemen teratas baru:", stack.peek());     // phone
  console.log("Jumlah elemen saat ini:", stack.size()); // 2

  console.log("\n=== Latihan 13.2: Simulasi Search History dengan Stack ===");
  const searchManager = new SearchHistoryManager();

  searchManager.search("laptop");
  searchManager.search("gaming monitor");
  searchManager.search("wireless mouse");

  console.log("Pencarian aktif:", searchManager.getCurrentSearch()); // wireless mouse
  console.log("Tumpukan riwayat (LIFO):", searchManager.getHistory()); // [ 'gaming monitor', 'laptop' ]

  // User klik tombol Undo
  searchManager.undoSearch(); // kembali ke "gaming monitor"
  console.log("Pencarian aktif setelah undo:", searchManager.getCurrentSearch());

  searchManager.undoSearch(); // kembali ke "laptop"
  console.log("Pencarian aktif setelah undo:", searchManager.getCurrentSearch());

  searchManager.undoSearch(); // stack kosong
}

module.exports = { Stack, SearchHistoryManager };
