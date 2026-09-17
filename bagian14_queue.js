// BAGIAN 14 — Queue (FIFO)

/*
   Konsep Dasar:
   Queue bekerja dengan prinsip First In, First Out (FIFO):
   Elemen yang pertama kali masuk akan menjadi elemen yang pertama kali keluar.
   Analogi: Antrean pembeli di kasir toko atau antrean printer.
*/

// Latihan 14.1 — Implementasi Class Queue
class Queue {
  constructor() {
    this.items = [];
  }

  // Menambahkan elemen ke ujung belakang antrean
  enqueue(item) {
    this.items.push(item);
  }

  // Mengambil dan menghapus elemen dari ujung depan antrean
  dequeue() {
    if (this.isEmpty()) return undefined;
    return this.items.shift();
  }

  // Melihat elemen paling depan tanpa menghapusnya
  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[0];
  }

  // Memeriksa apakah antrean kosong
  isEmpty() {
    return this.items.length === 0;
  }

  // Mendapatkan jumlah elemen dalam antrean
  size() {
    return this.items.length;
  }

  // Mengosongkan antrean
  clear() {
    this.items = [];
  }

  toArray() {
    return [...this.items];
  }
}

/*
   Studi Kasus: Request Queue Simulation
   Mensimulasikan antrean request / tugas asynchronous yang harus ditangani
   secara berurutan (first-come, first-served) agar server tidak overload.
*/
class RequestQueue {
  constructor() {
    this.queue = new Queue();
    this.isProcessing = false;
  }

  addRequest(taskName, taskFn) {
    console.log(`[Queue] Tugas masuk antrean: "${taskName}"`);
    this.queue.enqueue({ taskName, taskFn });
  }

  async processNext() {
    if (this.queue.isEmpty()) {
      console.log("[Queue] Seluruh antrean tugas telah selesai diproses.");
      return;
    }

    const task = this.queue.dequeue();
    console.log(`[Processing] Sedang memproses tugas: "${task.taskName}"`);
    await task.taskFn();
    console.log(`[Done] Selesai memproses: "${task.taskName}"`);
  }

  async processAll() {
    while (!this.queue.isEmpty()) {
      await this.processNext();
    }
  }
}

/*
   Pertanyaan Diskusi Jobsheet:
   Apa perbedaan Stack dan Queue?
   - Stack mengeluarkan elemen yang paling TERAKHIR masuk (LIFO / Last In, First Out).
     Analogi: Tumpukan piring di restoran, tombol 'Undo' di editor teks.
   - Queue mengeluarkan elemen yang paling PERTAMA masuk (FIFO / First In, First Out).
     Analogi: Antrean pembeli di kasir, antrean print dokumen, event loop callback queue.
*/

if (require.main === module) {
  console.log("=== Latihan 14.1: Pengujian Dasar Queue ===");
  const q = new Queue();
  q.enqueue("Customer 1 - Budi");
  q.enqueue("Customer 2 - Siti");
  q.enqueue("Customer 3 - Ahmad");

  console.log("Antrean paling depan (peek):", q.peek()); // Customer 1
  console.log("Dequeue elemen:", q.dequeue());           // Customer 1
  console.log("Antrean paling depan berikutnya:", q.peek()); // Customer 2
  console.log("Sisa antrean:", q.size());               // 2

  console.log("\n=== Simulasi Request Queue Async (FIFO) ===");
  const requestQueue = new RequestQueue();

  requestQueue.addRequest("Fetch Kategori", async () => {
    // Simulasi delay pengerjaan
    await new Promise((r) => setTimeout(r, 100));
  });

  requestQueue.addRequest("Fetch Produk Elektronik", async () => {
    await new Promise((r) => setTimeout(r, 100));
  });

  requestQueue.addRequest("Update Analytics Dashboard", async () => {
    await new Promise((r) => setTimeout(r, 100));
  });

  requestQueue.processAll();
}

module.exports = { Queue, RequestQueue };
