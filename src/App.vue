<template>
    <div id="app">
        <common-header></common-header>
        <el-main><router-view/></el-main>
        <common-footer></common-footer>
    </div>
</template>

<script>
    import CommonHeader from './components/header/CommonHeader';
    import CommonFooter from './components/footer/CommonFooter';
  export default {
    components: {CommonHeader, CommonFooter},
    data() {
      return {};
    }
  };
</script>

<style>
    #app {

    }
</style>
