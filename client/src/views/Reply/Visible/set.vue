<template>
  <el-dialog title="回复评论"
             :visible.sync="set.show"
             width="60%">
    <el-form ref="form"
             :model="sizeForm"
             :rules="rules"
             label-width="80px"
             size="mini">

      <el-form-item label="回复"
                    prop="imageSrc">
        <el-input type="textarea"
                  v-model="sizeForm.imageSrc"></el-input>
      </el-form-item>

      <el-form-item size="large">
        <el-button type="primary"
                   @click="onSubmit('form')">立即创建</el-button>
        <el-button @click="add.show=false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  name: "logfound",
  props: {
    set: Object,
  },

  data () {
    return {
      sizeForm: {
        imageSrc: '',

      },
      newMoney: 0,
      rules: {
        imageSrc: [
          { required: true, message: "不能为空！" }
        ],

      }

    };
  },

  methods: {

    onSubmit (form) {

      this.$refs[form].validate(valid => {
        if (valid) {
          //   表单数据验证完成之后，提交数据;
          let reply = this.sizeForm.imageSrc
          let adminId = this.set.userId
          let commentId = this.set.id
          this.$axios.put(`/comment/${commentId}/${reply}`,
            {
              reply: reply,
              adminId: adminId,
              commentId: commentId
            }
          ).then(res => {
            if (res.data.status == 1) {
              this.$emit('updata')
              this.set.show = false
              this.$message.success('上传成功！')

            } else {
              this.$message.error('上传失败')

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

