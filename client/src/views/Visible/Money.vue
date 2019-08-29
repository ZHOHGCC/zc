<template>
  <div>

    <el-dialog title="修改佣金"
               :visible.sync="money.show"
               width="50%">
      <el-form ref="form"
               :model="form"
               label-width="200px"
               :rules="rules">
        <el-form-item label="佣金">
          <el-input type="number"
                    v-model.number="this.money.number"
                    disabled="disabled"
                    style="width: 100%;"></el-input>
        </el-form-item>
        <el-form-item label="改为"
                      prop='newMoney'>
          <el-input type="number"
                    :min='1'
                    v-model.number="form.newMoney"
                    style="width: 100%;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="onSubmit('form')">确 定</el-button>
        <el-button @click="money.show=false">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "logfound",
  props: {
    money: Object,
  },

  data () {
    return {
      form: {
        newMoney: 0
      },
      rules: {
        newMoney: [
          { required: true, message: "不能为空！" }
        ],
      }

    };
  },

  methods: {

    onSubmit (form) {

      this.$refs[form].validate(valid => {
        if (valid) {
          let m = this.form.newMoney

          let userId = this.money.id
          this.$axios.post(`/user/${userId}/award?award=${m}`).then(res => {
            // 操作成功
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.$emit("update");
            this.money.show = false;

          });
        }
      });
    }
  },
  computed: {

  },
};
</script>

