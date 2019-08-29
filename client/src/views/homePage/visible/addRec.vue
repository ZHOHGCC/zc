<template>
  <el-dialog title="新增推荐"
             :visible.sync="add.show"
             width="60%">
    <el-form ref="form"
             :model="sizeForm"
             :rules="rules"
             label-width="80px"
             size="mini">
      <!-- ------------------------------------------- -->
      <div class="items"
           v-for="(item,index) in add.data"
           :key="index">
        <el-radio-group v-model="productN"
                        @change="changeItem(item)">
          <el-radio-button :label="item.title"></el-radio-button>
        </el-radio-group>
      </div>
      <el-form-item style="margin-top: 20px"
                    label="上传图片">
        <template slot-scope="scope">

          <a class="file"><input type="file"
                   @change="getFile($event,scope.$index)"></a>

        </template>
      </el-form-item>
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
      <el-form-item style="margin-top:30px"
                    size="large">
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

      let formData = new FormData();

      formData.append('img', this.file);
      let productId = this.product.id
      if (this.product) {
        console.log(this.file)
        this.$axios.put(`/home/recommend2/?productId=${productId}`, formData).then((res) => {
          console.log(res)
          if (res.status == 200 && res.data.status != -1) {
            this.$emit('updata')
            this.add.show = false
            this.$message.success('上传成功！')
          } else {
            console.log(res.status)
            this.$message.error('上传失败')
          }

        }).catch((res) => {
          console.log(res.status)
          this.$message.error('上传失败')
        })

      } else {
        this.$message.error('请选择')
      }
      //    let productId = this.product.id
      // if (this.product) {
      //   this.$axios.put('/home/recommend', {
      //     imageSrc: this.product.picture,

      //   }).then((res) => {
      //     console.log(res)
      //     if (res.status == 200 && res.data.status != -1) {
      //       this.$emit('updata')
      //       this.add.show = false
      //       this.$message.success('上传成功！')
      //     } else {
      //       this.$message.error('上传失败')
      //     }

      //   }).catch((res) => {
      //     this.$message.error('上传失败')
      //   })

      // } else {
      //   this.$message.error('请选择')
      // }


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

