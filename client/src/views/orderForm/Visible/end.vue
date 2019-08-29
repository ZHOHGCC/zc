<template>
  <div>

    <el-dialog title="结束订单"
               :visible.sync="end.show"
               width="50%">
      <el-form ref="form"
               :model="form"
               label-width="200px"
               :rules="rules">
        <el-form-item label="订单密钥"
                      prop='orderSecret'>
          <el-input v-model="form.orderSecret"
                    style="width: 100%;"></el-input>
        </el-form-item>
        <el-form-item label="员工号"
                      prop='password'>
          <el-input type="text"
                    v-model="form.password"
                    style="width: 100%;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="onSubmit('form')">确 定</el-button>
        <el-button @click="end.show=false">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "logfound",
  props: {
    end: Object,
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
          let orderId = this.end.id
          let orderSecret = this.form.orderSecret
          let employee = this.form.password
          this.$axios.post(`/order/${orderId}/finish?orderSecret=${orderSecret}&employee=${employee}`).then(res => {
            // 操作成功
            if (res.data.status != -1 && res.data.status != 403 && res.status == 200) {
              this.end.show = false;
              this.$emit("updata");
              this.$message.success('上传成功！')
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

