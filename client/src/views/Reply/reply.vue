<template>
  <el-main class="actTable">
    <div class="gg">
      <h1>评论模块</h1>
      <el-divider></el-divider>
    </div>
    <div>

      <el-table :data="tableData"
                border
                style="width: 100%"
                ref="multipleTable">

        <el-table-column prop="userId"
                         label="用户ID"
                         width="50"
                         align="center">

        </el-table-column>
        <el-table-column prop="username"
                         label="用户名"
                         width="80"
                         align="center">
        </el-table-column>

        <el-table-column prop="title"
                         label="服务名称"
                         width="100"
                         align="center">
        </el-table-column>
        <el-table-column prop="comment"
                         label="评论内容"
                         align="center">

        </el-table-column>

        <el-table-column label="图片1"
                         width="180"
                         align="center">

          <template slot-scope="scope">
            <el-image v-if="scope.row.picture1"
                      :src="scope.row.picture1"
                      style="width: 180px; height: 180px"
                      fit="contain"></el-image>
            <span v-if="!scope.row.picture1">无图片</span>
          </template>
        </el-table-column>
        <el-table-column label="图片2"
                         width="180"
                         align="center">
          <template slot-scope="scope">
            <el-image v-if="scope.row.picture2"
                      :src="scope.row.picture2"
                      style="width: 180px; height:180px"
                      fit="contain"></el-image>
            <span v-if="!scope.row.picture2">无图片</span>
          </template>
        </el-table-column>
        <el-table-column label="图片3"
                         width="180"
                         align="center">
          <template slot-scope="scope">
            <el-image v-if="scope.row.picture3"
                      :src="scope.row.picture3"
                      style="width: 180px; height: 180px"
                      fit="contain"></el-image>
            <span v-if="!scope.row.picture3">无图片</span>
          </template>
        </el-table-column>

        <el-table-column prop="gmtModified"
                         label="更新时间"
                         width="100"
                         :formatter="formatterR"
                         align="center">
        </el-table-column>
        <el-table-column label="操作"
                         width="100"
                         align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       @click="Reply(scope.row)">回复</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="120"
                         align="center">
          <template slot-scope="scope">
            <el-button @click="lookReply(scope.$index, scope.row) ">查看回复</el-button>
            <!-- <span v-show=" reply[scope.$index] !== null && reply[scope.$index]== 0 ">未回复</span> -->

          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="100"
                         align="center">
          <template slot-scope="scope">
            <el-button type="success"
                       v-if="!scope.row.rcmd"
                       style="width:100px"
                       @click="tj(scope.$index, scope.row)"> 推 荐 </el-button>
            <el-button type="danger"
                       v-if="scope.row.rcmd"
                       @click="nottj(scope.$index, scope.row)">取消推荐</el-button>

          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination v-if="paginations.total > 0"
                       :page-sizes="paginations.page_sizes"
                       :page-size="paginations.page_size"
                       :layout="paginations.layout"
                       :total="paginations.total"
                       :current-page.sync="paginations.page_index"
                       @current-change="handleCurrentChange"
                       @size-change="handleSizeChange"></el-pagination>
      </div>
    </div>

    <!-- 添加 活动-->
    <look-r :look='look'
            ref="look"></look-r>
    <set :set='set'
         @updata='getList'></set>
    <!-- 删除提示框 -->

  </el-main>
</template>

<script>
import lookR from './Visible/look'
import set from './Visible/set'
import { setTimeout } from 'timers';
import { async } from 'q';
export default {
  name: 'basetable',
  data () {
    return {

      // -------------------------------------------------------------------------------------分页
      allTableData: [],
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 10, // 1页显示多少条
        page_sizes: [10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      tableData: []
      // ------------------------------------------------------------------------------
      ,
      set: {
        userid: '',
        id: '',
        show: false
      },
      look: {
        show: false,
        id: ''
      },
      reply: [],
      test: 1
    }
  },
  components: {

    lookR, set

  },
  mounted () {

  },
  beforeMount () {
    this.getList()
  },
  created () {

  },
  computed: {

  },
  methods: {
    lookIt (row) {

    },
    Reply (row) {
      this.set.userId = row.userId
      this.set.id = row.id
      this.set.show = true

    },
    // ------------------------------------------------------------------
    formatterS (row, index) {
      return row.start.replace(/.000\+0000/, ' ').replace(/([a-zA-z])+/, ` \n `)
    },
    formatterE (row, index) {
      return row.end.replace(/.000\+0000/, ' ').replace(/([a-zA-z])+/, ` \n `)
    },
    formatterC (row, index) {
      return row.gmtCreate.replace(/.000\+0000/, ' ').replace(/([a-zA-z])+/, ` \n `)
    },
    formatterR (row, index) {
      return row.gmtModified.replace(/.000\+0000/, ' ').replace(/([a-zA-z])+/, ` \n `)
    },
    async getList () {
      this.$axios.get("/comment").then((res) => {
        console.log(res)
        if (res.data.status == -1) {
          console.log('aaa')
          this.$message.error("身份失效，请重新登录")
          return false
        }
        // console.log(res)
        // // -------------------------------------------------------------------------------------
        // let mook = res.data.data
        // let ids = []
        // let num = 0
        // let a = []
        // ids = mook.map((item, index) => {
        //   return item.id
        // })
        // for (let i = 0; i < ids.length; i++) {
        //   let commentId = ids[i]
        //   let a = await this.$axios.get(`/comment/${commentId}/reply`)
        //   this.reply.push(a.data.data)

        // }

        // ---------------------------------------------------------------------------

        // console.log(this.reply)
        this.allTableData = res.data.data;
        this.filterTableData = res.data.data;
        this.setPaginations();

        // // // 设置分页数据
        // ------------------------------------------------------------------
        // this.allTableData = res.data.data;
        // this.filterTableData = res.data.data;
        // this.setPaginations();
      });
    },
    //  ——————————————————————————————————————————————————————————————————————————-显示过期活动

    lookReply (index, row) {
      this.look.show = true
      this.look.id = row.id
      this.$refs.look.getReply()
      console.log(this.reply[index])
    },

    tj (index, row) {
      let commentId = row.id
      let recommend = true
      this.$axios.post(`/comment/${commentId}/recommend/?recommend=${recommend}`, {
        recommend: true
      }).then((res) => {
        setTimeout(() => {
          this.getList()
        }, 0)
      })
    },
    nottj (index, row) {
      let commentId = row.id
      let recommend = false
      this.$axios.post(`/comment/${commentId}/recommend/?recommend=${recommend}`, {
        recommend: false
      }).then((res) => {

        setTimeout(() => {
          this.getList()
        }, 0)
      })
    },

    // ---------------------------------------------------------保存编辑
    // 保存 修改佣金
    // 保存 修改积分
    // 确定删除
    // deleteRow (index, row) {
    //   this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     //----------------------------------------------------------删除请求
    //     let id = row.id
    //     this.$axios.delete(`/activity/${id}`, { params: { id: id } }).then(() => {
    //       this.$message({
    //         type: 'success',
    //         message: '删除成功!'
    //       });
    //       this.getList()
    //     }).catch(() => {
    //       this.$message({
    //         type: 'error',
    //         message: '删除失败'
    //       });
    //     });


    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     });
    //   });

    // },
    // 分页按钮--------------------------------------------------------------
    handleCurrentChange (page) {
      // 当前页
      let sortnum = this.paginations.page_size * (page - 1);
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置默认分页数据
      this.tableData = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSizeChange (page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    setPaginations () {
      // 总页数
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 10;
      // 设置默认分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    // -------------------------------------------------------------------
  }
}

</script>

<style scoped>
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
  float: right;
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
.actTable .addBtn {
  float: right;
}
</style>

