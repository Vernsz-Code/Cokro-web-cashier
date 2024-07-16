<template>
  <div class="h-screen p-3">
    <div class="flex w-full justify-between">
      <h3 class="text-2xl font-bold text-left py-2">Produk</h3>
      <div class="mb-4 w-[30em]">
      
        <input
          v-model="searchQuery"
          @input="searchProduk"
          type="text"
          placeholder="Cari produk..."
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <router-link to="/transaksi">
        <button
          class="bg-blue-500 px-5 py-2 rounded-md text-white ml-2 font-bold"
        >
          Exit
        </button>
      </router-link>
    </div>
    <div class="overflow-x-auto max-h-[90%] relative sm:rounded-lg">
      <table
        class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        v-show="tableshow"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-6">Kode</th>
            <th scope="col" class="py-3 px-6">
              <div class="flex items-center">Nama</div>
            </th>
            <th scope="col" class="py-3 px-6">
              <div class="flex items-center">Stok</div>
            </th>
            <th scope="col" class="py-3 px-6">
              <div class="flex items-center">Harga</div>
            </th>
            <th scope="col" class="py-3 px-6">
              <div class="flex items-center">Action</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in produk"
            :key="item.kode_brg"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ item.kode_brg }}
            </th>
            <td class="py-4 px-6">{{ item.nama_brg }}</td>
            <td class="py-4 px-6">{{ item.stok_akhir }}</td>
            <td class="py-4 px-6">{{ formatRupiah(item.jual) }}</td>
            <td class="py-4 px-6">
              <button
                @click="tambahProduk(item)"
                class="bg-blue-500 px-5 py-2 rounded-md text-white ml-2 font-bold"
              >
                Tambah
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="font-bold text-xl text-gray-400 text-center w-full"
        v-show="!tableshow"
      >
        Tidak Ada data
      </div>
    </div>

    <!-- Error Modal -->
    <div
      v-if="showErrorModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow-lg text-center">
        <p class="text-lg font-bold">Produk habis!</p>
        <button
          class="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          @click="closeErrorModal"
        >
          OK
        </button>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow-lg text-center">
        <p class="text-lg font-bold">Produk berhasil ditambahkan!</p>
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
      produk: [],
      tableshow: "",
      showErrorModal: false,
      showSuccessModal: false,
      searchQuery: "", // Data untuk menyimpan query pencarian
    };
  },
  created() {
    this.fetchData(); // Mengambil data saat komponen dibuat
  },
  methods: {
    async fetchData(query = "") {
      try {
        const url = query
          ? `${import.meta.env.VITE_API_URL}/get-data/products/${query}`
          : `${import.meta.env.VITE_API_URL}/get-data/products/all`; // URL untuk mengambil semua data jika query kosong

        const response = await axios.get(url, {
          headers: {
            "api-key": import.meta.env.VITE_API_KEY_HEADER,
          },
        });
        this.produk = response.data.data;
        this.tableshow = this.produk.length > 0; // Tampilkan tabel hanya jika ada data
      } catch (error) {
        this.tableshow = false;
      }
    },
    formatRupiah(value) {
      if (typeof value !== "number") {
        value = Number(value);
      }
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value);
    },
    searchProduk() {
      this.fetchData(this.searchQuery); // Mengambil data berdasarkan query pencarian
    },
    tambahProduk(item) {
      const storedProducts =
        JSON.parse(localStorage.getItem("transactionData")) || [];
      const existingProduct = storedProducts.find(
        (product) => product.kode === item.kode_brg
      );

      if (existingProduct) {
        existingProduct.qty += 1;
      } else {
        storedProducts.push({
          kode: item.kode_brg,
          nama: item.nama_brg,
          qty: 1,
          harga: item.jual,
          mark_up: item.mark_up,
          laba: item.laba,
        });
      }

      localStorage.setItem("transactionData", JSON.stringify(storedProducts));
      this.showSuccessModal = true;
    },
    closeErrorModal() {
      this.showErrorModal = false;
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
      this.$router.push("/transaksi");
    },
  },
};
</script>
