<template>
  <el-main class="actTable">
    <div class="gg">
      <h1>服务器任务</h1>
      <el-divider></el-divider>
    </div>
    <div>
      <div class="handle-box">

        <!-- <el-button type="primary"
                   icon="search"
                   @click="showPass">显示过期活动</el-button> -->
        <el-button type="primary"
                   icon="search"
                   @click="bf">备份数据库</el-button>
      </div>

    </div>

  </el-main>
</template>

<script>


export default {
  name: 'basetable',
  data () {
    return {


    }
  },
  components: {



  },
  mounted () {

  },
  created () {

  },
  computed: {

  },
  methods: {
    bf () {
      this.$axios('/serverJob/mysqldump').then((res) => {
        if (res.status == 200 && res.data.status == 1) {
          this.$message.success('备份成功')
        } else {
          this.$message.error('备份失败')
        }
      })
    }
    // -------------------------------------------------------------------
  }
}

</script>

<style>
.actTable .cell {
  white-space: pre-line;
  word-break: normal;
}
.actTable .gg {
  font-size: 30px;
  margin-bottom: 15px;
}
.actTable .page {
  margin-top: 10px;
  float: left;
}
.actTable span {
  cursor: pointer;
  display: inline-block;
}
.actTable .container {
  width: 100%;
  height: 100%;
  padding: 32px;
  box-sizing: border-box;
}
.actTable .handle-box {
  margin-bottom: 20px;
}

.actTable .handle-select {
  width: 120px;
}

.actTable .handle-input {
  width: 300px;
  display: inline-block;
}
.actTable .del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
</style>

