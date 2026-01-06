<script setup>
import { zhCn } from 'element-plus/es/locale/index.mjs'

import {ref, reactive, getCurrentInstance, nextTick} from 'vue'
const {proxy} = getCurrentInstance();
import { useRoute,useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const config = ref({
  max: 1,
})
</script>

<template>
  <el-config-provider :locale="zhCn" :message="config">
  <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>