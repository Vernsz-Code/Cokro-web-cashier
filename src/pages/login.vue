<template>
  <div class="w-full h-screen flex flex-wrap justify-center items-center">
    <img
      :src="smk4image"
      alt="Smk4BandarLampungImage"
      class="w-full h-full object-cover z-0 absolute brightness-50"
    />
    <div
      class="xl:w-1/3 w-full sm:w-1/2 z-20 h-4/6 bg-gray-800 rounded-xl shadow-xl flex relative items-center justify-center gap-3 text-white flex-col"
    >
      <h2 class="text-4xl font-bold">sign in</h2>
      <form
        @submit.prevent="login"
        class="rounded-lg px-5 py-4 flex flex-col gap-4 w-full"
      >
        <div class="flex flex-col items-start">
          <label for="username">Username:</label>
          <input
            v-model="username"
            id="username"
            type="text"
            class="p-2 text-white bg-gray-500 border-[1px] border-gray-100 rounded-lg w-full"
            placeholder="username"
            required
          />
        </div>
        <div class="flex flex-col items-start">
          <label for="password">Password:</label>
          <input
            v-model="password"
            id="password"
            type="password"
            class="p-2 text-white bg-gray-500 border-[1px] border-gray-100 rounded-lg w-full"
            placeholder="******"
            required
          />
        </div>
        <button
          type="submit"
          class=" bg-blue-600 text-white rounded-lg p-2 "
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import smk4image from "@/assets/smk4.png";
import { mapActions } from 'vuex';

export default {
  mounted() {
    this.initializeApp();
  },
  data() {
    return {
      username: '',
      password: '',
      jabatan: '',
      smk4image,
    };
  },
  methods: {
    ...mapActions(['validateSession']),
    async login() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/login/${this.username}/${this.password}`, {
          headers: {
            "api-key": import.meta.env.VITE_API_KEY_HEADER,
          },
        });

        if (response.data && response.data.data.length > 0) {
          localStorage.setItem('username', this.username);
          localStorage.setItem('password', this.password);
          localStorage.setItem('jabatan', response.data.data[0].jabatan);
          await this.validateSession();
          this.$router.push('/produk');
        } else {
          console.error('Login failed: User not found or incorrect password');
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    initializeApp() {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      localStorage.removeItem('user');
      localStorage.removeItem('jabatan');
      // Tambahkan fungsi yang ingin dijalankan saat pertama kali membuka web di sini
      // Contoh: melakukan API call, inisialisasi data, dll.
    },
  },
};
</script>