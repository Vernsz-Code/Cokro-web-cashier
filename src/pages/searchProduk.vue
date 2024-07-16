<template>
  <div class="h-[29em]">
    <h3 class="text-2xl font-bold text-left py-2">Produk</h3>
    <div class="overflow-x-auto max-h-full relative sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" v-show="tableshow">
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
          </tr>
        </tbody>
      </table>
      <div class=" font-bold text-xl text-gray-400 text-center w-full" v-show="!tableshow">
        Tidak Ada data
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRoute } from 'vue-router'

export default {
  data() {
    return {
      produk: [],
      tableshow:'',
    };
  },
  setup() {
    const route = useRoute();
    return { route };
  },
  created() {
    this.fetchData(this.route.params.search);
  },
  watch: {
    '$route.params.search': 'fetchData',
  },
  methods: {
    async fetchData(value) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-data/products/${value}`,
          {
            headers: {
              "api-key": import.meta.env.VITE_API_KEY_HEADER,
            },
          }
        );
        this.produk = response.data.data;
        this.tableshow = true;
      } catch (error) {
        this.tableshow = false;
      }
    },
    formatRupiah(value) {
      if (typeof value !== 'number') {
        value = Number(value);
      }
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(value);
    },
  },
};
</script>

<style>
/* Add your styles here */
</style>
