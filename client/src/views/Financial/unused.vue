<template>
  <el-main>
    <div class="gg">
      <h1>优惠卷查看</h1>
      <el-divider></el-divider>

    </div>
    <div>
      <div class="handle-box">
        <el-button type="primary"
                   icon="warning"
                   @click="add.show = true">添加优惠劵</el-button>
        <el-button type="primary"
                   icon="warning"
                   class="addBtn"
                   @click="back">返回</el-button>
      </div>
      <el-table :data="tableData"
                border
                style="width: 100%">

        <el-table-column prop="id"
                         label="ID"
                         width="150"
                         align="center">

        </el-table-column>

        <el-table-column prop="worth"
                         label="价值"
                         width="120"
                         align="center">
        </el-table-column>
        <el-table-column prop="min"
                         label="最小使用金额"
                         width="150"
                         align="center">
        </el-table-column>
        <el-table-column prop="endTime"
                         label="结束时间"
                         :formatter="formatterC"
                         align="center">
        </el-table-column>
        <el-table-column prop="remarks"
                         label="评论"
                         align="center">
        </el-table-column>
        <el-table-column label="操作"
                         min-width="100px"
                         align="center">
          <template slot-scope="scope">
            <button @click="changey(scope.row)">修改</button>
          </template>
        </el-table-column>

      </el-table>
      <div class="page">
        <el-row>
          <el-col :span="24">

            <el-pagination v-if="paginations.total > 0"
                           :page-sizes="paginations.page_sizes"
                           :page-size="paginations.page_size"
                           :layout="paginations.layout"
                           :total="paginations.total"
                           :current-page.sync="paginations.page_index"
                           @current-change="handleCurrentChange"
                           @size-change="handleSizeChange"></el-pagination>

          </el-col>
        </el-row>

      </div>
    </div>
    <changey :change="change"
             ref="change"
             @updata='getList'></changey>
    <addy :addy="add"
          @updata='getList'></addy>
  </el-main>
</template>

<script>
import addy from './Visible/addy'
import changey from './Visible/changey'
export default {
  name: 'basetable',

  data () {
    return {
      change: {        show: false,
        data: ''
      },
      allTableData: [],

      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 10, // 1页显示多少条
        page_sizes: [10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },


      tableData: [

      ],
      add: {
        show: false
      }



    }
  },

  mounted () {
    this.getList()
  },
  created () {

  },
  components: {
    addy,
    changey
  },
  computed: {

  },
  methods: {
    changey (data) {
      this.change.show = true
      this.change.data = data
      console.log(data)
      this.$refs.change.getForm()

    },
    formatterC (row, index) {
      return row.endTime.replace(/.000\+0000/, ' ').replace(/([a-zA-z])+/, ` \n `)
    },

    getList () {
      this.$axios.get(`/publicdecoupons`
      ).then((res) => {
        this.allTableData = res.data.data;

        this.setPaginations();
      })
    },
    back () {
      this.$router.push({
        path: '/financial',
        meta: {
          keepAlive: true
        }
      })
    },

    // -------------------------------------------------------------------分页按钮
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
.addBtn {
  float: right;

  margin-bottom: 20px;
}
</style>

