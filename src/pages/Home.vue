<template>
  <div class="home">
    <!-- 布局 -->
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>
          <img :src="$axios.defaults.baseURL + user.head_img" alt="">
          <div class="nickname">{{user.nickname}}</div>
          <a href="javascript:;" class="logout" @click="logout">退出</a>
        </el-header>
        <el-main>Main</el-main>
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
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
}
</style>
