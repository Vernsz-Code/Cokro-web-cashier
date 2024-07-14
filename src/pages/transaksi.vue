<template>
  <div class="h-[29em]">
    <h3 class="text-2xl font-bold text-left py-2">Transaksi</h3>
    <div
      class="overflow-x-auto h-full relative flex flex-col sm:rounded-lg font-bold text-sm gap-2"
    >
      <!-- Header -->
      <div class="border-b-2 relative grid grid-cols-2 p-2 w-full">
        <span class="relative flex justify-start items-center pl-5">
          No Faktur : {{ noFaktur }}
        </span>
        <span class="relative flex justify-end items-center pr-5">
          <button
            class="bg-gray-700 px-7 py-2 rounded-md text-white"
            @click="print"
          >
            Cetak
          </button>
        </span>
      </div>
      <div class="border-b-2 relative grid grid-cols-3 grid-rows-2 p-1 w-full">
        <!-- Additional Info Section -->
        <span class="relative flex justify-start items-center pl-5">
          Total Produk: {{ totalProduk }}
        </span>
        <span class="relative flex justify-start items-center pl-5">
          Total Harga: {{ formatRupiah(totalHarga) }}
        </span>
        <span class="relative flex justify-start items-center pl-5">
          Total Diskon: {{ formatRupiah(totalDiskon) }}
        </span>
        <span class="relative flex justify-start items-center pl-5">
          Total Bayar: {{ formatRupiah(totalBayar) }}
        </span>
        <span class="relative flex justify-start items-center col-span-2 pl-6">
          Kembalian: {{ formatRupiah(kembalian) }}
        </span>
      </div>
      <div
        class="border-b-2 relative grid grid-cols-3 items-center px-1 py-1 w-full"
      >
        <form @submit.prevent="fetchProduct">
          <input
            type="text"
            v-model="kodeBarang"
            placeholder="kode barang"
            class="rounded-xl border-gray-700 border-2 p-1"
          />
          <button
            type="submit"
            class="bg-blue-500 px-3 py-2 rounded-md text-white ml-2"
          >
            Cari
          </button>
        </form>
        <div class="flex flex-wrap justify-end items-center col-span-2 gap-3">
          <input
            type="number"
            v-model.number="bayar"
            placeholder="Bayar"
            class="rounded-xl border-gray-700 border-2 p-1"
          />
          <input
            type="checkbox"
            v-model="kredit"
            class="rounded-xl border-gray-700 border-2 p-1"
          />
          <span> Kredit </span>
        </div>
      </div>
      <div class="overflow-x-auto h-[15em] relative sm:rounded-lg w-full">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="py-3 px-6">Nama</th>
              <th scope="col" class="py-3 px-6">
                <div class="flex items-center">Qty</div>
              </th>
              <th scope="col" class="py-3 px-6">
                <div class="flex items-center">Harga</div>
              </th>
              <th scope="col" class="py-3 px-6">
                <div class="flex items-center">Subtotal</div>
              </th>
              <th scope="col" class="py-3 px-6">
                <div class="flex items-center">Action</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in products"
              :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td class="py-4 px-6">{{ item.nama }}</td>
              <td class="py-4 px-6">
                <input
                  type="number"
                  v-model.number="item.qty"
                  @change="updateQty(index)"
                  class="text-white dark:bg-gray-800 dark:border-gray-700 w-full"
                />
              </td>
              <td class="py-4 px-6">{{ formatRupiah(item.price) }}</td>
              <td class="py-4 px-6">
                {{ formatRupiah(item.qty * item.price) }}
              </td>
              <td class="py-4 px-6">
                <button
                  @click="removeProduct(index)"
                  class="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="w-full h-[em] flex items-end justify-start pt-3">
        <button
          class="bg-gray-700 px-3 py-2 rounded-md text-white"
          @click="fetchProduct"
        >
          Cari Barang
        </button>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow-lg text-center">
        <p class="text-lg font-bold">Data berhasil disimpan!</p>
        <button
          class="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          @click="closeSuccessModal"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
      noFaktur: "",
      kodeBarang: "",
      bayar: 0,
      kredit: false,
      totalProduk: 0,
      totalHarga: 0,
      totalDiskon: 0,
      totalBayar: 0,
      kembalian: 0,
      showSuccessModal: false, // For displaying success modal
    };
  },
  async created() {
    await this.fetchNoFaktur();
    this.loadProducts();
  },
  methods: {
    async fetchNoFaktur() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-data/no_faktur`,
          {
            headers: {
              "api-key": import.meta.env.VITE_API_KEY_HEADER,
            },
          }
        );

        if (
          response.data &&
          response.data.data &&
          response.data.data.length > 0
        ) {
          const maxNoFaktur = response.data.data[0]["MAX(no_faktur)"];
          this.noFaktur = (maxNoFaktur + 1).toString();
        } else {
          this.noFaktur = "1";
        }
      } catch (error) {
        console.error("Error fetching no faktur:", error);
      }
    },

    loadProducts() {
      const storedProducts =
        JSON.parse(localStorage.getItem("transactionData")) || [];
      this.products = storedProducts.map((product) => ({
        ...product,
        qty: product.qty || 0,
        price: product.harga || 0,
      }));
      this.calculateTotals();
    },

    updateQty(index) {
      this.products[index].qty = Number(this.products[index].qty) || 0;
      this.calculateTotals();
      this.saveProducts();
    },

    formatRupiah(value) {
      if (value === undefined || value === null) return "Rp 0";
      if (typeof value !== "number") return "Rp 0";
      return value.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
    },

    removeProduct(index) {
      this.products.splice(index, 1);
      this.calculateTotals();
      this.saveProducts();
    },

    saveProducts() {
      const transactionData = this.products.map((product) => ({
        no_faktur: this.noFaktur,
        kode: product.kode || "505",    
        nama: product.nama || "nameless",
        qty: product.qty || 0,
        harga: product.price || 0,
        subtotal: (product.qty * product.price).toFixed(2),
        mark_up: product.mark_up || 0,
        laba: product.laba || 0,
        payment: this.kredit ? "kredit" : "tunai",
        Tunai: this.bayar - this.totalHarga || 0,
        status: this.kredit ? "-" : "lunas",
        retur: 0,
      }));
      localStorage.setItem("transactionData", JSON.stringify(transactionData));
    },

    calculateTotals() {
      this.totalProduk = this.products.reduce(
        (total, item) => total + item.qty,
        0
      );
      this.totalHarga = this.products.reduce(
        (total, item) => total + item.price * item.qty,
        0
      );
      this.totalDiskon = 0;
      this.totalBayar = this.bayar;
      this.kembalian = Math.max(0, this.bayar - this.totalHarga);
    },

    async print() {
      const transactions = this.products.map((product) => ({
        no_faktur: this.noFaktur,
        kode: product.kode,
        nama: product.nama,
        qty: product.qty,
        harga: product.price,
        subtotal: (product.qty * product.price).toFixed(2),
        mark_up: product.mark_up,
        laba: product.laba,
        payment: this.kredit ? "kredit" : "tunai",
        Tunai: this.bayar - this.totalHarga,
        status: this.kredit ? "-" : "lunas",
        retur: 0,
      }));

      try {
        localStorage.setItem("transactionData", JSON.stringify(transactions)); // Save data to localStorage
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/set-data/transaksi_out`,
          transactions,
          {
            headers: {
              "api-key": import.meta.env.VITE_API_KEY_HEADER,
            },
          }
        );
        console.log("Response from server:", response.data);

        // Reset data and show success modal
        this.products = [];
        this.noFaktur = "";
        this.bayar = 0;
        this.kredit = false;
        this.totalProduk = 0;
        this.totalHarga = 0;
        this.totalDiskon = 0;
        this.totalBayar = 0;
        this.kembalian = 0;

        localStorage.removeItem("transactionData");
        this.showSuccessModal = true; // Show success modal
      } catch (error) {
        console.error("Error sending data to server:", error);
      }
    },

    async fetchProduct() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-data/products/${
            this.kodeBarang
          }`,
          {
            headers: {
              "api-key": import.meta.env.VITE_API_KEY_HEADER,
            },
          }
        );

        if (
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data)
        ) {
          const fetchedProducts = response.data.data.map((product) => ({
            nama: product.nama_brg,
            price: product.jual,
            kode: product.kode_brg,
            mark_up: product.mark_up,
            laba: product.laba,
            qty: 1,
          }));

          fetchedProducts.forEach((fetchedProduct) => {
            const existingProduct = this.products.find(
              (item) => item.kode === fetchedProduct.kode
            );

            if (existingProduct) {
              existingProduct.qty += fetchedProduct.qty;
            } else {
              this.products.push(fetchedProduct);
            }
          });

          this.saveProducts();
          this.calculateTotals();
          this.kodeBarang = "";
        } else {
          console.error("No products found with code:", this.kodeBarang);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    },

    closeSuccessModal() {
      this.showSuccessModal = false; // Close the success modal
    },
  },
};
</script>
