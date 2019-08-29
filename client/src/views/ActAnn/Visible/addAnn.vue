<template>
  <el-dialog title="新增公告"
             :visible.sync="add.show"
             width="60%">
    <el-form ref="form"
             :model="sizeForm"
             :rules="rules"
             label-width="80px"
             size="mini">

      <el-form-item label="公告名称"
                    prop="title">
        <el-input v-model="sizeForm.title"></el-input>
      </el-form-item>

      <el-form-item label="公告内容"
                    prop="content">
        <el-input type="textarea"
                  v-model="sizeForm.content"></el-input>
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
    add: Object,
  },

  data () {
    return {
      sizeForm: {
        title: '',
        content: ''
      },
      newMoney: 0,
      rules: {
        content: [
          { required: true, message: "不能为空！" }
        ],
        title: [
          { required: true, message: "不能为空！" }
        ],
      }

    };
  },

  methods: {

    onSubmit (form) {

      this.$refs[form].validate(valid => {
        if (valid) {

          let content = this.sizeForm.content
          let title = this.sizeForm.title

          this.$axios.put(`/notice`, {
            content: content,
            title: title,

          }).then(res => {
            // 操作成功
            this.$message({
              message: "添加成功！",
              type: "success"
            });
            this.add.show = false;
            this.$emit("update");
          });
        }
      });
    }
  },
  computed: {

  },
};
</script>

