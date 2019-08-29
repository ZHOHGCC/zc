<template>
  <el-dialog title="修改广告"
             :visible.sync="change.show"
             width="60%">
    <el-form ref="form"
             :model="sizeForm"
             :rules="rules"
             label-width="80px"
             size="mini">

      <el-form-item label="上传文件">
        <template slot-scope="scope">

          <a class="file"><input type="file"
                   @change="getFile($event,scope.$index)">选择图片</a>

        </template>
      </el-form-item>

      <el-form-item size="large">
        <el-button type="primary"
                   @click="onSubmit('form')">立即创建</el-button>
        <el-button @click="change.show=false">取消</el-button>
      </el-form-item>
    </el-form>
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
      fileUrl: '',
      file: '',
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
    getFile (event, index) {
      this.file = event.target.files[0];
    },
    onSubmit (form) {

      let id = this.change.id

      this.$refs[form].validate(valid => {
        if (valid) {
          event.preventDefault();//取消默认行为

          let formData = new FormData();

          formData.append('image', this.file);

          this.$axios.put(`/upload/image?token=${localStorage.eleToken}`, formData).then((res) => {
            if (res.data.status == -1) {
              console.log('aaa')
              this.$message.error("身份失效，请重新登录")
              return false
            }
            this.fileUrl = res.data.data

          }).then(() => {
            let id = this.change.id
            this.$axios.post(`/home/adv/${id}`, {
              imageSrc: this.fileUrl,
              productId: id
            }).then(res => {
              // 操作成功
              console.log(res)
              if (res.status == 200 || res.data.status != -1) {
                this.$emit('updata')
                this.change.show = false
                this.$message.success('上传成功！')
              } else {
                this.$message.error('上传失败')
              }


            }).catch((res) => {
              this.$message.error('上传失败')

            })
          })

        }
      });
    }
  },
  computed: {

  },
};
</script>

