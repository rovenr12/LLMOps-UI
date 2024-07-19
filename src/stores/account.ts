import { defineStore } from 'pinia'
import { ref } from 'vue'

const initAccount = {
  name: 'defaultUser',
  email: 'default@email.com',
  avatar: '',
}

export const useAccountStore = defineStore('account', () => {
  const account = ref({ ...initAccount })

  function update(params: any) {
    Object.assign(account.value, params)
  }

  function clear() {
    account.value = { ...initAccount }
  }

  return { account, update, clear }
})
