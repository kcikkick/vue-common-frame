<template>
    <el-header>
        <section class='sup-header-wrapper'>
            <el-row type="flex" align="middle" class="logo-container">
                <img style="width: 30px;height: 30px;" src="../../assets/logo.png"/>
                <span>Dashboard 2.0</span>
            </el-row>
            <el-row type="flex" align="middle" class="user-info-container">
                <span>Welcome, XXX</span>
                <a href="#">Logout</a>
            </el-row>
        </section>
        <section class=''>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-submenu index="2-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="2-4-1">选项1</el-menu-item>
                        <el-menu-item index="2-4-2">选项2</el-menu-item>
                        <el-menu-item index="2-4-3">选项3</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="3" disabled>消息中心</el-menu-item>
                <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            </el-menu>
        </section>
    </el-header>
</template>

<script>
  export default {
    name: 'CommonHeader',
    data() {
      return {
        defaultActive: "1",
        activeIndex: "1",
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>

<style scoped>
    .sup-header-wrapper:before,
    .sup-header-wrapper:after {
        display: table;
        content: " ";
    }

    .sup-header-wrapper:after {
        clear: both;
    }

    .logo-container,
    .user-info-container {
        height: 60px;
    }

    .logo-container {
        float: left;
    }

    .user-info-container {
        float: right;
    }

</style>