<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import { debugApp } from '@/services/app'
import { useRoute } from 'vue-router'

const query = ref('')
const messages = ref([])
const isLoading = ref(false)
const route = useRoute()

const clearMessages = () => {
  messages.value = []
}

const send = async () => {
  if (!query.value) {
    Message.error('用戶提問不能為空')
    return
  }
  if (isLoading.value) {
    Message.warning('上一次回覆還沒結束，請稍等')
    return
  }

  try {
    const humanQuery = query.value
    isLoading.value = true

    messages.value.push({
      role: 'human',
      content: humanQuery,
    })

    query.value = ''

    const response = await debugApp(route.params.app_id as string, humanQuery)
    const content = response.data.content

    messages.value.push({
      role: 'ai',
      content: content,
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen">
    <header class="flex items-center h-[74px] bg-gray-200 border-b border-gray-200 px-4">
      頂部導航
    </header>
    <div class="flex flex-row h-[calc(100vh-74px)]">
      <div class="w-2/3 bg-gray-50 h-full">
        <header class="flex items-center h-16 border-b border-gray-200 px-7 text-xl text-gray-700">
          應用編排
        </header>
        <div class="flex flex-row h-[calc(100%-64px)]">
          <div class="flex-1 border-r border-gray-200 p-6">人設與回覆邏輯</div>
          <div class="flex-1 p-6">應用能力</div>
        </div>
      </div>
      <div class="flex flex-col w-1/3 bg-white h-full">
        <header
          class="flex flex-shrink-0 items-center h-16 px-4 text-xl bg-white border-b border-gray-200 shadow-sm"
        >
          調適與預覽
        </header>
        <div class="h-full min-h-0 px-6 py-7 overflow-x-hidden overflow-y-scroll scrollbar-w-none">
          <div class="flex flex-row gap-2 mb-6" v-for="message in messages" :key="message.content">
            <a-avatar
              v-if="message.role === 'ai'"
              :style="{ backgroundColor: '#00d0b6' }"
              :size="30"
              class="flex-shrink-0"
            >
              <icon-apps />
            </a-avatar>
            <a-avatar
              v-else
              :style="{ backgroundColor: '#3370ff' }"
              :size="30"
              class="flex-shrink-0"
              >貞
            </a-avatar>
            <div class="flex flex-col gap-2">
              <div class="font-semibold text-gray-700">
                {{ message.role === 'human' ? '人類' : '聊天機器人' }}
              </div>
              <div
                v-if="message.role === 'human'"
                class="max-w-max bg-blue-700 text-white border border-blue-800 px-4 py-3 rounded-2xl leading-5"
              >
                {{ message.content }}
              </div>
              <div
                v-else
                class="max-w-max bg-gray-100 text-gray-900 border border-gray-200 px-4 py-3 rounded-2xl leading-5"
              >
                {{ message.content }}
              </div>
            </div>
          </div>
          <!-- 沒有任何數據 -->
          <div
            v-if="!messages.length"
            class="mt-[200px] flex flex-col items-center justify-center gap-2"
          >
            <a-avatar :size="70" shape="square" :style="{ backgroundColor: '#00d0b6' }">
              <icon-apps />
            </a-avatar>
            <div class="text-2xl font-semibold text-gray-900 mt-2">聊天機器人</div>
          </div>
          <!-- LLM加載 -->
          <div v-if="isLoading" class="flex flex-row gap-2 mb-6">
            <a-avatar :style="{ backgroundColor: '#00d0b6' }" :size="30" class="flex-shrink-0">
              <icon-apps />
            </a-avatar>
            <div class="flex flex-col gap-2">
              <div class="font-semibold text-gray-700">ChatGPT聊天機器人</div>
              <div
                class="max-w-max bg-gray-100 text-gray-900 border border-gray-200 px-4 py-3 rounded-2xl leading-5"
              >
                <icon-loading />
              </div>
            </div>
          </div>
        </div>
        <div class="w-full flex-shrink-0 flex flex-col">
          <!-- 頂部輸入框  -->
          <div class="px-6 flex items-center gap-4">
            <!--      清除按鈕      -->
            <a-button class="flex-shrink-0" type="text" shape="circle" @click="clearMessages">
              <template #icon>
                <icon-empty size="16" :style="{ color: '#374151' }" />
              </template>
            </a-button>
            <!--  輸入框組件  -->
            <div
              class="h-[50px] flex items-center gap-2 px-4 flex-1 border border-gray-200 rounded-full"
            >
              <input type="text" class="flex-1 outline-0" v-model="query" @keyup.enter="send" />
              <a-button type="text" shape="circle">
                <template #icon>
                  <icon-plus-circle size="16" :style="{ color: '#374151' }" />
                </template>
              </a-button>
              <a-button type="text" shape="circle" @click="send">
                <template #icon>
                  <icon-send size="16" :style="{ color: '#1d4ed8' }" />
                </template>
              </a-button>
            </div>
          </div>
          <!-- 底部提示文字  -->
          <div class="text-center text-gray-500 text-xs py-4">
            內容由AI生成，無法確認真實準確，僅供參考
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
