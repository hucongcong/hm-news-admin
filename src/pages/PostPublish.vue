<template>
  <div class="post-publish">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item>发布文章</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表单，用于收集新建文章的数据 -->
    <el-form :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="请输入文章的标题"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <!-- v-model用于双向绑定 -->
        <vue-editor v-model="form.content"></vue-editor>
      </el-form-item>
      <el-form-item label="栏目">
        <el-checkbox-group v-model="form.categories">
          <!-- 遍历categoryList,展示所有的分类 -->
          <!--
            label用于提供最终选中的值
            内容是用于展示给用户看的
            如果没有内容，默认会展示label
            <el-checkbox :label="1">内容</el-checkbox>
          -->
          <el-checkbox v-for="item in categoryList" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="封面">
      </el-form-item>
      <el-form-item label="类型">
        <!-- 单选框 -->
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  // 注册成为一个局部组件
  components: {
    VueEditor
  },
  data () {
    return {
      form: {
        title: '',
        content: '',
        categories: [],
        cover: [],
        type: 1
      },
      // 存放所有的分类
      categoryList: []
    }
  },
  created () {
    // 发送ajax请求，获取所有的栏目数据
    this.getCategoryList()
  },
  methods: {
    async getCategoryList () {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.categoryList = data
      }
      console.log(this.categoryList)
    },
    publish () {
      console.log(this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  margin-top: 20px;
}
</style>
