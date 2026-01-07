<script setup>
import Request from '@/utils/Request.js'
import Dialog from '@/components/Dialog.vue'
import { ref, getCurrentInstance, nextTick, onMounted, onUpdated } from 'vue'
const { proxy } = getCurrentInstance()
import Verify from '@/utils/Verify.js'
import { useLoginStore } from '@/stores/loginStore.js'
import { Api } from '@/utils/Api.js'
import Message from '@/utils/Message.js'

const loginStore = useLoginStore()

const checkCodeInfo = ref({})
const changeCheckCode = async () => {
  let result = await Request({
    url: Api.checkCode,
  })
  if (!result) {
    return
  }
  checkCodeInfo.value = result.data
}

const dialogConfig = ref({
  buttons: [],
})

const formData = ref({})
const formDataRef = ref()

const checkPassword = (rule, value, callback) => {
  if (value !== formData.value.registerPassword) {
    callback(new Error(rule.message))
  } else {
    callback()
  }
}
const rules = {
  email: [
    { required: true, message: '请输入邮箱' },
    { validator: Verify.email, message: '请输入正确的邮箱' },
  ],
  password: [{ required: true, message: '请输入密码' }],
  nickName: [{ required: true, message: '请输入昵称' }],
  registerPassword: [
    { required: true, message: '请输入密码' },
    { validator: Verify.password, message: '密码只能是数字, 字母, 特殊字符, 8-18位' },
  ],
  reRegisterPassword: [
    { required: true, message: '请再次输入密码' },
    { validator: checkPassword, message: '两次输入密码不一致' },
  ],
  checkCode: [{ required: true, message: '请输入图片验证码' }],
}

const opType = ref(1)
const showPanel = (type) => {
  opType.value = type
  if (loginStore.showLogin) {
    resetForm()
  }
}

const resetForm = () => {
  changeCheckCode()
  nextTick(() => {
    formDataRef.value.resetFields()
    formData.value = {}
  })
}

const doSubmit = () => {
  formDataRef.value.validate(async (valid) => {
    if (!valid) {
      return
    }
    let params = {}
    Object.assign(params, formData.value)
    params.checkCodeKey = checkCodeInfo.value.checkCodeKey
    let result = await Request({
      url: opType.value === 0 ? Api.register : Api.login,
      params,
      errorCallback: () => {
        changeCheckCode()
      },
    })
    if (!result) {
      return
    }

    if (opType.value === 0) {
      Message.success('注册成功, 请登录')
      showPanel(1)
    } else if (opType.value === 1) {
      Message.success('登录成功')
      loginStore.setLogin(false)
      loginStore.saveUserInfo(result.data)
    }
  })
}

const closeDialog = () => {
  loginStore.setLogin(false)
}

onUpdated(() => {
  showPanel(1)
})

onMounted(() => {
  showPanel(1)
})
</script>

<template>
  <Dialog
    :show="loginStore.showLogin"
    width="820px"
    :show-cancel="false"
    @close="closeDialog"
  >
    <div class="dialog-panel">
      <div class="bg">
        <img src="@/assets/login_bg.png" alt="" />
      </div>
      <el-form
        class="login-register"
        :model="formData"
        :rules="rules"
        ref="formDataRef"
        @submit.prevent
      >
        <div class="tab-panel">
          <div :class="[opType === 1 ? 'active' : '']" @click="showPanel(1)">登录</div>
          <el-divider direction="vertical" />
          <div :class="[opType === 0 ? 'active' : '']" @click="showPanel(0)">注册</div>
        </div>
        <!--input输入-->
        <el-form-item prop="email">
          <el-input
            clearable
            placeholder="请输入邮箱"
            v-model.trim="formData.email"
            :maxlength="150"
            size="large"
          >
            <template #prefix>
              <span class="iconfont icon-email"></span>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password" v-if="opType === 1">
          <el-input
            show-password
            placeholder="请输入密码"
            v-model.trim="formData.password"
            size="large"
          >
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>

        <div v-if="opType === 0">
          <el-form-item prop="nickName">
            <el-input
              clearable
              placeholder="请输入昵称"
              v-model.trim="formData.nickName"
              size="large"
            >
              <template #prefix>
                <span class="iconfont icon-password"></span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="registerPassword">
            <el-input
              show-password
              placeholder="请输入密码"
              v-model.trim="formData.registerPassword"
              size="large"
            >
              <template #prefix>
                <span class="iconfont icon-password"></span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="reRegisterPassword">
            <el-input
              show-password
              placeholder="请再次输入密码"
              v-model.trim="formData.reRegisterPassword"
              size="large"
            >
              <template #prefix>
                <span class="iconfont icon-password"></span>
              </template>
            </el-input>
          </el-form-item>
        </div>

        <el-form-item prop="checkCode">
          <div class="check-code-panel">
            <div class="input">
              <el-input placeholder="请输入验证码" v-model.trim="formData.checkCode" size="large">
                <template #prefix>
                  <span class="iconfont icon-checkcode"></span>
                </template>
              </el-input>
            </div>
            <img :src="checkCodeInfo.checkCode" @click="changeCheckCode" alt="" />
          </div>
        </el-form-item>
        <el-form-item prop="">
          <el-button type="primary" @click="doSubmit" class="login-btn" size="large">
            <span v-if="opType === 0">注册</span>
            <span v-if="opType === 1">登录</span>
          </el-button>
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

  .login-register {
    width: 350px;
    .tab-panel {
      margin: 10px auto;
      display: flex;
      width: 130px;
      font-size: 18px;
      align-items: center;
      justify-content: space-around;
      cursor: pointer;
      .active {
        color: #4fa5d9;
      }
    }
  }

  .check-code-panel {
    display: flex;
    align-items: center;
    width: 100%;
    .input {
      flex: 1;
    }
    .right-panel {
      margin-left: 5px;
      cursor: pointer;
    }
    img {
      cursor: pointer;
    }
  }
}
</style>
