<template>
  <div>
    <el-dialog title="添加模板"
               :visible.sync="add.show"
               width="50%">
      <el-form ref="form"
               :model="form"
               :rules="rules"
               label-width="80px"
               size="mini">

        <div class="items"
             v-for="(item,index) in add.data"
             :key="index">
          <el-radio-group v-model="productN"
                          @change="changeItem(item)">
            <el-radio-button :label="item.title"></el-radio-button>
          </el-radio-group>
        </div>
        <!-- <el-form-item label="标题">
          <el-input v-model="form.title"
                    style="font-size:20px"></el-input>
        </el-form-item>

        <el-form-item label="内容">
          <el-input type="textarea"
                    :rows="4"
                    style="font-size:20px"
                    v-model="form.desc"></el-input>
        </el-form-item> -->
        <el-form-item label="上传文件">
          <template slot-scope="scope">

            <a><input type="file"
                     @change="getFile($event,scope.$index)">选择文件</a>

          </template>
        </el-form-item>
      </el-form>
      <span v-if='this.file'>{{this.file.name}}</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="submit($event)">确 定</el-button>
        <el-button @click="add.show=false">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "logfound",
  props: {
    add: Object,
  },
  data () {
    return {
      product: '',
      productN: '',
      file: {},
      newScore: 0,
      form: {},
      header: {
        token: localStorage.eleToken,


      },
      rules: {
        describe: [
          { required: true, message: "收支描述不能为空！", trigger: "blur" }
        ],
      }

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
    submit (event) {
      event.preventDefault();//取消默认行为

      //创建 formData 对象
      let formData = new FormData();
      // 向 formData 对象中添加文件



      console.log(this.file)
      let productId = this.product.id
      if (Object.keys(this.file)) {
        formData.append('img', this.file);
        this.$axios.put(`/qrcode/template/?productId=${productId}`, formData).then((response) => {

          if (response.data.status == 1) {
            this.$emit('updata')
            this.add.show = false
            this.$message.success('上传成功！')

          } else {
            this.$message.error('上传失败')

          }

        })
      } else {
        this.$message.error('请选择图片')
      }
    },

  }
};
</script>

<style scoped>
.file {
  position: relative;
  display: inline-block;
  background: #d0eeff;
  border: 1px solid #99d3f5;
  border-radius: 4px;
  margin-top: 1rem;
  padding: 4px 12px;
  overflow: hidden;
  color: #1e88c7;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
  margin-right: 1r;
}
.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
.file:hover {
  background: #aadffd;
  border-color: #78c3f3;
  color: #004974;
  text-decoration: none;
}
.submit {
  margin-bottom: 1rem;
  float: right;
  margin-top: 1rem;
}
.font {
  font-size: 18px;
}
.items {
  display: inline-block;
  margin: 10px 8px;
}
</style>