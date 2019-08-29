<template>
  <el-row class="menu_page">
    <el-col style="display:inline-block">
      <el-menu mode="vertical"
               background-color="#324057"
               text-color="#fff"
               active-text-color="#409eff"
               class="el-menu-vertical-demo">
        <router-link to="/orderForm">
          <el-menu-item index="6">
            <i class="el-icon-document-copy"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/home">
          <el-menu-item index="0">
            <i class="el-icon-s-custom"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
        </router-link>
        <!-- <router-link to="/financial">
          <el-menu-item index="1">
            <i class="el-icon-coin"></i>
            <span slot="title">金融服务</span>
          </el-menu-item>
        </router-link> -->
        <router-link to="/reply">
          <el-menu-item index="7">
            <i class="el-icon-chat-square"></i>
            <span slot="title">评论模块</span>
          </el-menu-item>
        </router-link>
        <router-link to="/share">
          <el-menu-item index="2">
            <i class="el-icon-position"></i>
            <span slot="title">分享功能</span>
          </el-menu-item>
        </router-link>
        <router-link to="/product">
          <el-menu-item index="3">
            <i class="el-icon-suitcase"></i>
            <span slot="title">产品模块</span>
          </el-menu-item>
        </router-link>

        <router-link to="/mysql">
          <el-menu-item index="9">
            <i class="el-icon-document-checked"></i>
            <span slot="title">服务器任务</span>
          </el-menu-item>
        </router-link>

        <template v-for="item in items">
          <el-submenu v-if="item.children"
                      :index="item.path"
                      :key="item.path">
            <template slot="title">
              <i :class="'fa fa-margin '+item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <router-link v-for="(citem,cindex) in item.children"
                         :to="citem.path"
                         :key="cindex">
              <el-menu-item :index='citem.path'>
                <span slot="title">{{citem.name}}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>

        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "leftmenu",
  data () {
    return {
      items: [
        {
          icon: "el-icon-coin",
          name: "金融服务",
          path: "a",
          children: [{ path: "financial", name: "金融管理" },
          { path: "withdraw", name: "提现管理" }
          ]//!!!!!!!!!!!!!!!!!!!!!
        },
        {
          icon: "el-icon-data-line",
          name: "公告活动",
          path: "fund",
          children: [{ path: "announcement", name: "公告" },
          { path: "activity", name: "活动" }
          ]//!!!!!!!!!!!!!!!!!!!!!
        }, {
          icon: "el-icon-s-home",
          name: "主页设置",
          path: "xx",
          children: [
            { path: "banner", name: "轮播广告" },
            { path: "recommend", name: "热销推荐" }
          ]//!!!!!!!!!!!!!!!!!!!!!
        },


      ]
    };
  },
  methods: {
    changH () {
      console.log()
    }
  },
};

</script>
<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  height: 570px;

  overflow-y: scroll;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>
