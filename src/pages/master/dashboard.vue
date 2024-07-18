<template>
  <div class="w-screen h-screen flex ">
    <!-- Side bar -->
    <div class="w-[400px] h-full bg-gray-200 text-white" v-show="showSide">
      <div class="h-[50px] bg-gray-900 flex justify-start items-center">
        <div class="px-[20px]">
          <h3 class="font-bold text-xl">Cashier Dashboard</h3>
        </div>
      </div>
      <div class="h-[calc(100vh-50px)] bg-gray-800 py-[20px]">
        <div
          class="flex flex-col justify-between h-full px-[20px] space-y-[10px]"
        >
          <div
            v-if="!isSelected"
            class="flex flex-col justify-between space-y-[10px]"
          >
            <router-link
              to="/produk"
              class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 bg-gray-200 text-gray-800 transition duration-400 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="fill-current mr-3"
                fill="currentColor"
                width="25px"
                height="25px"
                viewBox="0 0 25 25"
                version="1.1"
              >
                <g id="surface1">
                  <path
                    d="M 12.085938 17.363281 L 12.085938 20.355469 L 10.984375 20.355469 C 10.753906 20.355469 10.570312 20.539062 10.570312 20.769531 C 10.570312 21 10.753906 21.1875 10.984375 21.1875 L 14.015625 21.1875 C 14.246094 21.1875 14.429688 21 14.429688 20.769531 C 14.429688 20.539062 14.246094 20.355469 14.015625 20.355469 L 12.917969 20.355469 L 12.917969 17.363281 C 13.714844 17.261719 14.480469 16.875 15.074219 16.273438 C 15.828125 15.503906 16.246094 14.445312 16.246094 13.285156 C 16.246094 13.054688 16.058594 12.867188 15.828125 12.867188 L 9.171875 12.867188 C 8.941406 12.867188 8.753906 13.054688 8.753906 13.285156 C 8.753906 14.445312 9.171875 15.507812 9.921875 16.273438 C 10.515625 16.875 11.28125 17.261719 12.085938 17.363281 Z M 15.390625 13.699219 C 15.199219 15.488281 13.777344 16.558594 12.5 16.558594 C 11.234375 16.558594 9.796875 15.558594 9.609375 13.699219 Z M 15.390625 13.699219 "
                  />
                  <path
                    d="M 22.863281 9.816406 C 22.863281 9.761719 22.863281 9.664062 21.273438 0.535156 L 21.269531 0.519531 C 21.207031 0.21875 20.941406 0 20.632812 0 L 4.371094 0 C 4.0625 0 3.792969 0.21875 3.730469 0.519531 L 3.730469 0.535156 C 2.726562 6.28125 2.210938 9.289062 2.148438 9.730469 C 2.136719 9.773438 2.132812 9.816406 2.132812 9.859375 L 2.132812 24.347656 C 2.132812 24.707031 2.425781 25 2.785156 25 L 22.214844 25 C 22.574219 25 22.867188 24.707031 22.867188 24.347656 L 22.867188 9.859375 C 22.867188 9.84375 22.867188 9.832031 22.863281 9.816406 Z M 12.949219 0.894531 L 20.425781 0.894531 C 20.964844 3.992188 21.617188 7.738281 21.863281 9.207031 L 12.949219 9.207031 Z M 4.574219 0.894531 L 12.050781 0.894531 L 12.050781 9.207031 L 3.136719 9.207031 C 3.386719 7.738281 4.035156 3.992188 4.574219 0.894531 Z M 21.96875 24.105469 L 3.03125 24.105469 L 3.03125 10.101562 L 21.96875 10.101562 Z M 21.96875 24.105469 "
                  />
                </g>
              </svg>
              Produk
            </router-link>
            <router-link
              to="/transaksi"
              class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-300 hover:text-gray-800 transition duration-400 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="fill-current mr-3"
                fill="currentColor"
                width="25px"
                height="25px"
                viewBox="0 0 25 25"
                version="1.1"
              >
                <g id="surface1">
                  <path
                    d="M 7.292969 18.75 C 6.140625 18.75 5.21875 19.683594 5.21875 20.832031 C 5.21875 21.984375 6.140625 22.917969 7.292969 22.917969 C 8.441406 22.917969 9.375 21.984375 9.375 20.832031 C 9.375 19.683594 8.441406 18.75 7.292969 18.75 Z M 1.042969 2.082031 L 1.042969 4.167969 L 3.125 4.167969 L 6.871094 12.066406 L 5.464844 14.621094 C 5.300781 14.921875 5.207031 15.261719 5.207031 15.625 C 5.207031 16.777344 6.140625 17.707031 7.292969 17.707031 L 19.792969 17.707031 L 19.792969 15.625 L 7.734375 15.625 C 7.589844 15.625 7.472656 15.511719 7.472656 15.363281 C 7.472656 15.316406 7.484375 15.277344 7.503906 15.238281 L 8.4375 13.542969 L 16.199219 13.542969 C 16.980469 13.542969 17.660156 13.109375 18.019531 12.46875 L 21.746094 5.707031 C 21.828125 5.5625 21.875 5.390625 21.875 5.207031 C 21.875 4.632812 21.410156 4.167969 20.832031 4.167969 L 5.433594 4.167969 L 4.441406 2.082031 Z M 17.707031 18.75 C 16.558594 18.75 15.636719 19.683594 15.636719 20.832031 C 15.636719 21.984375 16.558594 22.917969 17.707031 22.917969 C 18.859375 22.917969 19.792969 21.984375 19.792969 20.832031 C 19.792969 19.683594 18.859375 18.75 17.707031 18.75 Z M 17.707031 18.75 "
                  />
                </g>
              </svg>
              Transaksi
            </router-link>
          </div>
          <div
            v-if="isSelected"
            class="flex flex-col justify-between space-y-[10px]"
          >
            <router-link
              to="/produk"
              class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800 transition duration-400 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="fill-current mr-3"
                fill="currentColor"
                width="25px"
                height="25px"
                viewBox="0 0 25 25"
                version="1.1"
              >
                <g id="surface1">
                  <path
                    d="M 12.085938 17.363281 L 12.085938 20.355469 L 10.984375 20.355469 C 10.753906 20.355469 10.570312 20.539062 10.570312 20.769531 C 10.570312 21 10.753906 21.1875 10.984375 21.1875 L 14.015625 21.1875 C 14.246094 21.1875 14.429688 21 14.429688 20.769531 C 14.429688 20.539062 14.246094 20.355469 14.015625 20.355469 L 12.917969 20.355469 L 12.917969 17.363281 C 13.714844 17.261719 14.480469 16.875 15.074219 16.273438 C 15.828125 15.503906 16.246094 14.445312 16.246094 13.285156 C 16.246094 13.054688 16.058594 12.867188 15.828125 12.867188 L 9.171875 12.867188 C 8.941406 12.867188 8.753906 13.054688 8.753906 13.285156 C 8.753906 14.445312 9.171875 15.507812 9.921875 16.273438 C 10.515625 16.875 11.28125 17.261719 12.085938 17.363281 Z M 15.390625 13.699219 C 15.199219 15.488281 13.777344 16.558594 12.5 16.558594 C 11.234375 16.558594 9.796875 15.558594 9.609375 13.699219 Z M 15.390625 13.699219 "
                  />
                  <path
                    d="M 22.863281 9.816406 C 22.863281 9.761719 22.863281 9.664062 21.273438 0.535156 L 21.269531 0.519531 C 21.207031 0.21875 20.941406 0 20.632812 0 L 4.371094 0 C 4.0625 0 3.792969 0.21875 3.730469 0.519531 L 3.730469 0.535156 C 2.726562 6.28125 2.210938 9.289062 2.148438 9.730469 C 2.136719 9.773438 2.132812 9.816406 2.132812 9.859375 L 2.132812 24.347656 C 2.132812 24.707031 2.425781 25 2.785156 25 L 22.214844 25 C 22.574219 25 22.867188 24.707031 22.867188 24.347656 L 22.867188 9.859375 C 22.867188 9.84375 22.867188 9.832031 22.863281 9.816406 Z M 12.949219 0.894531 L 20.425781 0.894531 C 20.964844 3.992188 21.617188 7.738281 21.863281 9.207031 L 12.949219 9.207031 Z M 4.574219 0.894531 L 12.050781 0.894531 L 12.050781 9.207031 L 3.136719 9.207031 C 3.386719 7.738281 4.035156 3.992188 4.574219 0.894531 Z M 21.96875 24.105469 L 3.03125 24.105469 L 3.03125 10.101562 L 21.96875 10.101562 Z M 21.96875 24.105469 "
                  />
                </g>
              </svg>
              Produk
            </router-link>
            <router-link
              to="/transaksi"
              class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 bg-gray-300 text-gray-800 transition duration-400 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="fill-current mr-3"
                fill="currentColor"
                width="25px"
                height="25px"
                viewBox="0 0 25 25"
                version="1.1"
              >
                <g id="surface1">
                  <path
                    d="M 7.292969 18.75 C 6.140625 18.75 5.21875 19.683594 5.21875 20.832031 C 5.21875 21.984375 6.140625 22.917969 7.292969 22.917969 C 8.441406 22.917969 9.375 21.984375 9.375 20.832031 C 9.375 19.683594 8.441406 18.75 7.292969 18.75 Z M 1.042969 2.082031 L 1.042969 4.167969 L 3.125 4.167969 L 6.871094 12.066406 L 5.464844 14.621094 C 5.300781 14.921875 5.207031 15.261719 5.207031 15.625 C 5.207031 16.777344 6.140625 17.707031 7.292969 17.707031 L 19.792969 17.707031 L 19.792969 15.625 L 7.734375 15.625 C 7.589844 15.625 7.472656 15.511719 7.472656 15.363281 C 7.472656 15.316406 7.484375 15.277344 7.503906 15.238281 L 8.4375 13.542969 L 16.199219 13.542969 C 16.980469 13.542969 17.660156 13.109375 18.019531 12.46875 L 21.746094 5.707031 C 21.828125 5.5625 21.875 5.390625 21.875 5.207031 C 21.875 4.632812 21.410156 4.167969 20.832031 4.167969 L 5.433594 4.167969 L 4.441406 2.082031 Z M 17.707031 18.75 C 16.558594 18.75 15.636719 19.683594 15.636719 20.832031 C 15.636719 21.984375 16.558594 22.917969 17.707031 22.917969 C 18.859375 22.917969 19.792969 21.984375 19.792969 20.832031 C 19.792969 19.683594 18.859375 18.75 17.707031 18.75 Z M 17.707031 18.75 "
                  />
                </g>
              </svg>
              Transaksi
            </router-link>
          </div>
          <div class="h-[50px]">
            <div>
              <router-link
                to="/login"
                class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-300 hover:text-gray-800 transition duration-400 ease-in-out"
              >
                <svg
                  aria-hidden="true"
                  class="mr-2 w-[25px] h-[25px] fill-current"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Log Out
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-full bg-gray-400 relative z-10 overflow-y-hidden">
      <div
        class="h-[50px] bg-gray-100 flex items-center shadow-sm px-[20px] w-full py-[10px] z-10 border-b"
      >
        <!-- Hambuger menu -->
        <div class="cursor-pointer w-[30px]" @click="toggleSideBar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            class="w-[25px] h-[25px]"
          >
            <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
            />
          </svg>
        </div>
        <!-- Search bar -->

        <div class="w-[calc(100%-30px)] flex">
          <div class="w-[calc(100%-200px)] flex justify-center">
            <!-- Search bar -->
            <form
              @submit.prevent="searchProduct"
              class="flex items-center w-[500px]"
              v-show="showSearchBar"
            >
              <label for="voice-search" class="sr-only">Search</label>
              <div class="relative w-full">
                <div
                  class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-auto text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  v-model="searchValue"
                  @input="searchProduct"
                  id="voice-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                />
              </div>
              <router-link 
                to="/produk">
                <button @click="clearSearchValue" class=" font-bold ml-3 text-xl">
                  X
                </button>
              </router-link>
            </form>
          </div>
          <!-- User login -->
          <div class="w-[200px]">
            <div
              class="flex items-center justify-start space-x-4 bg-gray-700 rounded-md pl-1 py-2 h-11 cursor-pointer"
              @click="toggleDrop"
            >
              <svg
                aria-hidden="true"
                class="mr-2 w-[40px] h-[40px] fill-white"
                fill="white"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <div class="font-semibold dark:text-white text-left">
                <div>{{username}}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  {{jabatanUser}}
                </div>
              </div>
            </div>
            <!-- Drop down -->
            <div
              v-show="showDropDown"
              class="absolute right-[10px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div class="py-1 text-left" role="none">
                <a
                  href="#"
                  class="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-1"
                  >Support</a
                >
                <router-link to="/login">
                  <button
                    type="submit"
                    class="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-3"
                  >
                    Log Out
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-[calc(100vh-50px)] bg-gray-50 p-[20px]">
        <div class="border border-gray-300 rounded-md p-[20px] h-full">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <!-- Main  -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      username:'',
      showDropDown: false,
      showSide: true,
      showSearchBar: true,
      jabatanUser: "",
      isSelected: "",
      searchValue: "",
    };
  },
  mounted() {
    this.username = localStorage.getItem("username");
    this.jabatanUser = localStorage.getItem("jabatan");
    this.checkRoute();
  },
  methods: {
    clearSearchValue(){
      this.searchValue = ''
    },
    searchProduct() {
      this.$router.push(`/produk/${this.searchValue} `);
    },
    // hide show side bar
    toggleSideBar() {
      this.showSide = !this.showSide;
    },
    // toggle user
    toggleDrop() {
      this.showDropDown = !this.showDropDown;
    },
    checkRoute() {
      if (this.$route.name === "transaksi") {
        this.showSearchBar = false;
        this.isSelected = true;
      } else if (this.$route.name == "produk") {
        this.showSearchBar = true;
        this.isSelected = false;
      }
    },
  },
  watch: {
    $route(to, from) {
      if (to.name === "transaksi") {
        this.checkRoute();
      } else {
        this.checkRoute();
      }
    },
  },
};
</script>

<style></style>
