<template>
  <div class="login">
    <!--
      el-form: 整个表单组件
        :model="form" 需要给表单组件提供一个对象，这个对象用于收集数据
        label-width="80px" label的宽度
      el-form-item 表单项

      el-input  文本框
        v-model="form.name" 需要绑定对象的某个属性
      el-button: 按钮
     -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.username" placeholder="请输入用户名" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      if (this.form.username === '') {
        this.$message.error('用户名不能为空')
        return
      }
      if (this.form.password === '') {
        this.$message.error('密码不能为空')
        return
      }
      const res = await this.$axios.post('/login', this.form)
      const { statusCode, data } = res.data
      console.log(data)
      if (statusCode === 200) {
        this.$message.success('登录成功')
        // 登录成功后，需要跳转到home组件
        // 在跳转到首页之前，需要保存登录信息
        localStorage.setItem('token', data.token)
        // 把登录时的个人信息保存到localStorage中
        localStorage.setItem('user', JSON.stringify(data.user))
        this.$router.push('/')
      } else {
        this.$message.error('用户名或者密码错误')
      }
    },
    reset () {
      this.form.username = ''
      this.form.password = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  width: 400px;
  margin: 200px auto;
  border: 1px solid #ccc;
  padding: 30px 10px;
  border-radius: 5px;
  box-shadow: 1px 1px #ccc;
  .el-button:last-child {
    margin-left: 80px;
  }
}
</style>
