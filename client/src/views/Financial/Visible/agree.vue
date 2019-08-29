<template>
  <div>

    <el-dialog title="提现管理"
               :visible.sync="agree.show"
               width="50%">
      <el-form ref="form"
               :model="form"
               label-width="200px"
               :rules="rules">
        <el-form-item label="微信支付账单号"
                      prop='orderSecret'>
          <el-input v-model="form.orderSecret"
                    style="width: 100%;"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="onSubmit('form')">确 定</el-button>
        <el-button @click="agree.show=false">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "logfound",
  props: {
    agree: Object,
  },

  data () {
    return {
      form: {
        orderSecret: '',
        password: ''
      },
      rules: {
        orderSecret: [
          { required: true, message: "不能为空！" }
        ],

      }

    };
  },

  methods: {

    onSubmit (form) {

      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据;
          //   const url =
          let withdrawId = this.agree.id
          let orderSecret = this.form.orderSecret

          this.$axios.post(`/withdraw/${withdrawId}?option=true&orderStr=${orderSecret}`).then(res => {
            // 操作成功
            if (res.data.status != -1 && res.data.status != 403 && res.status == 200) {
              this.agree.show = false;
              this.$emit("updata");
              this.$message.success('操作成功')
            } else {
              let mes = res.data.message
              this.$message({
                type: 'error',
                message: `${mes}`
              });
            }


          });
        }
      });
    }
  },
  computed: {

  },
};
</script>

