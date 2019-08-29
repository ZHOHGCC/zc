<template>
  <el-main>
    <div class="gg">
      <h1>轮播图</h1>
      <el-divider></el-divider>

    </div>
    <div>
      <div class="handle-box">

        <el-button type="primary"
                   icon="search"
                   class="addBtn"
                   @click="showAdd">添加轮播图</el-button>
      </div>
      <el-table :data="tableData"
                border
                style="width: 100%"
                ref="multipleTable">

        <el-table-column prop="id"
                         label="ID"
                         width="150"
                         align="center">

        </el-table-column>
        <el-table-column prop="productId"
                         label="图片ID"
                         width="200"
                         align="center">
        </el-table-column>
        <el-table-column label="图片ID"
                         align="center"
                         min-width="220">
          <template slot-scope="scope">
            <el-image :src="scope.row.imageSrc"
                      style="width: 200px; height: 200px"></el-image>
          </template>
        </el-table-column>

        <el-table-column prop="gmtCreate"
                         label="创造时间"
                         width="220"
                         :formatter="formatterC"
                         align="center">
        </el-table-column>
        <el-table-column prop="gmtModified"
                         label="修改时间"
                         width="220"
                         :formatter="formatterR"
                         align="center">
        </el-table-column>

        <el-table-column label="操作"
                         width="180"
                         align="center">
          <template slot-scope="scope">
            <el-button type="warning"
                       @click="changeInfo(scope.row)">修改</el-button>
            <el-button type="danger"
                       @click="deleteRow( scope.row)">删除</el-button>
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
    <add-ban :add="add"
             @updata='getList'></add-ban>
    <change-ban :change="change"
                @updata='getList'></change-ban>

    <!-- 删除提示框 -->

  </el-main>
</template>

<script>
import addBan from './visible/addBan'
import changeBan from './visible/changeBan'
export default {
  name: 'basetable',
  data () {
    return {

      allTableData: [],
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 5, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      tableData: [],
      add: {
        show: false,
        data: ''
      },
      change: {
        show: false,
        id: ''
      }

    }
  },
  components: {
    addBan,
    changeBan


  },
  created () {
    this.getList();
  },
  computed: {

  },
  methods: {
    showAdd () {

      this.$axios("/product").then(res => {
        // this.tableData = res.data;
        this.add.data = res.data.data;
        this.add.show = true
      });
    },
    changeInfo (row) {
      this.change.show = true
      this.change.id = row.id
    },
    // ---------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------- 格式化
    formatterC (row, index) {
      return row.gmtCreate.replace(/.000\+0000/, ' ').replace(/([a-zA-z])+/, ` \n `)
    },
    formatterR (row, index) {
      return row.gmtModified.replace(/.000\+0000/, ' ').replace(/([a-zA-z])+/, ` \n `)
    },
    // -------------------------------------------------------------------------------
    getList () {
      this.$axios.get("/home/banner").then(res => {

        this.allTableData = res.data.data;

        // // 设置分页数据
        this.setPaginations();

      });
    },
    //  ——————————————————————————————————————————————————————————————————————————-搜索

    // ？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？、、





    // ---------------------------------------------------------保存编辑
    // 保存 修改佣金
    // 保存 修改积分
    // 确定删除
    deleteRow (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let id = row.id
        this.$axios.delete(`/home/banner/${id}`, {          params: {
            id: id
          }        }).then(() => {
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

