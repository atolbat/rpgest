<template>
  <aside class="w-10 h-screen flex">
    <ul>
      <li
        v-for="(val, i) in items"
        :key="val"
        class="
          w-10
          h-10
          rounded-md
          bg-slate-200
          my-1
          cursor-pointer
          hover:bg-slate-300
        "
        :style="{
          transitionDelay: `${i}ms`,
        }"
      >
        {{ i }}
      </li>
    </ul>

    <ul class="ml-1">
      <li
        v-for="(val, i) in items"
        :key="val"
        class="
          w-10
          h-10
          rounded-md
          bg-slate-200
          my-1
          cursor-pointer
          hover:bg-slate-300
        "
        :style="{
          transitionDelay: `${i}ms`,
        }"
      >
        {{ i }}
      </li>
    </ul>
  </aside>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const items = ref([{}, {}, {}, {}, {}, {}, {}, {}]);
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}
</style>
