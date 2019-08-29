<template>
  <el-dialog title="添加优惠劵"
             :visible.sync="add.show"
             width="60%">
    <el-form ref="form"
             :model="sizeForm"
             :rules="rules"
             label-width="80px"
             size="mini">

      <el-form-item label="价值"
                    prop='worth'>
        <el-input type="number"
                  :min='1'
                  v-model="sizeForm.worth"></el-input>
      </el-form-item>
      <el-form-item label="最低使用额度"
                    prop='min'>
        <el-input type="number"
                  min=0
                  v-model="sizeForm.min"></el-input>
      </el-form-item>

      <el-form-item label="结束时间"
                    prop='endData1'>
        <el-col :span="11">
          <el-date-picker type="date"
                          placeholder="选择日期"
                          v-model="sizeForm.endData1"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          prop='endData1'
                          style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line"
                :span="2">——————</el-col>
        <el-col :span="11">
          <el-form-item prop='endData2'>
            <el-time-picker placeholder="选择时间"
                            format="HH:mm:ss"
                            prop='endData2'
                            value-format="HH:mm:ss"
                            v-model="sizeForm.endData2"
                            style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="数量"
                    prop='totalNum'>
        <el-input type="number"
                  :min='1'
                  v-model="sizeForm.totalNum"></el-input>
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
        min: 1,
        endData1: '',
        endData2: '',
        worth: 0,
        totalNum: 1,
      },

      rules: {
        worth: [
          { required: true, message: "不能为空！" }
        ],
        min: [
          { required: true, message: "不能为空！" }
        ],
        endData2: [
          { required: true, message: "不能为空！" }
        ],
        endData1: [
          { required: true, message: "不能为空！" }
        ],
        totalNum: [
          { required: true, message: "不能为空！" }
        ],
      }

    };
  },

  methods: {

    onSubmit (form) {

      let gmtPast = this.sizeForm.endData1 + ' ' + this.sizeForm.endData2
      let worth = this.sizeForm.worth
      let min = this.sizeForm.min
      let totalNum = this.sizeForm.totalNum
      this.$refs[form].validate(valid => {
        if (valid) {

          this.$axios.put(`/decoupon/?totalNum=${totalNum}`, {

            worth: worth,
            min: min,
            gmtPast: gmtPast,


          }).then(res => {
            // 操作成功
            let status = res.data.status
            if (status == 1) {
              this.$message({
                message: "保存成功！",
                type: "success"
              });
            } else {

              this.$message({
                type: 'error',
                message: '失败'
              });
            }
            this.add.show = false;
            this.$emit("update");
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '失败'
            });
          });
        }
      });
    }
  },
  computed: {

  },
};
</script>

