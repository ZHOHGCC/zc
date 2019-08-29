<template>
  <el-main class="table">
    <div class="gg">
      <h1>产品管理</h1>
      <el-divider></el-divider>
    </div>
    <div>
      <div class="handle-box">
        <span>请选择类型 ： </span>
        <el-select v-model="type"
                   clearable
                   @change="changeType"
                   placeholder="请选择">
          <el-option v-for="item in options"
                     :key="item.id"
                     :label="item.type"
                     :value="item.id">
          </el-option>
        </el-select>
        <el-button type="primary"
                   @click="Ress">重置搜索</el-button>
        <el-button style="float:right"
                   type="primary"
                   @click="addP">添加产品</el-button>
      </div>
      <el-table :data="tableData"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange">

        <el-table-column prop="id"
                         label="ID"
                         width="80"
                         align="center">
        </el-table-column>

        <el-table-column prop="title"
                         label="类型"
                         width="100"
                         align="center">
        </el-table-column>
        <el-table-column label="简介"
                         align="center">
          <template slot-scope="scope">
            <div v-html="scope.row.intro"
                 style="overflow:auto"></div>
          </template>
        </el-table-column>

        <el-table-column label="图片"
                         align="center">
          <template slot-scope="scope">
            <el-image :src="scope.row.picture"
                      style="width: 250px; height: 250px"
                      fit="contain"></el-image>
          </template>
        </el-table-column>

        <el-table-column label="详情"
                         width="150"
                         align="center">
          <template slot-scope="scope">

            <el-button type="info"
                       round
                       @click="showDetail(scope.row)">查看细节</el-button>
          </template>
        </el-table-column>

        <el-table-column label="查看参数"
                         width="150"
                         align="center">
          <template slot-scope="scope">

            <el-button type="success"
                       round
                       @click="showProps(scope.row)">查看参数</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="" label="通过状态" sortable width="150">
                </el-table-column> -->
        <el-table-column label="操作"
                         width="200"
                         align="center">
          <template slot-scope="scope">
            <el-button @click="changeInfo(scope.row)">修改</el-button>
            <el-button @click="deleteRow(scope.row)">删除</el-button>
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
    <change-pro :change='change'
                ref="changeP"
                @updata='getProfile'></change-pro>
    <detail :detail='detail'></detail>

    <add-p :add='add'
           @updata='getProfile'></add-p>
  </el-main>
</template>

<script>
import addP from './Visible/addProduct'
import detail from './Visible/detail'

import changePro from './Visible/changePro'
export default {
  name: 'basetable',
  data () {
    return {
      type: '',
      pro: {
        show: false,
        id: ''
      },
      detail: {
        show: false,
        data: ''
      },
      change: {
        show: false,
        row: '',
        options: ''
      },
      add: {        show: false,
        options: ''
      },
      // -----------------------------------------
      value: '',
      options: [],
      // ------------------------------------------------------------------------分页
      allTableData: [],
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 5, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      tableData: [
      ],
      // ----------------------------------------------------------------改变

    }
  },
  components: {
    changePro,
    detail,

    addP
  },
  created () {
    this.getProfile()
    this.getType()
  },
  computed: {

  },
  mounted () {

  },
  methods: {

    addP () {
      this.add.show = true
      this.add.options = this.options
    },
    showDetail (row) {

      let id = row.id
      this.$axios(`/product/${id}`).then(res => {

        this.detail.data = res.data.data
        this.detail.data.gmtModified = this.detail.data.gmtModified.replace(/.000\+0000/, ' ').replace(/([a-zA-z])+/, ` \n `)
        this.detail.show = true
      });
    },
    showProps (row) {
      this.$router.push({
        path: '/lookProps',
        query: {
          id: row.id,
        }
      });
    },
    // 
    Ress () {
      this.type = ''
      this.getProfile()
    },
    // ---------------------------------------------------------修改
    changeInfo (row) {
      this.change.show = true
      this.change.row = row
      this.change.options = this.options
      this.$refs.changeP.getForm()
    },
    // ------------------------------------------------        改变选择时
    changeType () {

      let id = this.type
      this.$axios(`/product/type/${id}`, {
        params: {
          id: id
        }
      }).then(res => {

        let status = res.data.status
        if (status == 1) {
          this.allTableData = res.data.data
          this.setPaginations();
        } else {
          this.allTableData = []
          this.setPaginations();
        }


      });
    },

    // -------------------------------------------------------------------------分页
    // -------------------------------------------------------------------------分页

    getType () {
      // 获取表格数据
      this.$axios("/product/type").then(res => {
        this.options = res.data.data;

      });
    },

    getProfile () {
      // 获取表格数据
      this.$axios("/product").then(res => {
        // console.log(res)
        // this.tableData = res.data;
        this.allTableData = res.data.data;


        // 设置分页数据
        this.setPaginations();
      });
    },

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
      this.paginations.page_size = 5;
      // 设置默认分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },


    handleSelectionChange (val) {

    },
    // ---------------------------------------------------------------------------
    // ---------------------------------------------------------------------------
    // 保存 修改佣金
    // 保存 修改积分

    // 确定删除
    deleteRow (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //----------------------------------------------------------===== 删除请求
        let id = row.id
        this.$axios.delete(`/product/${id}`).then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });

          this.getProfile()
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

  }
}

</script>

<style scoped>
img {
  width: 200px;
  height: 200px;
}
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
  min-width: 1000px;
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
img {
  max-width: 100%;
  max-height: 100%;
}
</style>

