<template>
  <div>
  </div>
</template>

<script>
import printJS from "print-js";
import { getCurrentDateFormatted } from '../utils/date.js';
export default {
  data() {
    return {
      currentDate: getCurrentDateFormatted()
    };
  },
  methods: {
    doPrint() {
      printJS({ printable: 'printable', type: 'html', css: ['/src/assets/css/app.css'] })
    },
  },
};
</script>

<style></style>
