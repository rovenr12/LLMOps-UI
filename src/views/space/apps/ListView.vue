<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
</script>

<template>
  <p>這裡是AI應用列表</p>
  <p>value: {{ counterStore.count }}</p>
  <router-link to="/home">back to home</router-link>
</template>

<style scoped></style>
