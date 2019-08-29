<template>
  <el-main class="actTable">
    <div class="gg">
      <h1>提现管理</h1>
      <el-divider></el-divider>
    </div>
    <div>
      <div class="handle-box">

        <el-input v-model="select_word"
                  placeholder="请输入用户ID"
                  class="handle-input mr10"></el-input>
        <el-button type="primary"
                   style="margin-right:20px"
                   @click="searchId">搜索</el-button>
        <!-- <el-input v-model="select"
                  placeholder="请输入提现ID"
                  class="handle-input mr10"></el-input>
        <el-button type="primary"
                   @click="search">搜索</el-button> -->
        <el-button type="primary"
                   @click="Rsearch">重置列表</el-button>
      </div>
      <el-table :data="tableData"
                border
                style="width: 100%"
                ref="multipleTable">

        <el-table-column prop="id"
                         label="ID"
                         align="center">

        </el-table-column>
        <el-table-column prop="userid"
                         label="用户ID"
                         align="center">
        </el-table-column>

        <el-table-column prop="amount"
                         label="金额"
                         align="center">
        </el-table-column>

        <el-table-column prop="gmtModified"
                         label="更新时间"
                         :formatter="formatterR"
                         align="center">
        </el-table-column>
        <el-table-column label="状态"
                         align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.recnum">未处理</span>
            <span v-if="scope.row.confirm == true ">已同意</span>
            <span v-if="scope.row.failed == true ">已拒绝</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         min-width="300px"
                         align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.failed == false && scope.row.confirm == false">
              <el-button type="primary"
                         @click="showagree(scope.row)">同意</el-button>
              <el-button type="primary"
                         @click="showdisagree(scope.row)">不同意</el-button>
            </div>
            <span v-if="scope.row.failed == true || scope.row.confirm == true">已处理</span>
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
    <sagree :agree='agree'
            @updata='getList'></sagree>
    <sdisagree :disagree='disagree'
               @updata='getList'></sdisagree>
    <!-- 删除提示框 -->

  </el-main>
</template>

<script>
import sagree from './Visible/agree'
import sdisagree from './Visible/disagree'
import { setTimeout } from 'timers';
export default {
  name: 'basetable',
  data () {
    return {
      select_word: '',
      select: '',
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
      test: 1,
      disagree: {
        show: false,
        id: "",
      },
      agree: {

        show: false,
        id: "",
      }
    }

  },
  components: {

    sdisagree,
    sagree

  },
  mounted () {
    this.getList()
  },
  created () {

  },
  computed: {

  },
  methods: {
    showagree (row) {
      this.agree.show = true
      this.agree.id = row.id
    },
    showdisagree (row) {
      let withdrawId = row.id
      this.$axios.post(`/withdraw/${withdrawId}?option=false`).then(res => {
        // 操作成功
        if (res.data.status != -1 && res.data.status != 403 && res.status == 200) {
          this.agree.show = false;
          this.$message.success('操作成功')
          this.getList()
        } else {
          let mes = res.data.message
          console.log(res)
          this.$message({
            type: 'error',
            message: `${mes}`
          });
        }


      });
    },
    // ------------------------------

    Rsearch () {
      this.select_word = ''
      this.select = ''
      this.getList()
    },
    searchId () {
      let id = this.select_word
      this.$axios.get(`/withdraws?userId=${id}`).then(res => {
        console.log(res)
        setTimeout(() => {

          this.allTableData = res.data.data;

          this.setPaginations();        }, 0)

      });
    },

    search () {
      let id = this.select
      if (id) {
        this.$axios.get(`/withdraws/${id}`).then(res => {

          console.log(res)
          setTimeout(() => {

            this.allTableData = res.data.data;
            // this.filterTableData = res.data.data;
            this.setPaginations();          }, 0)

        });
      } else {
        this.$message.error('请输入提现记录id')
      }
    },

    // -----------------------------------------------------
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
    getList () {
      this.$axios.get("/withdraws").then(res => {

        console.log(res)
        setTimeout(() => {

          this.allTableData = res.data.data;
          // this.filterTableData = res.data.data;
          this.setPaginations();        }, 0)

      });
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
.handle-box {
  margin-bottom: 20px;
  min-width: 1000px;
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

