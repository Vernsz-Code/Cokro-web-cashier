<template>
  <div>
    <button @click="handleClick">getPrinterStatus</button>
    <Modal :show="showModal" @close="showModal = false">
      <template #header>
        Printer Status
      </template>
      <template #body>
        {{ printerStatus }}
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue'
import Modal from './Modal.vue'

const { proxy } = getCurrentInstance()
const isConnect = ref(false)
const showModal = ref(false)
const printerStatus = ref('')

const init = async () => {
  isConnect.value = await proxy.$printer.connect()
}
init()

const getPrinterStatus = async () => {
  return await proxy.$printer.getPrinterStatus()
}

const handleClick = async () => {
  if (!isConnect.value) return false
  printerStatus.value = await getPrinterStatus()
  showModal.value = true
}
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
