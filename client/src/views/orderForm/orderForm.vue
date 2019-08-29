<template>
  <el-main class="table">
    <div class="gg">
      <h1>订单管理</h1>
      <el-divider></el-divider>
    </div>
    <div>
      <div class="handle-box">

        <el-input v-model.trim="select_word"
                  placeholder="请输入用户ID或者订单号"
                  class="handle-input mr10"></el-input>
        <el-button type="primary"
                   icon="f"
                   @click="search">搜索</el-button>
        <el-button type="primary"
                   @click="Rsearch">重置列表</el-button>
      </div>
      <el-table :data="tableData"
                border
                style="width: 100%"
                ref="multipleTable">

        <el-table-column prop="id"
                         label="id"
                         width="150"
                         align="center">

        </el-table-column>
        <el-table-column prop="userId"
                         label="用户id"
                         width="150"
                         align="center">

        </el-table-column>
        <el-table-column prop="orderNumber"
                         label="订单号"
                         width="120"
                         align="center">
        </el-table-column>
        <el-table-column prop="amount"
                         label="金额"
                         width="120"
                         align="center">
        </el-table-column>

        <el-table-column label="查看地址"
                         align="center">
          <template slot-scope="scope">

            <el-button type="primary"
                       @click="showAddr(scope.row)">查看地址</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="gmtCreate"
                         label="创建时间"
                         :formatter="formatterC"
                         align="center">
        </el-table-column>

        <el-table-column prop="introduction"
                         label="支付状态"
                         align="center">
          <template slot-scope="scope">

            <span v-show="scope.row.isPaid">已支付</span>
            <span v-show="!scope.row.isPaid">未支付</span>
          </template>
        </el-table-column>
        <el-table-column label="查看详情"
                         align="center">
          <template slot-scope="scope">

            <el-button type="success"
                       @click="showDetail(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column label="收到"
                         align="center">
          <template slot-scope="scope">

            <el-button type="success"
                       @click="receive(scope.row)">收到订单</el-button>
          </template>
        </el-table-column> -->
        <el-table-column label="订单状态"
                         align="center">
          <template slot-scope="scope">

            <el-button type="primary"
                       v-if=" !scope.row.isFinished && scope.row.isPaid "
                       @click="showEnd(scope.row) ">结束订单</el-button>
            <span v-if="scope.row.isFinished">已结束</span>
            <span v-if="!scope.row.isFinished && !scope.row.isPaid">未支付</span>
          </template>
        </el-table-column>

        <el-table-column label="操作"
                         width="180"
                         align="center">
          <template slot-scope="scope">

            <el-button type="danger"
                       v-if="!scope.row.isPaid"
                       @click="deleteRow(scope.row)">删除</el-button>
            <span v-if="scope.row.isPaid">不能删除</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination v-if=' tableData != 0'
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="currentPage"
                       :page-size="pageSize"
                       :page-sizes="[10]"
                       layout="total,sizes,prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
    </div>
    <end-form :end='end'
              @upata='getList'></end-form>
    <addre :addr='addr'
           ref="addr"></addre>
    <detail-form :detail='detail'></detail-form>
  </el-main>
</template>

<script>
import addre from './Visible/addr'
import detailForm from './Visible/detaill'
import endForm from './Visible/end'
import { constants } from 'crypto';
import { setTimeout } from 'timers';
import { async } from 'q';
export default {
  name: 'basetable',
  data () {
    return {
      orders: [],
      pages: '',
      // ---------------------------------------                 分页
      pageSize: 10,
      select_word: '',
      currentPage: 1,
      total: 0,
      tableData: [
      ],
      // --------------------------------------------------------------
      end: {
        show: false,
        id: ''
      },
      // -----------------------------------------
      detail: {
        show: false,
        item: ''
      },
      addr: {
        show: false,
        userId: ''
      }
    }
  },
  components: {
    endForm,
    detailForm,
    addre

  },
  mounted () {
    this.getList()
  },
  created () {
    // this.getData();
  },
  computed: {

  },
  methods: {
    formatterC (row, index) {
      return row.gmtCreate.replace(/.000\+0000/, ' ').replace(/([a-zA-z])+/, ` \n `)
    },
    handleCurrentChange () {
      this.getList()
    },
    handleSizeChange () {
      this.getList()
    },
    getList () {
      let page = this.currentPage
      let limit = this.pageSize

      this.$axios.get('/orders2', {
        params: {
          page: page,
          limit: limit,

        }
      }).then((res) => {
        this.pages = res.data.data[0].allPage
        this.tableData = res.data.data;
        this.total = res.data.data[0].allPage * 10
      })
    },

    receive (row) {

    },
    showAddr (row) {
      this.addr.show = true
      this.addr.addrId = row.addrId
      this.$refs.addr.getaddr()
    },
    showDetail (row) {
      this.detail.show = true
      this.detail.item = row
    },
    showEnd (row) {
      this.end.show = true
      this.end.id = row.id
    },
    //  ——————————————————————————————————————————————————————————————————————————-搜索
    Rsearch () {
      this.getList()
    },

    async search () {
      if (this.select_word == '') {
        this.$message({
          type: 'error',
          message: '请输入用户id或者订单号'
        });
        return false
      }
      let id = this.select_word
      this.$axios.get(`/user/${id}/orders`).then((res) => {

        if (res.data.status == 14) {
          this.$message({
            type: 'error',
            message: '用户不存在'
          });
          return false
        }

        if (res.data.length !== undefined) {
          this.tableData = res.data.data
          this.total = this.tableData.length
          return
        }
        else {
          if (this.select_word.length < 4) {
            this.$message.error('订单号数位不能小于4')
            return false
          }
          var that = this
          this.getorders(that)
        }

      })




    },


    getorders: async (that) => {

      if (JSON.stringify(that.orders) == '[]') {
        console.log('11')
        for (let i = 1; i <= that.pages; i++) {
          let a = await that.$axios.get('/orders2', {
            params: {
              page: i,
              limit: 10,
            }
          })
          let data = a.data.data

          for (let c of data) {

            that.orders.push(c)
          }
          console.log(that.orders)

        }
      }

      let arr = []
      for (let d of that.orders) {
        if (d.orderNumber.indexOf(that.select_word) != -1) {
          arr.push(d)
        }
      }
      that.tableData = arr
    },

    handleSelectionChange (val) {

    },
    // ---------------------------------------------------------保存编辑

    deleteRow (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //----------------------------------------------------------===== 删除请求
        let id = row.id
        this.$axios.delete(`/order/${id}`).then((res) => {

          if (res.status == 200 && res.data.status == 1) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList()
          } else {
            this.$message({
              type: 'info',
              message: '删除失败'
            });

          }
        })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '删除失败'
            });
          });

        // --------------------------------------------------------------------------------------------

      }).catch((error) => {

        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });


    },
    // 分页按钮

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

