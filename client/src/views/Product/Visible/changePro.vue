<template>
  <el-dialog title="修改"
             :visible.sync="change.show"
             width="70%">
    <el-form ref="change2"
             :model="change2"
             :rules="rules"
             label-width="200px">

      <el-form-item label="服务名称"
                    prop="title">
        <el-input v-model="change2.title"></el-input>
      </el-form-item>
      <el-form-item label="营销数据"
                    prop="monthSold">
        <el-input type='number'
                  min="1"
                  v-model.number="change2.monthSold"></el-input>
      </el-form-item>
      <el-form-item label="介绍"
                    prop="intro">
        <el-input type="textarea"
                  v-model="change2.intro"></el-input>
      </el-form-item>

      <el-form-item label="上传图片">
        <template slot-scope="scope">

          <a class="file"><input type="file"
                   @change="getFile($event,scope.$index)">选择图片</a>

        </template>
      </el-form-item>
      <el-form-item label="选择类型"
                    prop="typeId">
        <el-select v-model="change2.typeId"
                   clearable
                   placeholder="请选择">
          <el-option v-for="item in change.options"
                     :key="item.id"
                     :label="item.type"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button type="primary"
                 @click="onSubmit">修改</el-button>
      <el-button type="info"
                 @click="change.show=false">返 回</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "logfound",
  props: {
    change: Object,
  },

  data () {
    return {
      file: '',
      fileUrl: '',
      type: '',
      change2: {},
      newMoney: 0,
      rules: {
        title: [
          { required: true, message: "不能为空！" }
        ],
        intro: [
          { required: true, message: "不能为空！" }
        ],
        typeId: [
          { required: true, message: "不能为空！" }
        ],
        price: [
          { required: true, message: "不能为空！" }
        ],
        serviceDate: [
          { required: true, message: "不能为空！" },

        ],
        serviceTime: [
          { required: true, message: "不能为空！" }
        ],
        content: [
          { required: true, message: "不能为空！" }
        ],
        monthSold: [
          { required: true, message: "不能为空！" }
        ],

      }

    };
  },
  mounted () {

  },
  methods: {

    getFile (event, index) {
      this.file = event.target.files[0];
    },
    getForm () {
      let a = this.change.row
      this.change2 = { ...a }
    },
    onSubmit (form) {

      this.$refs.change2.validate(valid => {
        if (valid) {




          if (this.file) {
            let formData = new FormData();
            formData.append('image', this.file);
            this.$axios.put(`/upload/image?token=${localStorage.eleToken}`, formData).then((res) => {
              this.fileUrl = res.data.data
              this.change2.picture = this.fileUrl
              let id = this.change2.id
              this.$axios.post(`/product/${id}`, this.change2).then(res => {
                // 操作成功
                if (res.data.status != -1 && res.data.status != 403 && res.status == 200) {
                  this.change.show = false;
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
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            })
          } else {
            let id = this.change2.id
            this.$axios.post(`/product/${id}`, this.change2).then(res => {
              // 操作成功
              if (res.data.status != -1 && res.data.status != 403 && res.status == 200) {
                this.change.show = false;
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




        }
      });
    }
  },
  computed: {

  },

};
</script>

