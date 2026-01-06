<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
import LayoutHeader from '@/views/LayoutHeader.vue'
const { proxy } = getCurrentInstance()

onMounted(() => {
  window.addEventListener('scroll', windowScrollHandler)
})

const showFixedHeader = ref(false)
function windowScrollHandler() {
  const curScrollTop = window.scrollY
  if (curScrollTop <= 30) {
    showFixedHeader.value = false
  } else {
    showFixedHeader.value = true
  }
}
</script>

<template>
  <div
    class="main-container"
    :style="{
      'max-width': proxy.bodyMaxWidth + 'px',
      'min-width': proxy.bodyMaxWidth + 'px',
    }"
  >
    <div class="banner-background"></div>

    <div class="header" v-if="!showFixedHeader">
      <LayoutHeader></LayoutHeader>
    </div>

    <div class="header-fixed" v-else>
      <LayoutHeader theme="dark"></LayoutHeader>
    </div>

    <div class="body-inner"></div>
  </div>
</template>

<style>
body {
  background: #ededed !important;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}
</style>
<style lang="scss" scoped>
.main-container {
  background: #fff;
  margin: 0 auto;
  min-height: 100vh;
  overflow: hidden;
  position: relative;

  .banner-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 155px;
    background-image: url(@/assets/banner_bg.avif);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 1;
  }

  .header {
    position: relative;
    z-index: 2;
    height: 64px;
    margin: 0 auto;
    width: 100%;
  }

  .header-fixed {
    position: fixed;
    width: 100%;
    top: 0;
    background: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .body-inner {
    height: 20000px;
    padding-top: 155px;
    position: relative;
    z-index: 1;
  }
}
</style>
