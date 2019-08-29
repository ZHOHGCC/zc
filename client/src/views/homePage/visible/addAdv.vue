<template>
  <el-dialog title="新增广告"
             :visible.sync="add.show"
             width="60%">
    <el-form ref="form"
             :model="sizeForm"
             :rules="rules"
             label-width="80px"
             size="mini">
      <!-- ------------------------------------------- -->
      <div v-for="(item,index) in add.data"
           :key="index">
        <el-radio-group v-model="productN"
                        @change="changeItem(item)">
          <el-radio-button :label="item.title"></el-radio-button>
        </el-radio-group>
      </div>
      <!-- <el-form-item label="产品ID"
                    prop="productId">
        <el-input type="text"
                  v-model="sizeForm.productId"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="上传文件">
        <template slot-scope="scope">

          <a class="file"><input type="file"
                   @change="getFile($event,scope.$index)">选择图片</a>

        </template>
      </el-form-item> -->
      <!-- <el-form-item label="产品ID"
                    prop="productId">
        <el-input type="text"
                  v-model="sizeForm.productId"></el-input>
      </el-form-item> -->
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
        imageSrc: '',
        productId: '',
        title: ''
      },
      fileUrl: '',
      file: '',
      rules: {
        imageSrc: [
          { required: true, message: "不能为空！" }
        ],
        productId: [
          { required: true, message: "不能为空！" }
        ],
      },


      product: '',
      productN: ''
    };
  },

  methods: {
    changeItem (item) {
      this.product = item
      console.log(this.product)
    },
    getFile (event, index) {
      this.file = event.target.files[0];
    },
    onSubmit (form) {

      if (this.product) {
        this.$axios.put('/home/adv', {
          imageSrc: this.product.picture,
          productId: this.product.id,
        }).then((res) => {
          console.log(res)
          if (res.status == 200 && res.data.status != -1) {
            this.$emit('updata')
            this.add.show = false
            this.$message.success('上传成功！')
          } else {
            this.$message.error('上传失败')
          }

        }).catch((res) => {
          this.$message.error('上传失败')
        })

      } else {
        this.$message.error('请选择')
      }

      // this.$refs[form].validate(valid => {
      //   if (this.file) {
      //     if (valid) {
      //     // ----------------------------------------------------------
      //     event.preventDefault();//取消默认行为

      //     let formData = new FormData();

      //     formData.append('image', this.file);

      //     this.$axios.put('/upload/image', formData).then(
      //       (res) => {
      //         this.fileUrl = res.data.data

      //         this.$axios.put('/home/recommend', {
      //           imageSrc: this.fileUrl,
      //           productId: this.sizeForm.productId,

      //         }).then(res => {
      //           // 操作成功

      //           if (res.status == 200 || res.data.status != -1) {
      //             this.$emit('updata')
      //             this.change.show = false
      //             this.$message.success('上传成功！')
      //           } else {
      //             this.$message.error('上传失败')
      //           }


      //         }).catch((res) => {
      //           this.$message.error('上传失败')
      //         })

      //       }
      //     )

      //   }
      // } else {
      //   this.$message.error('请选择文件')
      // }
      // });
    }
  },
  computed: {

  },
};
</script>

<style scoped>
.items {
  display: inline-block;
  margin: 10px 8px;
}
</style>
