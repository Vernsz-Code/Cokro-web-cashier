<template>
  <div
    class="bg-gray-700 w-full h-screen relative items-center justify-center flex text-white text-4xl font-bold"
  >
    Undefined Route {{ $route.params.pathMatch }}
    <div
      class="absolute z-10 bg-transparent w-full text-xl flex h-screen p-3 justify-end items-end"
    >
      <router-link to="/produk">
        <button
          class="bg-blue-600 p-3 rounded-xl shadow-lg border-[1px] border-white px-12"
        >
          back
        </button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {};
</script>
