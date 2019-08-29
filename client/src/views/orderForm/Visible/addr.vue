<template>
  <el-dialog title="查看"
             :visible.sync="addr.show"
             width="70%">
    <el-form ref="form2"
             :model="addr"
             label-width="200px">
      <!-- <el-form-item label="用户ID">
        <el-input v-model="addr.item.userId"
                  disabled="disabled"></el-input>
      </el-form-item> -->
      <el-form-item label="用户名"
                    class="h">
        <el-input v-model="address.username"></el-input>
      </el-form-item>
      <el-form-item label="联系方式"
                    class="h">
        <el-input v-model="address.phone"></el-input>
      </el-form-item>
      <el-form-item label="国家"
                    class="h">
        <el-input v-model="address.country"></el-input>
      </el-form-item>
      <el-form-item label="省份"
                    class="h">
        <el-input v-model="address.province"></el-input>
      </el-form-item>
      <el-form-item label="城市"
                    class="h">
        <el-input v-model="address.city"></el-input>
      </el-form-item>
      <el-form-item label="具体位置"
                    class="h">
        <el-input v-model="address.detail"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer"
          class="dialog-footer">

      <el-button type="primary"
                 @click="addr.show=false">返 回</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "logfound",
  props: {
    addr: Object,
  },

  data () {
    return {
      auditOpinion: '',
      address: {

      },
      newMoney: 0,


    };
  },

  methods: {
    getaddr () {
      let addrId = this.addr.addrId
      this.$axios.get(`/addrs/${addrId}`).then((res) => {
        console.log(res)
        this.address = res.data.data
      })
    },
    formatterR (row, index) {
      return row.gmtModified.replace(/.000\+0000/, ' ').replace(/([a-zA-z])+/, ` \n `)
    },
    onSubmit (form) {

      //   this.$refs[form].validate(valid => {
      //     if (valid) {
      // //   表单数据验证完成之后，提交数据;
      //   const url =
      //     this.dialog.option == "add" ? "add" : `edit/${this.form.id}`;
      //   this.$axios.post(`/api/profile/${url}`, this.form).then(res => {
      //     // 操作成功
      //     this.$message({
      //       message: "保存成功！",
      //       type: "success"
      //     });
      this.addr.show = false;
      // this.$emit("update");
      //   });
      //     }
      //   });
    }
  },
  computed: {

  },
};
</script>

<style scoped>
.h {
  pointer-events: none;
}
</style>