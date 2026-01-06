<script setup>
const props = defineProps({
  theme: {
    type: String,
    default: "light", // light 白色 dark 黑色
  }
})
</script>

<template>
  <div :class="['header-bar', 'header-bar-' + props.theme]">
    <div class="menu">
      <router-link class="iconfont icon-logo" to="">首页</router-link>
    </div>
    <div class="search-body">
      <div class="search-panel">
        <div class="search-panel-inner">
          <input/>
          <div class="iconfont icon-search"></div>
        </div>
      </div>
    </div>
    <div class="user-panel">
      <div class="user-avatar">
        <img src="@/assets/user.png"/>
      </div>
      <div class="user-panel-item">
        <div class="iconfont icon-message"></div>
        <div class="text">消息</div>
      </div>
      <div class="user-panel-item">
        <div class="iconfont icon-collection"></div>
        <div class="text">收藏</div>
      </div>
      <div class="user-panel-item">
        <div class="iconfont icon-history"></div>
        <div class="text">历史</div>
      </div>
      <div class="user-panel-item">
        <div class="iconfont icon-light"></div>
        <div class="text">创作中心</div>
      </div>
      <div class="btn-upload">
        <el-button type="primary" @click="" size="large">
          <span class="iconfont icon-upload"></span>
          <span class="text">投稿</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-bar {
  width: 100%;
  height: 64px;
  padding: 0 25px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  .menu {
    display: flex;
    align-items: center;
    a {
      text-decoration: none;
    }
    .icon-logo {
      font-size: 14px;
      &::before{
        float: left;
        margin-top: -2px;
        font-size: 20px;
        margin-right: 5px;
      }
    }
  }

  .user-panel {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .user-avatar {
      width: 38px;
      height: 38px;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .user-panel-item {
      text-align: center;
      cursor: pointer;
      padding: 0 10px;
      .iconfont {
        text-align: center;
        font-size: 20px;
        font-weight: normal;
      }
      .text {
        font-size: 13px;
      }
    }
    .btn-upload {
      margin-left: 10px;
      .el-button {
        background: #fb7299;
        border-color: #fb7299;
        border-radius: 8px;
        padding: 0 20px;
        .iconfont {
          font-size: 14px;
          &::before {
            margin-right: 5px;
          }
        }
        .text {
          font-size: 14px;
        }

      }
    }
  }
}
.header-bar-light {
  color: #ffffff;
  .menu-item {
    color: #ffffff;
  }
  a {
    color: #ffffff;
  }
}
.header-bar-dark {
  color: #61666d;
  .menu-item {
    color: #61666d;
  }
  a {
    color: #61666d;
  }
}
</style>
