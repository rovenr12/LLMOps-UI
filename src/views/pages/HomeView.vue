<script setup lang="ts">
import { useAccountStore } from '@/stores/account'

const accountStore = useAccountStore()

function updateName() {
  accountStore.update({ name: 'newName' })
}
</script>

<template>
  <p>這是主頁</p>
  <p>當前登入的帳號是: {{ accountStore.account.name }}</p>
  <p>當前登入的信箱是: {{ accountStore.account.email }}</p>
  <a-button type="primary" @click="updateName">更新名字</a-button>
  <a-button @click="accountStore.clear">重置</a-button>
  <router-link to="/space/apps">跳轉到應用列表</router-link>
</template>

<style scoped></style>
