<template>
  <div>
    <el-dialog title="修改积分"
               :visible.sync="score.show"
               width="50%">
      <el-form ref="form"
               :model="form"
               label-width="200px"
               :rules="rules">
        <el-form-item label="积分">
          <el-input type="text"
                    v-model="score.number"
                    disabled="disabled"
                    style="width: 100%;"></el-input>
        </el-form-item>
        <el-form-item label="改为"
                      prop="newScore">
          <el-input type="number"
                    v-model.number="form.newScore"
                    style="width: 100%;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="onSubmit('form')">确 定</el-button>
        <el-button @click="score.show=false">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "logfound",
  props: {
    score: Object,
  },
  data () {
    return {
      form: {
        newScore: 0,
      },
      rules: {
        newScore: [
          { required: true, message: "不能为空！" }
        ],
      }

    };
  },
  methods: {

    onSubmit (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let m = this.form.newScore

          let userId = this.score.id
          this.$axios.post(`/user/${userId}/integration?integration=${m}`, {
            integration: m,
            userId: userId
          }).then(res => {
            // 操作成功
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.score.show = false;
            this.$emit("update");
          });
        }
      });
    }
  }
};
</script>

