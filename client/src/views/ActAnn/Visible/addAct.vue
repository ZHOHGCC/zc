<template>
  <el-dialog title="新增活动"
             :visible.sync="add.show"
             width="60%">
    <el-form ref="form"
             :model="sizeForm"
             :rules="rules"
             label-width="80px"
             size="mini">

      <el-form-item label="活动名称"
                    prop="title">
        <el-input v-model="sizeForm.title"></el-input>
      </el-form-item>

      <el-form-item label="开始时间">
        <el-col :span="11">
          <el-date-picker type="date"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"
                          v-model="sizeForm.startDate1"
                          style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line"
                :span="2">—————</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间"
                          format="HH:mm:ss"
                          value-format="HH:mm:ss"
                          v-model="sizeForm.startDate2"
                          style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-col :span="11">
          <el-date-picker type="date"
                          placeholder="选择日期"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          v-model="sizeForm.endData1"
                          style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line"
                :span="2">——————</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间"
                          format="HH:mm:ss"
                          value-format="HH:mm:ss"
                          v-model="sizeForm.endData2"
                          style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="活动内容"
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
        startDate1: '',
        startDate2: '',
        endData1: '',
        endData2: '',
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
          let start = this.sizeForm.startDate1 + ' ' + this.sizeForm.startDate2

          let end = this.sizeForm.endData1 + ' ' + this.sizeForm.endData2

          this.$axios.put(`/activity`, {
            content: content,
            title: title,
            start: start,
            end: end
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

