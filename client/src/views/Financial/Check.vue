<template>
  <el-main class="table">
    <div class="gg">
      <h1>金融服务</h1>
      <!-- <el-button style="float:right"
                   type="primary"
                   @click="toAll"></el-button> -->
      <el-divider></el-divider>
    </div>
    <div>
      <div class="handle-box">

        <el-input v-model="select_word"
                  placeholder="请输入ID"
                  class="handle-input mr10"></el-input>
        <el-button type="primary"
                   icon="search"
                   @click="search">搜索</el-button>
        <el-button type="primary"
                   @click="Rsearch">重置列表</el-button>
        <el-button style="float:right"
                   type="primary"
                   @click="toAll">所有添加优惠劵</el-button>
        <el-button type="primary"
                   icon="warning"
                   style="float:right"
                   @click="showUn">查看优惠巻</el-button>

        <el-button style="float:right"
                   type="primary"
                   @click="look">查看兑换码</el-button>
      </div>
      <el-table :data="tableData"
                border
                style="width: 100%">
        <el-table-column type="selection"
                         width="55"></el-table-column>
        <el-table-column prop="id"
                         label="ID"
                         width="150"
                         align="center">
        </el-table-column>
        <el-table-column prop="name"
                         label="姓名"
                         width="120"
                         align="center">
        </el-table-column>
        <el-table-column label="佣金"
                         align="center">
          <template slot-scope="scope">
            <el-button type="info"
                       round
                       @click="money(scope.row)">查看佣金记录</el-button>

          </template>

        </el-table-column>
        <el-table-column label="积分"
                         align="center">
          <template slot-scope="scope">

            <el-button type="warning"
                       round
                       @click="score(scope.row)">查看积分记录</el-button>
          </template>

        </el-table-column>
        <el-table-column label="钱包"
                         align="center">
          <template slot-scope="scope">

            <el-button type="success"
                       round
                       @click="wallet(scope.row)">查看钱包</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column label="优惠卷"
                         align="center">
          <template slot-scope="scope">

            <el-button type="info"
                       round
                       @click="coupon(scope.row)">查看优惠卷</el-button>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="" label="通过状态" sortable width="150">
                </el-table-column> -->
        <el-table-column label="操作"
                         width="180"
                         align="center">
          <template slot-scope="scope">
            <el-button size="small"
                       @click="addCoupon(scope.row)">添加优惠劵</el-button>
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
    <add-coupon :add="add"
                @update='getList'></add-coupon>
    <add-all :addA="addA"
             @update='getList'></add-all>

  </el-main>
</template>

<script>
import addCoupon from './Visible/addCoupon'
import addAll from './Visible/addAll'
export default {
  name: 'basetable',
  data () {
    return {
      pageSize: 10,
      select_word: '',
      currentPage: 1,
      total: 0,
      tableData: [
      ],
      add: {
        show: false,
        id: ''
      },
      addA: {
        show: false
      }


    }
  },
  components: {
    addCoupon,
    addAll

  },
  created () {
    console.log(window.innerHeight)
  },
  computed: {

  },
  mounted () {
    this.getList()
  },
  methods: {
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
        console.log(res)
        let data = []
        data.push(res.data.data)
        this.tableData = data
        this.total = this.tableData.length
      })
    },
    // ------------------------------------------------------------------
    getList () {
      let page = this.currentPage - 1
      let size = this.pageSize

      this.$axios.get('/user/all', {
        params: {
          page: page,

        }
      }).then((res) => {
        // console.log(res)
        this.tableData = res.data.data.content;
        this.total = res.data.data.totalElements
      })
    },
    //  ——————————————————————————————————————————————————————————————————————————-搜索

    look () {

      this.$router.push({
        path: '/cdkey'

      })
    },

    // -----------------------------------------------------------------------------------改变佣金

    money (row) {

      this.$router.push({
        path: '/lookMoney',
        query: {
          id: row.id,
          name: row.name
        }
      })
    },
    score (row) {

      this.$router.push({
        path: '/lookScore',
        query: {
          id: row.id,
          name: row.name
        }
      })
    },
    wallet (row) {

      this.$router.push({
        path: '/lookWallet',
        query: {
          id: row.id,
          name: row.name
        }
      })
    },


    // -----------------------------
    addCoupon (row) {
      this.add.id = row.id
      this.add.show = true
    },
    toAll () {

      this.addA.show = true
    },
    showUn () {
      this.$router.push('/unused')
    },


    // ---------------------------------------------------------保存编辑
    // 保存 修改佣金
    // 保存 修改积分

    // 确定删除
    deleteRow (index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
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
  min-width: 800px;
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

