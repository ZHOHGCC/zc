<template>
  <el-dialog title="查看回复"
             :visible.sync="look.show"
             width="80%">

    <el-table :data="tableData"
              border
              style="width: 100%"
              ref="multipleTable">

      <el-table-column prop="gmtModified"
                       label="更新时间"
                       width="400"
                       :formatter="formatterR"
                       align="center">
      </el-table-column>
      <el-table-column prop="reply"
                       label="回复内容"
                       align="center">
      </el-table-column>
    </el-table>
    <el-form ref="form"
             label-width="80px"
             size="mini">

      <el-form-item size="large">

        <el-button class="back"
                   @click="look.show=false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  name: "logfound",
  props: {
    look: Object,
  },

  data () {
    return {
      tableData: []
    };
  },

  methods: {
    formatterR (row, index) {
      return row.gmtModified.replace(/.000\+0000/, ' ').replace(/([a-zA-z])+/, ` \n `)
    },
    getReply () {
      let commentId = this.look.id
      this.$axios.get(`/comment/${commentId}/reply`).then((res) => {
        this.tableData = res.data.data
      })
    }
  },
  computed: {

  },
};
</script>
<style scoped>
.back {
  margin: 30px;
}
</style>
