<template>
  <div class="post-list">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--
      el-table: 表格
        :data="tableData" ：传入表格需要展示的数据
        style="width: 100%" 表格宽度100%

      el-table-column： 表格的列
        label： 这一列的表头信息
        prop： 用于指定需要展示的对应的属性名
    -->
    <el-table
      :data="postList"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="400">
      </el-table-column>

      <el-table-column
        prop="user.nickname"
        label="作者"
        width="180">
      </el-table-column>

      <el-table-column
        label="创建时间">
        <template v-slot="{row}">{{row.create_date | time}}</template>
      </el-table-column>

      <el-table-column
        label="封面">
        <template v-slot="{row}">
          <img class="avatar" :src="row.cover[0].url" alt="">
        </template>
      </el-table-column>

      <!--
        对于el-tabl-column表格的一列
        1. 可以通过prop属性来指定表格要显示的内容
        2. 也可以直接给表格列提供内容 直接把要显示的内容放到 <el-table-column></el-table-column>

        el-table-column内部是使用作用域插槽进行封装
          <slot :row="row" :column="column"></slot>
      -->
      <el-table-column
        label="操作"
        width="180"
      >
        <template>
          <el-button>编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      postList: [],
      pageIndex: 1,
      pageSize: 5
    }
  },
  created () {
    // 发送ajax请求，获取文章数据
    this.getPostList()
  },
  methods: {
    async getPostList () {
      const res = await this.$axios.get('/post', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.postList = data
        console.log(this.postList)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.post-list {
  .el-table {
    margin-top: 10px;
    .avatar {
      width: 200px;
      height: 150px;
      object-fit: cover;
    }
  }
}
</style>
