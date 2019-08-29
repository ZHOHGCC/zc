<template>
  <el-main>
    <div class="gg">
      <h1>查看参数</h1>
      <el-divider></el-divider>

    </div>
    <div>
      <div class="handle-box">

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
        <el-table-column prop="productId"
                         label="产品ID"
                         width="150"
                         align="center">

        </el-table-column>
        <el-table-column prop="price"
                         label="金额"
                         width="150"
                         align="center">

        </el-table-column>
        <el-table-column prop="serviceDate"
                         label="服务日期"
                         width="150"
                         :formatter="formatter"
                         align="center">

        </el-table-column>
        <el-table-column prop="serviceTime"
                         label="服务时间"
                         width="250"
                         align="center">

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

  </el-main>
</template>

<script>

export default {
  name: 'basetable',

  data () {
    return {

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



    }
  },

  mounted () {
    this.getList()
  },
  created () {

  },
  computed: {
    name () {
      return this.$route.query.name
    }
  },
  methods: {

    // formatterC (row, index) {
    //   return row.gmtCreate.replace(/.000\+0000/, ' ').replace(/([a-zA-z])+/, ` \n `)
    // },
    formatter (row, index) {
      switch (row.serviceDate) {
        case 1:
          return '星期一'
          break;

        case 2:
          return '星期二'
          break;

        case 3:
          return '星期三'
          break;

        case 4:
          return '星期四'
          break;

        case 5:
          return '星期五'
          break;

        case 6:
          return '星期六'
          break;

        case 7:
          return '星期七'
          break;
      }

    },
    getList () {

      let id = this.$route.query.id
      console.log(id)
      this.$axios.get(`/product/${id}/props`).then((res) => {
        console.log(res)
        this.allTableData = res.data.data;

        this.setPaginations();
      })
    },
    back () {
      this.$router.push({
        path: '/product',
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

