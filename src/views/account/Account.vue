<script setup>
import Dialog from '@/components/Dialog.vue'
import { ref } from 'vue'

const dialogConfig = ref({
  show: true,
  buttons: []
})

const formData = ref({});
const formDataRef = ref();
const rules = {
  title: [{ required: true, message: '请输入内容' }],
}
</script>

<template>
  <Dialog
    :show="dialogConfig.show"
    width="820px"
    :show-cancel="false"
    @close="dialogConfig.show = false"
  >
    <div class="dialog-panel">
      <div class="bg">
        <img src="@/assets/login_bg.png" alt="">
      </div>
      <el-form
        :model="formData"
        :rules="rules"
        ref="formDataRef"
        label-width="80px"
        @submit.prevent
      >
        <!--input输入-->
        <el-form-item label="" prop="">
          <el-input
            clearable
            placeholder="请输入"
            v-model.trim="formData.account"
            show-word-limit
            :maxlength="100"
          >

          </el-input>
        </el-form-item>
      </el-form>
    </div>
  </Dialog>
</template>

<style lang="scss">
.dialog-panel {
  display: flex;
  align-items: center;
  justify-content: space-around;
  .bg {
    width: 330px;
    height: 430px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
}
</style>
