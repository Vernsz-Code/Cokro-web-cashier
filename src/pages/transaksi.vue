<template>
  <div
    id="printable"
    class="absolute z-[-2] w-[350px] text-black text-xs bg-white grid grid-flow-row py-3 px-2 gap-1"
  >
    <div class="w-full grid grid-flow-row font-bold">
      <span class="w-full text-center">Cokro4Mart</span>
      <span class="w-full text-center">JL.Hos Cokroaminoto No.102</span>
      <span class="w-full text-center">Enggal, B.Lampung</span>
    </div>
    <div class="w-full grid grid-flow-row">
      <div class="w-full grid grid-flow-col">
        <span class="w-20 text-start">No Faktur</span>
        <span class="w-[150px] text-start">: {{ noFaktur }}</span>
      </div>
      <div class="w-full grid grid-flow-col">
        <span class="w-20 text-start">Tanggal</span>
        <span class="w-[150px] text-start">: {{ currentDate }}</span>
      </div>
    </div>
    <div class="w-full mt-3">
      <table class="w-full text-left border-collapse">
        <thead class="border-b-2 border-gray-300">
          <tr class="grid grid-cols-9">
            <th scope="col" class="p-1 col-span-3 border border-gray-300">
              <div class="flex items-center font-normal">Nama Barang</div>
            </th>
            <th scope="col" class="p-1 col-span-2 border border-gray-300">
              <div class="flex items-center font-normal">Harga</div>
            </th>
            <th scope="col" class="p-1 col-span-2 border border-gray-300">
              <div class="flex items-center font-normal">Qty</div>
            </th>
            <th scope="col" class="p-1 col-span-2 border border-gray-300">
              <div class="flex items-center font-normal">Subtotal</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in products"
            :key="index"
            class="grid grid-cols-9"
          >
            <td
              class="px-1 pt-2 pb-10 items-start justify-start col-span-3 border border-gray-300"
            >
              {{ item.nama }}
            </td>
            <td
              class="px-1 pt-2 pb-10 items-start justify-start col-span-2 border border-gray-300"
            >
              {{ formatMoney(item.price) }}
            </td>
            <td
              class="px-1 pt-2 pb-10 items-start justify-start col-span-2 border border-gray-300"
            >
              {{ item.qty }}
            </td>
            <td
              class="px-1 pt-2 pb-10 items-start justify-start col-span-2 border border-gray-300"
            >
              {{ formatMoney(item.qty * item.price) }}
            </td>
          </tr>
          <tr class="grid grid-cols-9">
            <td scope="col" class="p-1 col-span-3"></td>
            <td scope="col" class="p-1 col-span-2"></td>
            <td scope="col" class="p-1 col-span-2 border border-gray-300">
              <div class="flex items-center">{{ totalProduk }}</div>
            </td>
            <td scope="col" class="p-1 col-span-2 border border-gray-300">
              <div class="flex items-center">
                {{ formatMoney(totalHarga) }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="w-full grid grid-flow-row mt-3 font-normal">
      <div class="w-full flex justify-between">
        <span class="w-20 text-start">Total</span>
        <span class="w-[150px] text-end">{{ formatMoney(totalHarga) }}</span>
      </div>
      <div class="w-full flex justify-between border-b-2">
        <span class="w-20 text-start">Tunai</span>
        <span class="w-[150px] text-end">{{ formatMoney(totalBayar) }}</span>
      </div>
      <div class="w-full flex justify-between">
        <span class="w-20 text-start">Kembalian</span>
        <span class="w-[150px] text-end">{{ formatMoney(kembalian) }}</span>
      </div>
    </div>
  </div>
  <div class="h-[29em] relative z-20 bg-gray-50">
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
            @input="fetchProduct"
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
            @change="kembalianFunction"
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
        <router-link to="/searchProdukT">
          <button class="bg-gray-700 px-3 py-2 rounded-md text-white">
            Cari Produk
          </button>
        </router-link>
      </div>
    </div>
    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow-lg text-center">
        <p class="text-lg font-bold">{{ successMessage }}</p>
        <button
          class="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          @click="closeSuccessModal"
        >
          OK
        </button>
      </div>
    </div>

    <!-- Error Modal -->
    <div
      v-if="showErrorModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow-lg text-center">
        <p class="text-lg font-bold">{{ errorMessage }}</p>
        <button
          class="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          @click="closeErrorModal"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getCurrentDateFormatted } from "../utils/date.js";

export default {
  data() {
    return {
      products: [],
      noFaktur: "",
      kodeBarang: "",
      currentDate: getCurrentDateFormatted(),
      bayar: 0,
      kredit: false,
      totalProduk: 0,
      totalHarga: 0,
      totalDiskon: 0,
      totalBayar: 0,
      kembalian: 0,
      showSuccessModal: false, // For displaying success modal
      showErrorModal: false, // For displaying error modal
      errorMessage: "", // Error message to display in the modal
      successMessage: "", // Error message to display in the modal
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
    formatMoney(value) {
      if (value === undefined || value === null) return "0";
      if (typeof value !== "number") return "0";
      return value.toLocaleString("id-ID", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    },

    kembalianFunction() {
      this.calculateTotals();
      this.SuccessModal(`kembalian : ${this.formatRupiah(this.kembalian)}`);
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
        laba: product.qty * product.mark_up,
        payment: this.kredit ? "kredit" : "tunai",
        Tunai: this.bayar - this.totalHarga,
        status: this.kredit ? "-" : "lunas",
        retur: 0,
      }));

      if (transactions.length == 0) {
        this.showError("Tidak ada data yang disimpan");
        return;
      }

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
        try {
          const responses = axios.put(
            `${import.meta.env.VITE_API_URL}/update-data/product`,
            transactions,
            {
              headers: {
                "api-key": import.meta.env.VITE_API_KEY_HEADER,
              },
            }
          );
          console.log("Responses from server:", responses.data);
        } catch (error) {
          console.error("Error sending data to server:", error);
          this.showError("Error updating product data.");
          return;
        }
        console.log("Response from server:", response.data);
        // Reset data and show success modal
        this.SuccessModal("Data berhasil ditambahkan!");
        printJS({
          printable: "printable",
          type: "html",
          css: ["/src/assets/css/app.css"],
        });
        this.products = [];
        this.noFaktur = "";
        this.bayar = 0;
        this.kredit = false;
        this.totalProduk = 0;
        this.totalHarga = 0;
        this.totalDiskon = 0;
        this.totalBayar = 0;
        this.kembalian = 0;
        this.fetchNoFaktur();
        localStorage.removeItem("transactionData");
      } catch (error) {
        console.error("Error sending data to server:", error);
        this.showError("Error saving transaction data.");
      }
    },

    async fetchProduct() {
      try {
        if (this.kodeBarang.length >= 6) {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/get-data/products-t/${
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
              stok_akhir: product.stok_akhir,
            }));

            console.log(response.data.data[0].stok_akhir);

            fetchedProducts.forEach((fetchedProduct) => {
              // if (fetchedProduct.stok_akhir <= 0) {
              //   this.showError("Produk habis");
              //   return;
              // }

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
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    },

    showError(message) {
      this.errorMessage = message;
      this.showErrorModal = true;
    },
    SuccessModal(message) {
      this.successMessage = message;
      this.showSuccessModal = true;
    },

    closeErrorModal() {
      this.showErrorModal = false;
    },

    closeSuccessModal() {
      this.showSuccessModal = false; // Close the success modal
    },
  },
};
</script>
