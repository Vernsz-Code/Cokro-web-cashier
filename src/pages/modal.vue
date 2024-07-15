<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          Default Header
        </slot>
        <button @click="closeModal" class="close-button">&times;</button>
      </header>
      <section class="modal-body">
        <slot name="body">
          Default Body
        </slot>
      </section>
      <footer class="modal-footer">
        <slot name="footer">
          Default Footer
        </slot>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['close'])

const closeModal = () => {
  emits('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 1rem;
  border-radius: 5px;
  width: 300px;
  max-width: 100%;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
