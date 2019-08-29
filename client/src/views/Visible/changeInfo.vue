<template>
  <el-dialog title="查看"
             :visible.sync="change.show"
             width="70%">
    <el-form ref="form2"
             :model="form2"
             label-width="200px">

      <el-form-item label="ID">

        <el-input v-model="form2.id"
                  disabled></el-input>
      </el-form-item>
      <el-form-item label="openID">
        <el-input v-model="form2.openId"
                  disabled></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form2.name"></el-input>
      </el-form-item>
      <el-form-item label="邀请人ID">
        <el-input v-model="form2.invitorId"></el-input>
      </el-form-item>
      <el-form-item label="电话号">
        <el-input v-model="form2.phone"></el-input>
      </el-form-item>
      <el-form-item label="单次获得积分">
        <el-input v-model="form2.award"></el-input>
      </el-form-item>
      <el-form-item label="单次获得积分">
        <el-input v-model="form2.integration"></el-input>
      </el-form-item>
      <el-form-item label="微信号">
        <el-input v-model="form2.wxId"></el-input>
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

      newMoney: 0,
      rules: {

      }

    };
  },
  mounted () {

  },
  methods: {
    getForm () {

      let a = this.change.row
      this.form2 = { ...a }

    },
    onSubmit (form) {
      let id = this.change.row.id
      this.$axios.post(`/user/${id}`, this.form2).then(res => {
        // 操作成功
        this.$message({
          message: "保存成功！",
          type: "success"
        });
        this.change.show = false;
        this.$emit("update");
      });
      //     }
      //   });
      console.log(this.form2)
    }
  },
  computed: {

  },
};
</script>

