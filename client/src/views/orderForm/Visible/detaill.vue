<template>
  <el-dialog title="查看"
             :visible.sync="detail.show"
             width="70%">
    <el-form ref="form2"
             :model="detail"
             label-width="200px">
      <el-form-item label="用户ID">
        <el-input v-model="detail.item.userId"
                  disabled="disabled"></el-input>
      </el-form-item>

      <el-form-item label="金额">
        <el-input v-model="detail.item.amount"
                  disabled="disabled"></el-input>
      </el-form-item>

      <div v-for="(item,index) in detail.item.items"
           class="h"
           :key="index">
        <el-form-item label="服务名称">
          <el-input v-model="item.product.intro"></el-input>
        </el-form-item>
        <el-form-item label="日期">

          <div>
            <el-input v-show="item.productProps.serviceDate == 1"
                      v-model="dataNum.one"></el-input>
            <el-input v-show="item.productProps.serviceDate == 2"
                      v-model="dataNum.two"></el-input>
            <el-input v-show="item.productProps.serviceDate == 3"
                      v-model="dataNum.three"></el-input>
            <el-input v-show="item.productProps.serviceDate == 4"
                      v-model="dataNum.four"></el-input>
            <el-input v-show="item.productProps.serviceDate == 5"
                      v-model="dataNum.five"></el-input>
            <el-input v-show="item.productProps.serviceDate == 6"
                      v-model="dataNum.six"></el-input>
            <el-input v-show="item.productProps.serviceDate == 7"
                      v-model="dataNum.seven"></el-input>
          </div>

        </el-form-item>
        <el-form-item label="时间">
          <el-input v-model="item.productProps.serviceTime"></el-input>
        </el-form-item>
        <el-divider></el-divider>
      </div>

      <el-form-item label="积分">
        <template>
          <el-input v-show="detail.item.useCredit"
                    v-model="detail.item.credit"
                    disabled></el-input>
          <el-input v-show="!detail.item.useCredit"
                    value="未使用"
                    disabled></el-input>
        </template>
      </el-form-item>
      <el-form-item label="优惠卷">
        <template>
          <el-input v-show="detail.item.useDecoupon"
                    v-model="detail.item.decouponId"
                    disabled></el-input>
          <el-input v-show="!detail.item.useDecoupon"
                    value="未使用"
                    disabled></el-input>
        </template>
      </el-form-item>
      <!-- <el-form-item label="订单更新时间"
                    :formatter="formatterR">
        <el-input v-model="detail.item.gmtModified"
                  :formatter="formatterR"
                  disabled="disabled"></el-input>
      </el-form-item> -->

    </el-form>
    <span slot="footer"
          class="dialog-footer">

      <el-button type="primary"
                 @click="detail.show=false">返 回</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "logfound",
  props: {
    detail: Object,
  },

  data () {
    return {
      dataNum: {
        one: '星期一',
        two: '星期二',
        three: '星期三',
        four: '星期四',
        fire: '星期五',
        six: '星期六',
        seven: '星期七',

      },
      auditOpinion: '',
      form2: {

      },
      newMoney: 0,


    };
  },

  methods: {
    formatterR (row, index) {
      return row.gmtModified.replace(/.000\+0000/, ' ').replace(/([a-zA-z])+/, ` \n `)
    },
    onSubmit (form) {

      //   this.$refs[form].validate(valid => {
      //     if (valid) {
      // //   表单数据验证完成之后，提交数据;
      //   const url =
      //     this.dialog.option == "add" ? "add" : `edit/${this.form.id}`;
      //   this.$axios.post(`/api/profile/${url}`, this.form).then(res => {
      //     // 操作成功
      //     this.$message({
      //       message: "保存成功！",
      //       type: "success"
      //     });
      this.detail.show = false;
      // this.$emit("update");
      //   });
      //     }
      //   });
    }
  },
  computed: {

  },
};
</script>
<style scoped>
.h {
  pointer-events: none;
}
</style>
