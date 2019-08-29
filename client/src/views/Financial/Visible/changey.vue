<template>
  <el-dialog title="查看"
             :visible.sync="change.show"
             width="70%">
    <el-form ref="form2"
             :model="form2"
             label-width="200px">

      <el-form-item label="最小使用金额">
        <el-input v-model="form2.min"></el-input>
      </el-form-item>
      <el-form-item label="价值">
        <el-input v-model="form2.worth"></el-input>
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

      <el-form-item label="备注">
        <el-input v-model="form2.remarks"></el-input>
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
      form2: {},
      auditOpinion: '',
      sizeForm: {
        endData1: '',
        endData2: '',
        startData1: '',
        startData2: '',
      },
      newMoney: 0,
      rules: {

      }

    };
  },
  created () {

  }
  ,
  mounted () {

  },
  methods: {
    getForm () {

      let a = this.change.data
      this.form2 = { ...a }

    },
    onSubmit (form) {
      if (this.sizeForm.endData1 == '' && this.sizeForm.endData2 == '') {
        this.$message.error('请选择日期')
        return false
      }
      this.form2.endTime = this.sizeForm.endData1 + this.sizeForm.endData2
      this.$axios.post(`/publicdecoupon`, this.form2).then(res => {
        // 操作成功

        if (res.data.status != -1 && res.data.status != 403 && res.status == 200 && res.data.status != -4) {
          this.$emit('updata')
          this.change.show = false;
          this.$message.success('上传成功！')
        } else {
          this.$message.error('上传失败')
        }



      });
      //     }
      //   });

    }
  },
  computed: {

  },
};
</script>

