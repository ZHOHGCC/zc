<template>
  <el-dialog title="查看"
             :visible.sync="detail.show"
             width="80%">
    <el-form ref="detail"
             :model="form2"
             label-width="200px">

      <el-form-item label="ID"
                    disabled="disabled">
        <el-input v-model="detail.data.id"
                  disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="服务名称">
        <el-input v-model="detail.data.title"
                  disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="介绍">
        <el-input v-model="detail.data.intro"
                  disabled="disabled"></el-input>
      </el-form-item>

      <el-form-item label="营销数据">
        <el-input v-model="detail.data.monthSold"
                  disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="实际销量">
        <el-input v-model="detail.data.soldNumber"
                  disabled="disabled"></el-input>
      </el-form-item>

      <el-form-item label="内容">
        <el-input class="nod"
                  type="textarea"
                  disabled
                  @click.prevent
                  contenteditable="false"
                  v-html="detail.data.content"></el-input>
      </el-form-item>
      <el-form-item label="图片"
                    align="center">
        <template>
          <el-image :src="picture"
                    style="width: 250px; height: 250px"
                    fit="contain"></el-image>
        </template>
      </el-form-item>
      <el-form-item label="更新时间">
        <el-input v-model="detail.data.gmtModified"
                  disabled="disabled"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer"
          class="dialog-footer">

      <el-button type="info"
                 @click="detail.show=false">返 回</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "logfound",
  props: {
    detail: Object,
  },

  data () {
    return {
      auditOpinion: '',
      form2: {

      },
      newMoney: 0,
      rules: {
        desc: [
          { required: true, message: "不能为空！" }
        ],
      }

    };
  },

  methods: {



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
      this.detail.show = false;
      // this.$emit("update");
      //   });
      //     }
      //   });
    }
  },
  computed: {
    picture () {
      return this.detail.data.picture
    }
  },

};
</script>

<style scoped>
.nod {
  cursor: not-allowed;
  overflow: auto;
}
</style>