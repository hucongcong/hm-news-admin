<template>
  <div class="home">
    <!-- 布局 -->
    <el-container>
      <el-aside width="200px">
        <div class="logo">黑马头条</div>
        <!--
          el-menu: 导航菜单
            background-color="#545c64" 导航的背景色
            text-color="#fff" 文字颜色
            active-text-color="#ffd04b" 选中的文字颜色
            router: 如果为true，点击导航的时候就会跳转 会把菜单的index属性作为地址进行跳转。

            default-active： 默认高亮的导航菜单
          el-menu-item: 一个导航菜单项
          -->
          <el-menu
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            :default-active="$route.path"
          >
          <el-menu-item index="/post-list">
            <i class="el-icon-menu"></i>
            <span slot="title">文章列表</span>
          </el-menu-item>
          <el-menu-item index="/post-publish">
            <i class="el-icon-setting"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <img :src="$axios.defaults.baseURL + user.head_img" alt="">
          <div class="nickname">{{user.nickname}}</div>
          <a href="javascript:;" class="logout" @click="logout">退出</a>
        </el-header>
        <el-main>
          <!-- 嵌套路由的出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    async logout () {
      // 弹出一个提示框
      try {
        await this.$confirm('您确定要退出本系统吗?', '提示', { type: 'warning' })
        // 点击了确定
        this.$message.success('退出成功')
        // 删除localStorage中的数据
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        // 跳转到登录页
        this.$router.push('/login')
      } catch {
        // 点击了取消
        this.$message.info('取消退出')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  position: absolute;
  width: 100%;
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    .nickname {
      margin: 0 10px;
    }
  }

  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    .logo {
      height: 60px;
      line-height: 60px;
      background-color: #333;
      color: #fff;
      font-weight: 700;
    }
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
}
</style>
