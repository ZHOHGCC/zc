<template>
  <el-main class="table">
    <div class="gg">
      <h1>用户管理</h1>

      <el-divider></el-divider>
    </div>
    <div>
      <div class="handle-box">

        <el-input v-model="select_word"
                  placeholder="请输入ID"
                  class="handle-input mr10"></el-input>
        <el-button type="primary"
                   @click="search">搜索</el-button>
        <el-button type="primary"
                   @click="Rsearch">重置列表</el-button>
      </div>
      <el-table :data="tableData"
                border
                style="width: 100%">

        <el-table-column prop="id"
                         label="ID"
                         width="100"
                         align="center">

        </el-table-column>
        <el-table-column prop="name"
                         label="用户名"
                         width="120"
                         align="center">
        </el-table-column>
        <el-table-column prop="phone"
                         label="电话号"
                         align="center">
        </el-table-column>
        <el-table-column label="头像"
                         width="120"
                         align="center">
          <template slot-scope="scope">
            <el-image :src="scope.row.avator"
                      fit="contain"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="wxId"
                         label="微信"
                         align="center">
        </el-table-column>
        <el-table-column prop="invitorId"
                         label="邀请人ID"
                         align="center">
        </el-table-column>
        <el-table-column prop="openId"
                         label="openID"
                         align="center">
        </el-table-column>
        <el-table-column prop="award"
                         label="佣金/次"
                         width="120"
                         align="center">
          <template slot-scope="scope">
            <el-button style="width:60px"
                       @click="changeMoney(scope.$index, scope.row)">{{ scope.row.award }}</el-button>
          </template>

        </el-table-column>
        <el-table-column prop="integration"
                         label="积分/次"
                         width="120"
                         align="center">
          <template slot-scope="scope">
            <el-button style="width:60px"
                       @click="changeScore(scope.$index, scope.row)">{{ scope.row.integration }}</el-button>
          </template>

        </el-table-column>

        <!-- <el-table-column prop="" label="通过状态" sortable width="150">
                </el-table-column> -->
        <el-table-column label="操作"
                         width="180"
                         align="center">
          <template slot-scope="scope">
            <el-button size="small"
                       @click="changeInfo( scope.row,$event)">修改</el-button>
            <!-- <el-button size="small"
                       @click="deleteRow(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination v-if=' tableData != 0'
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="currentPage"
                       :page-size.sync="pageSize"
                       :page-sizes="[10]"
                       layout="total,sizes,prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框                  佣金-->
    <Money :money='money'
           @update='getList'></Money>
    <Score :score='score'
           @update='getList'></Score>
    <change-info :change='change'
                 ref="changeI"
                 @update='getList'></change-info>

  </el-main>
</template>

<script>
import Money from './Visible/Money'
import Score from './Visible/Score'
import changeInfo from './Visible/changeInfo'
import { get } from 'http';
export default {
  name: 'basetable',
  data () {
    return {
      test: '',
      // ---------------------------------------                 分页
      pageSize: 10,
      select_word: '',
      currentPage: 1,
      total: 0,
      tableData: [
      ],
      // --------------------------------------------------------------
      money: {
        show: false,
        number: 0,
        id: ''
      },
      score: {
        show: false,
        number: 0,
        id: ''
      },
      change: {
        show: false,
        row: {},
      },

      form: {
      },

    }
  },
  components: {
    Score,
    Money,
    changeInfo

  },
  created () {
    // this.getData();
  },
  mounted () {
    this.getList()
  },
  computed: {

  },
  methods: {
    getList () {
      let page = this.currentPage - 1
      let size = this.pageSize

      this.$axios.get('/user/all', {
        params: {
          page: page,
        }
      }).then((res) => {
        console.log(res)
        this.tableData = res.data.data.content;
        this.total = res.data.data.totalElements
      })
    },
    //  ——————————————————————————————————————————————————————————————————————————-搜索
    Rsearch () {
      this.getList()
    },

    search () {
      if (this.select_word == '') {
        this.$message({
          type: 'error',
          message: '请输入用户id'
        });
        return false
      }
      let id = this.select_word
      this.$axios.get(`user/${id}`, {
        params: {
          userId: id
        }
      }).then((res) => {
        if (res.data.status == 14) {
          this.$message({
            type: 'error',
            message: '用户不存在'
          });
          return false
        }
        // console.log(res)
        let data = []
        data.push(res.data.data)
        this.tableData = data
        this.total = this.tableData.length
      })
    },
    // ？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？、、

    // -----------------------------------------------------------------------------------改变佣金
    changeScore (index, row) {
      this.score.show = true
      this.score.number = row.integration
      this.score.id = row.id
    },
    changeMoney (index, row) {
      //  alert('111')
      this.money.show = true
      this.money.number = row.award
      this.money.id = row.id
    },





    // ---------------------------------------------------------保存编辑
    // 保存 修改佣金
    // 保存 修改积分
    changeInfo (row, event) {
      this.change.row = row
      this.change.show = true
      this.$refs.changeI.getForm()
    },
    // 确定删除
    deleteRow (index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //----------------------------------------------------------===== 删除请求
        let id = row.id
        this.$axios.delete(`/user/${id}`, { params: { id: id } }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList()
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '删除失败'
          });
        });

        // --------------------------------------------------------------------------------------------

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    // 分页按钮
    handleCurrentChange () {
      this.getList()
    },
    handleSizeChange () {
      this.getList()
    }
  }
}

</script>

<style scoped>
.gg {
  font-size: 30px;
  margin-bottom: 15px;
}
.page {
  margin-top: 10px;
  float: right;
}
span {
  cursor: pointer;
  display: inline-block;
}
.container {
  width: 100%;
  height: 100%;
  padding: 32px;
  box-sizing: border-box;
}
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
</style>

